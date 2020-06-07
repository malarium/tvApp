<template>
  <div class="hello">
      <input type="text" placeholder="enter show title" @keyup="runCheck($event.target.value)">
      <div v-if="singleResult && singleResult.image">
          <img :src="singleResult.image.medium" />
          <p v-html="singleResult.summary" />
      </div>
  </div>
</template>

<script>
export default {
    name: "Search",
    data:() => {
        return {
            singleResult: [],
            endpointQuery: "https://api.tvmaze.com/singlesearch/shows?q="
        }
    },
    methods: {
            setTiles() {
                console.log(this.singleResult)
            },
            setResults(data) {
                this.singleResult = []
                this.singleResult = data
                this.setTiles()
            },
            runCheck(input) {
                fetch(this.endpointQuery + input)
                .then(blob => blob.json())
                .then(data => this.setResults(data))
            }
    }
};

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
