<script setup lang="ts">

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

/** inline our custom styles */
import './assets/chrons.css';
import Home from './components/routes/Home.vue';
import DonutDemo from './components/routes/DonutDemo.vue';
import PieSliceLab from './components/routes/PieSliceLab.vue'; 
import PieSlicesLab from './components/routes/PieSlicesLab.vue';

const router = useRouter();

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/arc', component: PieSliceLab },
  { path: '/arcs', component: PieSlicesLab },
  { path: '/pie', component: DonutDemo },
];

/**
 * Set up all the routes mount
 */
onMounted(() => {
    for (const r of routes) {
        router.addRoute(r);
    };

    // set a starting route
    router.replace(routes[0]);

});
</script>

<template>
    <div id="app-root" :class="$style.appRoot">
        <nav id="app-nav" :class="$style.appNav">
            <RouterLink :class="$style.navLink" data-navlink to="/">Home</RouterLink>
            <RouterLink :class="$style.navLink" data-navlink to="/arc">Arc</RouterLink>
            <RouterLink :class="$style.navLink" data-navlink to="/arcs">Arcs</RouterLink>
            <RouterLink :class="$style.navLink" data-navlink to="/pie">Donut</RouterLink>
        </nav>
        <main :class="$style.appMain">
            <RouterView />
        </main>
    </div>
</template>

<style module>

.appRoot {
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    width: 100%;
    min-width: 100%;
    position: relative;
}

.appNav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.navLink {
    padding: 0 1rem;
}

.appMain {
    display: flex;
    place-items: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
}

</style>

<style>
/** non-modularized styles */

#app-nav [data-navLink].router-link-exact-active {
    color: var(--chron-fg-alt);
}
</style>
