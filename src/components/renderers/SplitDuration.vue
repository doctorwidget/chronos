<script setup lang="ts">

import type { Chron } from '../../data/chrontypes';

const props = defineProps<{ 
    chron: Chron,
 }>();


</script>

<script lang="ts">
/** allow importers to check 'SplitDuration.name'
 * E.g. see the switch statement in ../ChronView.vue;
 * If we don't have this clause here, 'SplitDuration.vue' is undefined,
 * and a 'SplitDuration' chron will be routed to the Unknown renderer 
 * instead of being routed here
 */
export default {
    name: 'SplitDuration',
}
</script>

<template>
    <div :class="$style.splitDuration">
        <h2>{{ props.chron.title }}</h2>
        <ul>
            <li>
                <em>Start</em> <span>{{ props.chron.start }}</span>
            </li>
            <li>
                <em>End</em> <span>{{ props.chron.end }}</span>
            </li>
        </ul>
    </div>
</template>

<style module>
.splitDuration {
    border: 1px dotted magenta;
}
</style>
