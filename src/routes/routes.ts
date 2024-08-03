import Home from '../components/routes/Home.vue';
import DonutDemo from '../components/routes/DonutDemo.vue';
import PieSliceLab from '../components/routes/PieSliceLab.vue'; 
import PieSlicesLab from '../components/routes/PieSlicesLab.vue';


export const routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/arc', component: PieSliceLab },
    { path: '/arcs', component: PieSlicesLab },
    { path: '/pie', component: DonutDemo },
];