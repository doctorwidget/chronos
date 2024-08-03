/**
 * Utilities for working with SVG styles (vs CSS styles)
 */
import type { Datum, KeyFn, StyleMap, SvgStyle } from '../data/types';


export type ThemeCategory = {
    fill: string,
    stroke: string,
    width: number,
}
export type Theme = Array<ThemeCategory>;

/**
 * TODO: more themes!
 */
export const DefaultTheme: Theme = [
    {
        fill: 'skyblue',
        stroke: 'blue',
        width: 2,
    },
    {
        fill: 'palegreen',
        stroke: 'green',
        width: 2,
    },
    {
        fill: 'lightpink',
        stroke: 'red',
        width: 2,
    },
    {
        fill: 'lightyellow',
        stroke: 'yellow',
        width: 2,
    },
    {
        fill: 'lightsalmon',
        stroke: 'darkorange',
        width: 2,
    },
    {
        fill: 'plum',
        stroke: 'purple',
        width: 2,
    }
];

// todo: add more themes
const themes: Record<string, Theme> = {
    'default': DefaultTheme,
}

// simplest possible key fn
const defaultKeyFn: KeyFn = (d:Datum) => d.category || '';

/**
 * Get a style map for a data set using a given theme.
 * 
 * @param { Array<Datum>} [data] - data to create a stylemap for
 * @param { string } [themeName='default'] - which theme to use
 * @param { KeyFn } [keyFn = defaultKeyFn] - key function
 * @return { StyleMap } - map of categories to styles
 */
export const createStyleMap = (data:Array<Datum> = [],
                                themeName = 'default', 
                                keyFn = defaultKeyFn, 
                                ): StyleMap => {
    // for now we just use the DefaultTheme every time!
    const theme = themes[themeName];

    const categories = new Set<string>();
    for (const d of data) {
        categories.add(keyFn(d));
    }

    const map = {} as Record<string, SvgStyle>;
    let index = 0;
    for (const c of [...categories.values()]) {
        const themeColor = theme[index];
        map[c] = {
            fillColor: themeColor.fill,
            strokeColor: themeColor.stroke,
            strokeWidth: themeColor.width,
        };
        index += 1;
    }

    // now return this default styleMap
    return {
        keyFn,
        styles: map,
    }
};