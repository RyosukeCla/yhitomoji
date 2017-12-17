<template lang="pug">
  .modal(v-if="postModalStore.isOpened", @click.self="close")
    .card-container
      .card
        input.focus-input.card-letter.text-blue(v-model="letter", :style="letterStyle", placeholder="字")
        .card-body
          textarea.focus-input.card-desc(v-model="desc", placeholder="その心は (1-60文字)")
          .letter-left {{60 - desc.length}}
          .card-author
            input.focus-input.text-blue(v-model="author", placeholder="(1-12文字まで) 私")
            span  の
            span ヒトモジ
        .card-footer
          .card-button(@click="postLetter")
            span ポスト
          .card-button(@click="close")
            span やめる

</template>
<script>
import postModalStore from '../store/postModalStore'

export default {
  data () {
    return {
      postModalStore: postModalStore.state,
      letter: '',
      desc: '',
      author: '',
      sending: false
    }
  },
  watch: {
    letter (val) {
      if (val.length > 1) {
        this.letter = val.substring(val.length - 1, val.length)
      }
    },
    desc (val) {
      if (val.length > 60) {
        this.desc = val.substring(0, 60)
      }
    },
    author (val) {
      if (val.length > 12) {
        this.author = val.substring(0, 12)
      }
    }
  },
  methods: {
    handleLetter (e) {
      this.letter = e.key
    },
    postLetter () {
      const letterValidation = this.letter.length === 1
      const descValidation =this.desc.length > 0 && this.desc.length <= 60
      const authorValidation = this.author.length > 0 && this.author.length <= 12
      if (letterValidation && descValidation && authorValidation && !this.sending) {
        this.sending = true
        this.$axios.post('/letter', {
          letter: this.letter,
          desc: this.desc,
          author: this.author
        }).then((res) => {
          this.close()
          this.$router.push(`/${res.data.letterId}`)
        }).catch((e) => {
          this.sending = false
        })
      }
    },
    close () {
      postModalStore.close()
      this.letter = ''
      this.desc = ''
      this.author = ''
      this.sending = false
    }
  },
  computed: {
    letterStyle () {
      const h = Math.round(Math.random() * 360)
      const s = Math.round(((Math.random() - 0.5) * 5.0))
      const l = Math.round(((Math.random() - 0.5) * 5.0))
      const color = `hsla(${h}, ${64 + s}%, ${53 + l}%, 0.7)`
      return {background: color}
    },
  }
}
</script>
<style lang="sass" scoped>
  .focus-input
    font-family: "Sawarabi Mincho"
    outline: none
    border: none
    transition: 0.3s
    &:focus, &:hover
      box-shadow: inset 0px 0px 10px -1px rgba(0, 0, 0, 0.3)

  .modal
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.3)

  .card-container
    flex-grow: 1
    max-width: 350px
    min-width: 250px
    padding: 10px
    align-content: center
    align-items: center
    margin: 0 auto
    height: 100vh
    display: flex

  .hidden-form
    opacity: 1
    position: absolute

  .card
    background: #fff
    border-radius: 4px
    overflow: hidden
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1)
    // box-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.1)
    flex-grow: 1

    &-letter
      text-align: center
      font-size: 10em
      font-weight: lighter
      margin: 0 auto
      width: 100%
      height: 280px
      line-height: 280px

    &-body
      position: relative

      .letter-left
        position: absolute
        top: 4px
        right: -11px
        padding-right: 8px
        width: 40px
        height: 25px
        line-height: 25px
        background: #17425a
        text-align: center
        border-radius: 10px
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.03)
        color: #58b69a
        opacity: 0.6

    &-desc
      padding: 10px
      font-size: 1.3em
      opacity: 0.8
      height: 150px
      width: 100%
      resize: none

    &-author
      padding-right: 10px
      font-size: 1.1em
      text-align: right
      padding-bottom: 10px
      opacity: 0.7
      display: flex
      align-items: center

      > input
        font-size: 1.1em
        text-align: right
        flex-grow: 1
        width: 200px

    &-footer
      border-top: solid 1px rgba(0, 0, 0, 0.06)
      height: 45px
      display: flex

    &-button
      flex-grow: 1
      width: 50%
      text-align: center
      position: relative
      transition: 0.2s
      cursor: pointer

      > span
        height: 45px
        opacity: 0.5
        line-height: 45px

      &:hover
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.03)
        background: rgba(0, 0, 0, 0.02)

      &:nth-child(2n-1)
        border-right: solid 1px rgba(0, 0, 0, 0.06)
</style>
