<template lang="pug">
  div
    .letter-container
      LetterCard(
        :letter="letter.letter",
        :desc="letter.desc",
        :author="letter.author",
        :stars="letter.stars",
        :id="letter._id",
        :key="letter._id",
        v-if="letter"
      )
      router-link.back-button(to="/", @click="back")
        i.fas.fa-chevron-left
    div(style="height: 10em;")

</template>
<script>
import LetterCard from '../components/LetterCard'

export default {
  components: {
    LetterCard
  },
  data () {
    return {
      letter: null
    }
  },
  mounted () {
    if (this.$route.params.letterId) {
      this.$axios.get(`/letter/${this.$route.params.letterId}`).then((res) => {
        this.letter = res.data.letter
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .letter-container
    flex-grow: 1
    max-width: 350px
    min-width: 250px
    padding: 10px
    align-content: center
    align-items: center
    margin: 0 auto
    height: 60vh
    min-height: 400px
    display: flex

  .back-button
    position: fixed
    bottom: 20px
    left: 20px
    border-radius: 50%
    width: 80px
    height: 80px
    background: #17425a
    color: #fff
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.3)
    cursor: pointer

    i
      position: absolute
      top: 0
      left: 32px
      line-height: 80px
      font-size: 25px
</style>
