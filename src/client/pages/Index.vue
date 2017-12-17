<template lang="pug">
  div
    .menu-container
      .menu
        .menu-item
          .menu-button(@click="getLetters(0, 'createdAt')", :class="{active: sort === 'createdAt'}") 新しいヒトモジ
        .menu-item
          .menu-button(@click="getLetters(0, 'stars')", :class="{active: sort === 'stars'}") 流行りのヒトモジ

    .card-container(ref="cards")
      template(v-for="(post, index) in letters")
        LetterCard(
          :letter="post.letter",
          :desc="post.desc",
          :author="post.author",
          :stars="post.stars",
          :id="post._id"
          :key="post._id"
        )
</template>
<script>
  import LetterCard from '../components/LetterCard'

  export default {
    components: {
      LetterCard
    },
    data () {
      return {
        page: 0,
        sort: 'createdAt',
        loading: false,
        letters: []
      }
    },
    methods: {
      getLetters (page, sort) {
        if (this.loading) return
        this.loading = true
        this.$axios.get('/letters', {
          params: {
            page,
            sort
          }
        }).then((res) => {
          if (page <= 0) {
            this.letters = res.data.letters
          } else {
            if (res.data.letters.length > 0) {
              res.data.letters.forEach((letter) => {
                this.letters.push(letter)
              })
            }
          }
          this.page = page
          this.sort = sort
          this.loading = false
        })
      },
      handleScroll (e) {
        if (window.scrollY + window.innerHeight > this.$refs.cards.scrollHeight - 800) {
          if (!this.loading) {
            this.getLetters(this.page + 1, this.sort)
          }
        }
      }
    },
    mounted () {
      this.getLetters(0, 'createdAt')
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style lang="sass" scoped>
  .menu
    background: #fff
    border-radius: 4px
    overflow: hidden
    margin: 0 auto
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1)
    display: flex
    width: 100%

    &-container
      text-align: center
      display: flex
      padding: 10px

    &-item
      flex-grow: 1
      width: 50%

    &-button.active
      background: #17425a
      color: #58b69a
      transition: 0.3s

      &:hover
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.03)
        opacity: 0.8
        background: #17425a

    &-button
      padding: 0.7em
      transition: 0.2s
      cursor: pointer
      color: #17425a

      &:hover
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.03)
        background: rgba(0, 0, 0, 0.02)

      &:nth-child(2n-1)
        border-right: solid 1px rgba(0, 0, 0, 0.06)

  .card-container
    display: flex
    flex-wrap: wrap;

</style>
