<template>
  <div>
    <b-modal v-model="openModal" v-if="modalData" size="xl" title hide-footer scrollable>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6">
            <img class="img-large" :src="getFilmPoster(modalData)" :alt="modalData.name" />
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
              class="mb-3 d-inline-block IMDB"
            >See at IMDb</a>

            <!-- Rozwijane informacje  -->
            <div role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  class="p-1"
                  role="tab"
                  :class="{'disabled' : castInfo && !castInfo.length}"
                >
                  <b-button block v-b-toggle.accordion-1 variant="light">
                    <span v-if="castInfo && castInfo.length">CAST</span>
                    <span v-else>CAST (no info available)</span>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="accordion-tabpanel"
                >
                  <b-card-body class="row flex-nowrap mx-0" v-if="castInfo">
                    <b-card-text
                      class="col-6 pb-0 mb-0"
                      v-for="castSingle of castInfo"
                      :key="castSingle.id"
                    >
                      <figure>
                        <img class="img-fluid" :src="getCharacterImage(castSingle)" />
                        <figcaption class="text-center mt-2">
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
                  <b-card-body v-else>
                    <b-card-text class="col-6 pb-0 mb-0">Sorry, no data</b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  class="p-1"
                  role="tab"
                  :class="{'disabled' : crewInfo && !crewInfo.length}"
                >
                  <b-button block v-b-toggle.accordion-2 variant="light">
                    <span v-if="crewInfo && crewInfo.length">CREW</span>
                    <span v-else>CREW (no info available)</span>
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="accordion-tabpanel"
                >
                  <b-card-body class="row flex-nowrap flex-column mx-0" v-if="crewInfo">
                    <b-card-text
                      class="col-12 crewMember mb-0"
                      v-for="crewPerson in crewInfo"
                      :key="crewPerson.id"
                    >
                      <span class="crewMember-type">{{ crewPerson.type }} -</span>
                      <a
                        :href="crewPerson.person.url"
                        target="_blank"
                        class="d-inline w-100 mt-2 crewMember-character"
                      >&nbsp;{{ crewPerson.person.name }}</a>
                    </b-card-text>
                  </b-card-body>
                  <b-card-body v-else>
                    <b-card-text class="col-6 pb-0 mb-0">Sorry, no data</b-card-text>
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
export default {
  name: "Modal",
  props: ["modalData"],
  data: () => {
      return {
          castInfo: null,
          crewInfo: null,
          openModal: false
      }
  },
  methods: {
    getCastInfo(id) {
      this.castInfo = null;
        return fetch(`https://api.tvmaze.com/shows/${id}/cast`)
          .then(blob => blob.json())
          .then(data => (this.castInfo = data));
    },
    getCrewInfo(id) {
      this.crewInfo = null;
        return fetch(`https://api.tvmaze.com/shows/${id}/crew`)
          .then(blob => blob.json())
          .then(data => (this.crewInfo = data));
    },
    getCharacterImage(data) {
      return data?.image?.medium || data?.character?.image?.medium || "https://cdn.dribbble.com/users/1541938/screenshots/5315198/question-mark.png"
    },
    getFilmPoster(data) {
      return data?.image?.original || "https://cdn.dribbble.com/users/1541938/screenshots/5315198/question-mark.png"
    },
    classObject() {
      if (this.modalData.rating.average === null) {
        return "none";
      } else if (this.modalData.rating.average < 5) {
        return "poor";
      } else if (
        this.modalData.rating.average >= 5 &&
        this.modalData.rating.average < 7.5
      ) {
        return "avg";
      } else {
        return "good";
      }
    }
  },
  watch: {
    modalData(n, o) {
      n != o ? this.openModal = true : this.openModal = false
      this.getCastInfo(n.id)
      this.getCrewInfo(n.id)
    }
  }
};
</script>

<style scoped lang="scss">
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
.crewMember {
  font-size: 18px;
  &-type {
    font-weight: bold;
  }
  &-character {
    &:link,
    &:hover,
    &:visited {
      text-decoration: none;
    }
  }
}

.character {
  &-actor,
  &-name {
    font-size: 18px;
  }
}

.img-large {
  width: 80%;
  margin: auto 10%;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
