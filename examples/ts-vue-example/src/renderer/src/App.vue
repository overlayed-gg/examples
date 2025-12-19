<script setup lang="ts">
import { computed, ref } from "vue";
import IconClose from "./components/icons/IconClose.vue";
import IconMinimize from "./components/icons/IconMinimize.vue";

const { ipc } = window;

const events = ref<unknown[]>([]);
const hasActiveGames = ref(false);
const lastFiftyEvents = computed(() => events.value.slice(0, 50));

setInterval(async () => {
	hasActiveGames.value = await ipc.hasActiveGames();
}, 1000);

ipc.onEvent((event) => {
	console.log("Event received", event);
	events.value.unshift(event);
});
</script>

<template>
	<div class="window-nav flex justify-between px-4 py-2.5 gap-2 bg-zinc-950 border-b border-zinc-700">
		<div class="text-sm text-zinc-100">Overlayed Example App</div>
		<div class="flex gap-4">
			<button class="hover:text-emerald-500" @click="ipc.minimizeWindow()"><IconMinimize /></button>
			<button class="hover:text-emerald-500" @click="ipc.closeWindow()"><IconClose /></button>
		</div>
	</div>
	<div class="flex flex-col gap-2 p-4 h-full">
		<template v-if="!hasActiveGames">
			<div class="text-base text-zinc-300">No active games</div>
		</template>
		<template v-else-if="lastFiftyEvents.length === 0">
			<div class="text-base text-zinc-300">Listening for events...</div>
		</template>
		<template v-else>
			<pre v-for="event in lastFiftyEvents" :key="JSON.stringify(event)" class="text-xs">
				{{ event }}
			</pre
			>
		</template>
	</div>
</template>

<style scoped>
.window-nav {
	-webkit-app-region: drag;
}

.window-nav button {
	-webkit-app-region: no-drag;
}
</style>
