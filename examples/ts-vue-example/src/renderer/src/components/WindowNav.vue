<script setup lang="ts">
import { ref } from "vue";
import IconClose from "./icons/IconClose.vue";
import IconMinimize from "./icons/IconMinimize.vue";
import { useIntervalFn } from "@vueuse/core";

const { ipc } = window;

const isConnectedToAnyGame = ref(false);

useIntervalFn(async () => {
	isConnectedToAnyGame.value = await ipc.isConnectedToAnyGame();
}, 1000);
</script>

<template>
	<div class="window-nav flex justify-between px-4 py-2.5 gap-2 bg-zinc-950 border-b border-zinc-700">
		<div class="text-sm text-zinc-100">
			Overlayed Example App
			<div
				class="min-w-2 min-h-2 size-2 inline-block rounded-full ml-1"
				:class="isConnectedToAnyGame ? 'bg-emerald-500' : 'bg-red-500'"
			></div>
		</div>
		<div class="flex gap-4">
			<button class="hover:text-emerald-500" @click="ipc.minimizeWindow()"><IconMinimize /></button>
			<button class="hover:text-emerald-500" @click="ipc.closeWindow()"><IconClose /></button>
		</div>
	</div>
</template>
