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
    <ChronViews :title="'chronomancy'" :chrons="chrons"></ChronViews>   
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
