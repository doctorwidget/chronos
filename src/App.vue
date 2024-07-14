<script setup lang="ts">

import type { Ref } from 'vue';
import { computed, ref } from 'vue';

import type { Chron } from './data/chrontypes';
import ChronViews from './components/ChronViews.vue';

/** inline our custom styles */
import './assets/chrons.css';

const date13 = new Date('2029-08-27T12:00:00');
const date16 = new Date('2032-08-27T12:00:00');

let chosenDate = ref(date13);

let longer = ref(null) as Ref<HTMLInputElement | null>;

const chrons: Ref<Array<Chron>> = computed(() => {
    const chronArray: Array<Chron> = [
        {
            name: 'SplitDuration',
            start: new Date('2016-05-16T12:00:00'),
            end: chosenDate.value,
            title: 'Time to retirement'
        },
        {
            name: 'Countup',
        }
    ];

    return chronArray;
}); 

const updateDate = (evt:Event) => {
    console.log('updating date!', evt);

    const input = longer.value;
    if (!input){
        return;
    }
    if (input.checked){
        chosenDate.value = date16;
    } else {
        chosenDate.value = date13;
    }

    console.log(`chosen date is now: `, chosenDate);
};

</script>

<template>
    <div :class="$style.root">
        <div>
            <span>
                <label>Longer?: 
                    <input ref="longer" @change="updateDate" type="checkbox" />
                </label>
            </span>
        </div>
        <ChronViews :title="'chronomancy'" :chrons="chrons"></ChronViews>   
    </div>
</template>

<style module>
.root {
    width: 100%;
    min-width: 100%;
}
</style>
