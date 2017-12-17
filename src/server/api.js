const Letter = require('./Letter')

const LETTER_OPTS = {
  schema: {
    body: {
      letter: {
        type: 'string',
        maxlength: 1,
        minlength: 1
      },
      desc: {
        type: 'string',
        maxlength: 60,
        minlength: 1
      },
      author: {
        type: 'string',
        maxlength: 12,
        minlength: 1
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          letterId: { type: 'string' }
        }
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

const LETTER_GET_OPTS = {
  schema: {
    params: {
      letterId: { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          letter: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              letter: { type: 'string' },
              desc: { type: 'string' },
              author: { type: 'string' },
              createdAt: { type: 'string' },
              stars: { type: 'integer' }
            }
          }
        }
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

const SORTABLE = ['createdAt', 'stars']
const LETTERS_OPTS = {
  schema: {
    querystring: {
      page: { type: 'integer' },
      sort: {
        type: 'string',
        validate (value) {
          return SORTABLE.indexOf(value) >= 0
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          letters: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                letter: { type: 'string' },
                desc: { type: 'string' },
                author: { type: 'string' },
                createdAt: { type: 'string' },
                stars: { type: 'integer' }
              }
            }
          }
        }
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

const STAR_OPTS = {
  schema: {
    body: {
      letterId: { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

module.exports = (fastify, opts, next) => {
  fastify.post('/letter', LETTER_OPTS, async (request, reply) => {
    try {
      const body = request.body
      const letter = new Letter({
        letter: body.letter,
        desc: body.desc,
        author: body.author
      })
      await letter.save()
      reply
        .code(200)
        .send({ letterId: letter._id })
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'なんか失敗したっぽい' })
    }
  })

  fastify.get('/letter/:letterId', LETTER_GET_OPTS, async (request, reply) => {
    try {
      const letter = await Letter.findById(request.params.letterId)
      reply
        .code(200)
        .send({ letter })
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'なんか失敗したっぽい' })
    }
  })

  fastify.get('/letters', LETTERS_OPTS, async (request, reply) => {
    try {
      const page = request.query.page || 0
      const sort = request.query.sort === 'stars' ? { stars: -1 } : { createdAt: -1 }
      const limit = 20
      const skip = limit * page

      const letters = await Letter.find().skip(skip).limit(limit).sort(sort)

      reply
        .code(200)
        .send({ letters })
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'なんか取れなかった' })
    }
  })

  fastify.put('/star', STAR_OPTS, async (request, reply) => {
    try {
      const letterId = request.body.letterId
      await Letter.findByIdAndUpdate(letterId, {
        $inc: {
          stars: 1
        }
      })

      reply
        .code(200)
        .send({ message: '良いね！' })
    } catch (error) {
      reply
        .code(400)
        .send({ message: 'あれま' })
    }
  })

  next()
}
