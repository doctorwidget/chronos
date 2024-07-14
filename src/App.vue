<script setup lang="ts">

import type { Chron } from './data/chrontypes';
import ChronViews from './components/ChronViews.vue';

/** inline our custom styles */
import './assets/chrons.css';

const chrons: Array<Chron> = [
    {
        name: 'SplitDuration',
        start: new Date('2016-05-16T12:00:00'),
        end: new Date('2029-08-27T12:00:00'),
        title: 'Time to retirement'
    },
    {
        name: 'Countup',
    }
];

</script>

<template>
    <div :class="$style.root">
        <ChronViews :title="'chronomancy'" :chrons="chrons"></ChronViews>   
    </div>
</template>

<style module>
.root {
    width: 100%;
    min-width: 100%;
}
</style>
