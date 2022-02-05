<script setup lang="ts">
import { useElectron } from '~/use/electron';

const { versions } = useElectron();
</script>

<template>
	<h2 id="versions">Lib versions</h2>
	<div>
		<ul aria-labelledby="versions">
			<li v-for="(version, lib) in versions" :key="lib">
				<strong>{{ lib }}</strong
				>: v{{ version }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
div {
	text-align: left;
	display: grid;
	justify-content: center;
}
</style>
