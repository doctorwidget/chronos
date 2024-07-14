<script setup lang="ts">

import type { Ref } from 'vue';
import { computed } from 'vue';

import type { Chron } from './data/chrontypes';
import ChronViews from './components/ChronViews.vue';

/** inline our custom styles */
import './assets/chrons.css';

/**
 * *NEW* in Vue 3.4; the defineModel() macro
 * 
 * Defines a Ref<any> with the name you chose. 
 * 
 * Works just like a Ref most of the time - access with foo.value in the <script> block,
 * or as just plain {{foo}} in the template block. 
 * 
 * BUT you can pass it down to a child as their model,
 * and the child component will do the right thing.
 * This shaves off a few lines of code. 
 * 
 * It's a macro so you don't have to import it. 
 * 
 * The use case here is for something that is read-write, 
 * that you want to pass down to a child. That child is often
 * a vanilla HTMLElement right here in this component.
 * 
 * If there is no child component that needs to both read AND write,
 * then you probably are not gaining anything by using v-model. 
 */
 const targetAge = defineModel({
    default: "62",
});

const date2029 = new Date('2029-08-27T12:00:00');
const date2032 = new Date('2032-08-27T12:00:00');

// target date is read only, and computed based on targetAge
const targetDate = computed(() => {
    let age = targetAge.value;
    if (age === "62"){
        return date2029;
    } else if (age === "65") {
        return date2032;
    }
});

// chrons is also computed, and varies based on targetAge
const chrons: Ref<Array<Chron>> = computed(() => {
    const chronArray: Array<Chron> = [
        {
            name: 'SplitDuration',
            start: new Date('2016-05-16T12:00:00'),
            end: targetDate.value,
            title: 'Time to retirement'
        },
        {
            name: 'Countup',
        }
    ];

    return chronArray;
}); 


</script>

<template>
    <div :class="$style.root">
        <div>
            <strong>Target Age: </strong>
            <span>
                <input type="radio" id="a62" value="62" v-model.number="targetAge" />
                <label for="a62">62</label>

                <input type="radio" id="a65" value="65" v-model.number="targetAge" />
                <label for="a65">65</label>
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
