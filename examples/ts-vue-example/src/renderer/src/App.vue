<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useClipboard, useIntervalFn } from "@vueuse/core";
import WindowNav from "@renderer/components/WindowNav.vue";
import type { UniversalGameEvent } from "@overlayed/app/universal";
import type { SiegeEvent } from "@overlayed/app/siege";

type Event = UniversalGameEvent | SiegeEvent;

const { ipc } = window;

const events = ref<Array<Event>>([]);
const isConnectedToAnyGame = ref(false);
const clipboard = useClipboard();
const search = ref("");

const eventsToShow = computed(() =>
	events.value.filter((event) => event.type.toLowerCase().includes(search.value.toLowerCase())).slice(0, 250),
);

useIntervalFn(async () => {
	isConnectedToAnyGame.value = await ipc.isConnectedToAnyGame();
}, 1000);

ipc.getEvents()
	.then((storedEvents) => {
		events.value = storedEvents;
	})
	.finally(() => {
		ipc.onEvent((event) => {
			events.value.unshift(event);
		});
	});
</script>

<template>
	<WindowNav />
	<div class="flex flex-col h-full max-h-[calc(100vh-50px)] overflow-y-auto">
		<template v-if="!isConnectedToAnyGame">
			<div class="text-base text-zinc-300">No active games</div>
		</template>
		<template v-else-if="events.length === 0">
			<div class="text-base text-zinc-300">Listening for events...</div>
		</template>
		<template v-else>
			<div class="flex justify-between p-2 sticky top-0 bg-zinc-900">
				<label class="flex items-center gap-2">
					<span>Search</span>
					<input
						type="search"
						placeholder="logged_in"
						v-model="search"
						class="bg-zinc-800 px-2 py-1 rounded-sm focus:outline-none"
					/>
				</label>
				<button
					class="bg-zinc-700 px-3 py-1 rounded-sm cursor-pointer hover:bg-zinc-600"
					@click="clipboard.copy(JSON.stringify(events, null, 2))"
				>
					Copy Events to Clipboard
				</button>
			</div>
			<table>
				<thead>
					<tr class="bg-zinc-800 rounded-t-md sticky top-11">
						<th class="py-2 text-left px-3">Time</th>
						<th class="py-2 text-left px-3">Event</th>
						<th class="py-2 text-left px-3">Content</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="event in eventsToShow"
						:key="JSON.stringify(event)"
						class="group border-b border-zinc-700"
					>
						<td class="py-2 text-left px-3 border-b border-zinc-700">
							{{ new Date(event.creation_time).toLocaleString().split(" ")[1] }}
						</td>
						<td class="py-2 text-left px-3 border-b border-zinc-700">
							{{ event.type }}
						</td>
						<td class="py-2 text-left px-3 border-b border-zinc-700">
							<pre class="max-h-[300px] overflow-y-auto text-xs"
								>{{ "content" in event ? event.content : "-" }}
							</pre
							>
						</td>
					</tr>
				</tbody>
			</table>
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
