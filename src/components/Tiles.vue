<template>
	<div class="d-flex flex-row flex-wrap justify-content-center">
		<div v-for="show in shows" :key="show.id" class="p-2">
			<b-card
				:title="show.name"
				:img-src="show.image.medium"
				:img-alt="show.name"
				img-top
				tag="article"
				style="max-width: 210px;"
				class="mb-2"
			>
				<b-card-text>
					<p>Premiered: {{ show.premiered }}</p>
					<p>Avg rating: {{ show.rating.average }}</p>
				</b-card-text>
			</b-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Tiles",
		props: ["shows"],
		data: () => {
			return {
				singleResult: [],
				endpointQuery: "https://api.tvmaze.com/singlesearch/shows?q=",
			};
		},
		methods: {
			setTiles() {
				console.log(this.singleResult);
			},
			isTileVisible(el) {
				console.log(el);
				return true;
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
