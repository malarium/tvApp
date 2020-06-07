<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Heading />
    <Search />
    <Tiles :shows="showsAll" />
  </div>
</template>

<script>
import Heading from "./components/Heading.vue";
import Search from "./components/Search.vue";
import Tiles from "./components/Tiles.vue";

export default {
  name: "App",
  components: {
    Heading,
    Search,
    Tiles
  },
  data: () => {
    return {
      showsAll: []
    }
  },
  methods: {
    getShowsList() {
      return fetch("https://api.tvmaze.com/shows")
      .then(blob => blob.json())
      .then(data => this.showsAll = data)
    }
  },
  beforeMount() {
    this.getShowsList()
  },

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
