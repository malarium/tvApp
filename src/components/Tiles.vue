<template>
  <div class="d-flex flex-row flex-wrap justify-content-center">
    <div v-for="show in shows" :key="show.id" class="p-2 card-whole">
      <b-card
        :title="show.name"
        :img-src="show.image.medium"
        :img-alt="show.name"
        img-top
        tag="article"
        style="max-width: 210px;"
        class="mb-2 cursor-pointer"
        @click="showMore(show.id)"
      >
        <b-card-text>
          <p>Premiered: {{ show.premiered }}</p>
          <p>Avg rating: {{ show.rating.average }}</p>
        </b-card-text>
      </b-card>
    </div>
    <b-modal v-if="modalData" size="xl" ref="my-modal" title hide-footer>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6">
            <img class="img-fluid" :src="modalData.image.original" :alt="modalData.name" />
          </div>
          <div class="col-12 col-md-6">
            <div class="d-flex flex-row justify-content-between">
              <h1>{{ modalData.name }}</h1>
              <span
                class="align-self-center showRating"
                :data-rating="modalData.rating.average"
                :class="classObject()"
              >Rating: {{ modalData.rating.average }}</span>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <p class="align-self-center">Premiere: {{ modalData.premiered }}</p>
              <p class="align-self-center">Language: {{ modalData.language }}</p>
            </div>
            <p>
              Genre:
              <span v-for="(genre, index) in modalData.genres" :key="genre">
                {{ genre }}
                <span v-if="index < modalData.genres.length-1">/</span>
              </span>
            </p>
            <p v-html="modalData.summary" />
            <a
              :href="'https://www.imdb.com/title/'+ modalData.externals.imdb"
              target="_blank"
            >Zobacz na IMDB</a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import Modal from "./Modal.vue";
export default {
  name: "Tiles",
  props: ["shows"],
  data: () => {
    return {
      singleResult: [],
      endpointQuery: "https://api.tvmaze.com/singlesearch/shows?q=",
      modalData: null
    };
  },
  methods: {
    setTiles() {
      console.log(this.singleResult);
    },
    classObject() {
      if (this.modalData.rating.average < 5) {
        return "poor";
      } else if (
        this.modalData.rating.average > 5 &&
        this.modalData.rating.average < 7.5
      ) {
        return "avg";
      } else {
        return "good";
      }
    },
    showMore(id) {
      return fetch("https://api.tvmaze.com/shows/" + id)
        .then(blob => blob.json())
        .then(data => {
          this.modalData = data;
          console.log(data);
          this.$nextTick(() => {
            this.showModal = true;
            this.$refs["my-modal"].show();
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-whole {
  article div {
    transition: background-color, 0.2s;
  }
  &:hover {
    article div {
      background-color: lightcoral;
    }
  }
  .card-body {
    height: 170px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    .card-title {
      font-size: 1.3rem;
      font-family: "Arvo", serif;
    }
    .card-text {
      p {
        margin-bottom: 5px;
      }
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }
}
.showRating {
  display: inline-block;
  &:before {
    content: "\2605";
    font-size: 24px;
  }
  &.poor {
    &:before {
      color: red;
    }
  }
  &.avg {
    &:before {
      color: orange;
    }
  }
  &.good {
    &:before {
      color: green;
    }
  }
}
</style>
