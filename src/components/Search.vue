<template>
  <div class="hello">
    <input
      type="text"
      minlength="3"
      placeholder="enter show title"
      @keyup="runCheck($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data: () => {
    return {
      searchResults: [],
      endpointQuery: "https://api.tvmaze.com/search/shows?q="
    };
  },
  methods: {
    setTiles() {
      this.$emit("searchCommenced", this.searchResults)
      ;
    },
    setResults(data) {
      this.searchResults = [];
      this.searchResults = data.map(el => el.show);
      this.setTiles();
    },
    runCheck(input) {
        fetch(this.endpointQuery + input)
          .then(blob => blob.json())
          .then(data => this.setResults(data))
          .catch(err => {
            this.setResults(null);
            return err;
          });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  font-size: 24px;
  border: 2px solid black;
  border-radius: 3px;
  padding-left: 10px;
  outline: 0;
}
</style>
