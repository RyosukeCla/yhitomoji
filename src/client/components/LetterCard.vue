<template lang="pug">
  .card-container
    .card
      .card-letter.text-blue(:style="letterStyle", @click="toLetter") {{letter}}
      .card-body
        .card-desc {{desc}}
        .card-author
          span.text-blue {{author}}
          span  の
          span ヒトモジ
      .card-footer
        .card-button(@click="pressStar")
          i.far.fa-star(v-show="!starPressed")
          i.fas.fa-star.gold(v-show="starPressed")
          .stars {{starsCount}}

        .card-button(@click="tweet")
          i.fab.fa-twitter

</template>
<script>
export default {
  props: ['letter', 'desc', 'author', 'stars', 'id'],
  data () {
    return {
      starPressed: false
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
    starsCount () {
      return this.starPressed ? this.stars + 1 : this.stars
    }
  },
  methods: {
    pressStar () {
      if (!this.starPressed) {
        this.$axios.put('/star', {
          letterId: this.id
        })
        this.starPressed = true
      }
    },
    tweet () {
      const body = `${this.author}のヒトモジは「${this.letter}」- その心は？？`
      const url = `https://hitomoji.herokuapp.com/${this.id}`
      const tag = `ヒトモジ`
      window.open(`https://twitter.com/intent/tweet?text=${body}&url=${url}&hashtags=${tag}`)
    },
    toLetter () {
      this.$router.push(`/${this.id}`)
    }
  }
}
</script>
<style lang="sass" scoped>

  .card-container
    flex-grow: 1
    width: calc(45%)
    min-width: 250px
    padding: 10px

  .card
    background: #fff
    border-radius: 4px
    overflow: hidden
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1)
    // box-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.1)
    flex-grow: 1
    display: flex
    flex-direction: column

    &-body
      display: flex
      flex-direction: column
      flex-grow: 2

    &-letter
      text-align: center
      font-size: 10em
      font-weight: lighter
      margin: 0 auto
      width: 100%
      height: 280px
      line-height: 280px
      // background: #aaa

    &-desc
      padding: 10px
      font-size: 1.3em
      opacity: 0.8
      flex-grow: 2

    &-author
      padding-right: 10px
      font-size: 1.1em
      text-align: right
      padding-bottom: 10px
      opacity: 0.7

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

      &:hover
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.03)
        background: rgba(0, 0, 0, 0.02)

      .gold
        color: #ffc107

      > i
        height: 45px
        opacity: 0.5
        line-height: 45px

      .stars
        position: absolute
        left: calc(50% + 15px)
        top: 0px;
        height: 45px;
        line-height: 45px;
        opacity: 0.5

      &:nth-child(2n-1)
        border-right: solid 1px rgba(0, 0, 0, 0.06)

</style>
