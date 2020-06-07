<template>
  <b-modal v-if="modalData" size="xl" ref="ref" title hide-footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-6">
          <img class="img-fluid" :src="modalData.image.original" :alt="modalData.name" />
        </div>
        <div class="col-12 col-md-6">
          <div class="d-flex flex-row justify-content-between">
            <h1>{{ modalData.name }}</h1>
            <span class="align-self-center">Rating: {{ modalData.rating.average }}</span>
          </div>
          <p>Premiered: {{ modalData.premiered }}</p>
          <p>
            Genre:
            <span v-for="(genre, index) in modalData.genres" :key="genre">
              {{ genre }}
              <span v-if="index < modalData.genres.length-1">/</span>
            </span>
          </p>
          <p>Premiered: {{ modalData.premiered }}</p>
          <p>Premiered: {{ modalData.premiered }}</p>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "Modal",
  props: ["modalData", "ref"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
