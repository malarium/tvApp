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
          <p>Avg rating: {{ show.rating.average || 'none' }}</p>
        </b-card-text>
      </b-card>
    </div>

    <!-- Modal z dodatkową zawartością -->
    <b-modal v-if="modalData" size="xl" ref="my-modal" title hide-footer scrollable>
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
              >
                <b>Rating:</b>
                {{ modalData.rating.average || 'none' }}
              </span>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <p class="align-self-center">
                <b>Premiere:</b>
                {{ modalData.premiered }}
              </p>
              <p class="align-self-center">
                <b>Language:</b>
                {{ modalData.language }}
              </p>
            </div>
            <p>
              <b>Genre:</b>
              <span v-for="(genre, index) in modalData.genres" :key="genre">
                {{ genre }}
                <span v-if="index < modalData.genres.length-1">/</span>
              </span>
            </p>
            <p v-html="modalData.summary" />
            <a
              :href="'https://www.imdb.com/title/'+ modalData.externals.imdb"
              target="_blank"
              class="mb-2 d-inline-block IMDB"
            >Zobacz na IMDb</a>

            <!-- Rozwijane informacje -->
            <div role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  class="p-1"
                  role="tab"
                  @click="getCastInfo($event, modalData.id)"
                >
                  <b-button block v-b-toggle.accordion-1 variant="light">CAST</b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="accordion-tabpanel"
                >
                  <b-card-body class="row flex-nowrap mx-0">
                    <b-card-text class="col-6" v-for="castSingle of castInfo" :key="castSingle.id">
                      <figure>
                        <img class="img-fluid" :src="getCharacterImage(castSingle)" />
                        <figcaption class="text-center">
                          <a
                            :href="castSingle.person.url"
                            target="_blank"
                            class="text-center d-inline-block w-100 mt-2 character-actor"
                          >{{ castSingle.person.name }}</a>
                        </figcaption>
                      </figure>
                      <p class="text-center character-name">{{ castSingle.character.name }}</p>
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  class="p-1"
                  role="tab"
                  @click="getCrewInfo($event, modalData.id)"
                >
                  <b-button block v-b-toggle.accordion-2 variant="light">CREW</b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="accordion-tabpanel"
                >
                  <b-card-body class="row flex-nowrap mx-0">
                    <b-card-text class="col-6" v-for="crewPerson in crewInfo" :key="crewPerson.id">
                      <p class="text-center">{{ crewPerson.type }}</p>
                      <a
                        :href="crewPerson.person.url"
                        target="_blank"
                        class="text-center d-inline-block w-100 mt-2 character-crewMember"
                      >{{ crewPerson.person.name }}</a>
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
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
      modalData: null,
      castInfo: null,
      crewInfo: null
    };
  },
  methods: {
    setTiles() {
      console.log(this.singleResult);
    },
    classObject() {
      if (this.modalData.rating.average === null) {
        return "none";
      } else if (this.modalData.rating.average < 5) {
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
      return fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(blob => blob.json())
        .then(data => {
          this.modalData = data;
          console.log(data);
          this.$nextTick(() => {
            this.showModal = true;
            this.$refs["my-modal"].show();
          });
        });
    },
    getCastInfo(e, id) {
      this.castInfo = null;
      if (e.target.classList.contains("not-collapsed")) {
        return fetch(`https://api.tvmaze.com/shows/${id}/cast`)
          .then(blob => blob.json())
          .then(data => {
            console.log(data);
            this.castInfo = data;
          });
      }
    },
    getCrewInfo(e, id) {
      this.crewInfo = null;
      if (e.target.classList.contains("not-collapsed")) {
        return fetch(`https://api.tvmaze.com/shows/${id}/crew`)
          .then(blob => blob.json())
          .then(data => {
            console.log(data);
            this.crewInfo = data;
          });
      }
    },
    getCharacterImage(data) {
      return data?.character?.image?.medium || "/assets/logo.png";
    }
  }
};
</script>

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
.accordion-tabpanel {
  overflow-x: auto;
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
  &.none {
    &:before {
      content: "\2606";
    }
  }
}
.IMDB {
  background-color: #efc200;
  font-weight: bold;
  color: black;
  padding: 10px 20px;
  &:link,
  &:hover,
  &:visited {
    text-decoration: none;
  }
}
</style>
