<template>
  <div id="app">
    <img alt="tv app logo" class="logo" src="./assets/tv.png" />
    <Heading />
    <Search @searchCommenced="searchCommenced" />
    <Modal :modalData="singleShow" />
    <Tiles :shows="showsAll" @openModal="openModal" />
  </div>
</template>

<script>
	import Heading from "./components/Heading.vue";
	import Search from "./components/Search.vue";
	import Tiles from "./components/Tiles.vue";
	import Modal from "./components/Modal.vue";

	export default {
	  name: "App",
	  components: {
	    Heading,
	    Search,
		Tiles,
		Modal
	  },
	  data: () => {
	    return {
	      showsAll: [],
		  dataIncoming: false,
		  singleShow: null
	    };
	  },
	  methods: {
	    getShowsList() {
	      return fetch("https://api.tvmaze.com/shows")
	        .then(blob => blob.json())
	        .then(data => {
	          this.showsAll = data;
	        });
	    },
	    searchCommenced(dataIncoming) {
			this.$nextTick(() => {
			  if (dataIncoming && dataIncoming.length > 0) {
				this.showsAll = [];
				this.showsAll = [...dataIncoming];
			  } else {
				this.getShowsList();
			  }
			})
		},
		openModal(showData) {
			this.singleShow = showData
		}
	  },
	  beforeMount() {
	    this.getShowsList();
	  }
	};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5c17a;
  padding-top: 60px;
  .logo {
    width: 140px;
  }
}
</style>
