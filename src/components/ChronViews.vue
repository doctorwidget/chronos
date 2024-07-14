<script setup lang="ts">
/** 
 * A panel for managing multiple chron views.
 */

import ChronView from './ChronView.vue';
import type { Chron } from '../data/chrontypes';

defineProps<{ 
    chrons: Array<Chron>, 
    title: string,
}>();

</script>

<template>
    <h1>{{ title }}</h1>
    <div :class="[$style.chronList, $style.chronViews]">
        <div v-for="chron in chrons">
            <ChronView :class="$style.chronItem" :chron="chron"></ChronView>
        </div>
    </div>
</template>

<style module>

.chronViews {
    padding: 1rem;
}

.chronList {
    border: 1px solid var(--chron-list-border-color);
}

.chronItem {
    margin: 1rem 1rem 3rem 1rem;
}

</style>
