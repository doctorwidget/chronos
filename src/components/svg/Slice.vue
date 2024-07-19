<!-- a component that draws SVG <path> shaped like a pie slice 
It is always centered at (radius, radius),

Note: this just provides the <path>, not the outer SVG!

TODO: account for Cartesian vs Computer coordinates 
(Computer = clockwise from 90, Cartesian = counterclockwise from 180)


-->
<script setup lang="ts">

import type { Component } from 'vue';
import { computed } from 'vue';

const props = defineProps<{ 

    angle: number,

    className?: string,
    
    id?: string
    
    fillColor?: string,
    
    radius: number,

    strokeColor?: string,
    
    strokeWidth?: number,

 }>();


</script>

<template>
    <path></path>
</template>

<style module>

</style>