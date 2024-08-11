/**
 * A directive to make an SVG element draggable. 
 * Uses explicitly SVG-centric properties like :x and :y.
 * 
 * So if you have something like a circle which lacks :x and :y,
 * you should wrap that circle in a <g>, give the <g> an :x and :y,
 * and apply the directive to the <g>.
 * 
 * An HTML-centric version would use things like :top and :left instead.
 * TODO: refactor to be generic enough to use with either SVG or HTML elements.
 */
import { DirectiveBinding, ObjectDirective, VNode } from "vue";


/**
 * Handler for when the element first mounts
 * @param { Element } el - the svg element to be dragged
 * @param { DirectiveBinding } binding - binding details, e.g. value, args, modifiers
 * @param { VNode } node - the Vue node associated with the raw Element
 */ 
const mounted = (el:Element, binding:DirectiveBinding, node:VNode) => {
    console.log(`vDraggable MOUNTED: `, el, binding, node);

};

/**
 * Handler for whenever the element updates
 * @param { Element } el - the svg element to be dragged
 * @param { DirectiveBinding } binding - binding details, e.g. value, args, modifiers
 * @param { VNode } node - the Vue node associated with the raw Element
 */ 
const updated = (el:Element, binding:DirectiveBinding, node:VNode) => {
    console.log(`vDraggable UPDATED `, el, binding, node);
};


/**
 * Custom directive to make an SVG draggable.
 */
export const vDraggable: ObjectDirective = {
    mounted,
    updated,
};
