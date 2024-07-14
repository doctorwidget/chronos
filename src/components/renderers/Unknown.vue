<script setup lang="ts">

import type { Chron } from '../../data/chrontypes';

const props = defineProps<{ 
    chron: Chron,
 }>();


</script>

<template>
    <div :class="$style.unknown">
        <h2>Unknown Chron Type</h2>
        <ul>
            <li>
                <em>name</em> <span>{{ props.chron.name }}</span>
            </li>
        </ul>
    </div>
</template>

<style module>
.unknown {
    background-color: salmon;
}
</style>