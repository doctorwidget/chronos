<script setup lang="ts">

import type { Component } from 'vue';
import { computed } from 'vue';

import type { Chron } from '../data/chrontypes';
import SplitDuration from './renderers/SplitDuration.vue';
import Unknown from './renderers/Unknown.vue';

const props = defineProps<{ 
    chron: Chron,
 }>();

const renderer = computed(():Component => {
    let component;
    if (props.chron.name.startsWith('SplitDuration')){
        component = SplitDuration;
    } else {
        component = Unknown;
    }

    return component;
});


</script>

<template>
    <component :class="$style.chronView" :is="renderer" :chron="chron"></component>
</template>

<style module>

.chronView {
    border: 1px solid var(--chron-view-border-color);
    padding: 10px;
}
</style>
