<!-- component that renders an SVG <text>>. That's it!-->
<script setup lang="ts">

import { computed } from 'vue';

import type { Point } from '../../util/trig/points';

export interface Props { 
    class: string | string[],
    loc: Point,
    content: string,

    // controls where the text appears relative to the starting point (the .loc)
    // This is similar (but not identical) to the CSS text-align property.
    // start = text extends rightwards from the starting point (x & y are the *start*)
    // middle = text is centered around the starting point (x & y are the *middle*)
    // end = text extends leftward from the starting point (x & y are the *end*)
    //
    anchor?: 'start' | 'middle' | 'end'
};

const props = withDefaults(defineProps<Props>(), {
    anchor: 'start',
});

const classes = computed(() => {
    if (typeof props.class === 'string'){
        return props.class.split(/s+/);
    } else {
        return props.class
    }
});
</script>


<script lang="ts">
    export default {
        name: "Text",
    };
</script>

<template>
    <text :class="classes" 
        :x="props.loc.x" 
        :y="props.loc.y"
        :text-anchor="props.anchor">
            {{ props.content }}
    </text>
</template>

