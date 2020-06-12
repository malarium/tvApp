<template>
  <div class="d-flex flex-row flex-wrap justify-content-center">
    <div v-for="show in shows" :key="show.id" class="p-2 card-whole">
      <b-card
        :title="show.name"
        :img-src="getCharacterImage(show)"
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
  </div>
</template>

<script>
export default {
  name: "Tiles",
  props: ["shows"],
  watch: {
    shows: function(newV, old) {
      newV !== old ? this.$forceUpdate() : null
    }
  },
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
    showMore(id) {
      return fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(blob => blob.json())
        .then(data => {
          this.modalData = data;
          this.$nextTick(() => {
            this.$emit("openModal", this.modalData)
            // this.showModal = true;
            // this.$refs["my-modal"].show();
          });
        });
    },
    getCharacterImage(data) {
      return data?.image?.medium || data?.character?.image?.medium || "https://cdn.dribbble.com/users/1541938/screenshots/5315198/question-mark.png"
    }
  }
};
</script>

<style scoped lang="scss">
// .card-whole {
//   article div {
//     transition: background-color, 0.2s;
//   }
//   img {
//     min-width: 210px;
//     height: 295px;
//     background-color: lightgray;
//   }
//   &:hover {
//     article div {
//       background-color: #ff637b;
//     }
//   }
//   .card-body {
//     height: 170px;
//     display: flex;
//     flex-flow: column;
//     justify-content: space-around;
//     .card-title {
//       font-size: 1.3rem;
//       font-family: "Arvo", serif;
//     }
//     .card-text {
//       p {
//         margin-bottom: 5px;
//       }
//     }
//   }

//   .cursor-pointer {
//     cursor: pointer;
//   }
// }
// .accordion-tabpanel {
//   overflow-x: auto;
// }
// .showRating {
//   display: inline-block;
//   &:before {
//     content: "\2605";
//     font-size: 24px;
//   }
//   &.poor {
//     &:before {
//       color: red;
//     }
//   }
//   &.avg {
//     &:before {
//       color: orange;
//     }
//   }
//   &.good {
//     &:before {
//       color: green;
//     }
//   }
//   &.none {
//     &:before {
//       content: "\2606";
//     }
//   }
// }
// .IMDB {
//   background-color: #efc200;
//   font-weight: bold;
//   color: black;
//   padding: 10px 20px;
//   &:link,
//   &:hover,
//   &:visited {
//     text-decoration: none;
//   }
// }
// .crewMember {
//   font-size: 18px;
//   &-type {
//     font-weight: bold;
//   }
//   &-character {
//     &:link,
//     &:hover,
//     &:visited {
//       text-decoration: none;
//     }
//   }
// }

// .character {
//   &-actor,
//   &-name {
//     font-size: 18px;
//   }
// }

// .img-large {
//   width: 80%;
//   margin: auto 10%;
// }
</style>
