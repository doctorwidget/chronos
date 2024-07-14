<script setup lang="ts">
/** 
 * A panel for managing multiple chron views.
 */
import { ref } from 'vue';

import ChronView from './ChronView.vue';
import type { Chron } from '../data/chrontypes';

defineProps<{ 
    chrons: Array<Chron>, 
    title: string,
}>();

</script>

<template>
    <h1>{{ title }}</h1>
    <div :class="$style.chronList">
        <div v-for="chron in chrons">
            <ChronView :class="$style.chronItem" :chron="chron"></ChronView>
        </div>
    </div>
</template>

<style module>

.chronList {
    border: 1px solid var(--chron-list-border-color);
    padding: 1rem;
}

.chronItem {
    margin: 1rem 1rem 3rem 1rem;
}

</style>
