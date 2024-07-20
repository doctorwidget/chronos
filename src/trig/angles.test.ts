import { describe, expect, it } from 'vitest';

import { getPoint, getX, getY } from './angles';
import { degrees } from './units';


const zero = degrees(0);
const thirty = degrees(30);
const fortyfive = degrees(45);
const sixty = degrees(60);
const right = degrees(90);
const oblique = degrees(135);
const hemi = degrees(180);
const threeQuarter = degrees(270);
const circ = degrees(360);
const negThirty = degrees(-30);
const negSixty = degrees(-60);
const negRight = degrees(-90);


describe('the getX function', ()=> {

    it('works as expected for zero degrees', () => {
        const x = getX(zero, 1);
        expect(x).toBe(1);

        const x100 = getX(zero, 100);
        expect(x100).toBe(100);
    });

    it('works as expected for thirty degrees', () => {
        const x = getX(thirty, 1);
        expect(x).toBeCloseTo(0.866);

        const x100 = getX(thirty, 100);
        expect(x100).toBeCloseTo(86.6);
    });

    it('works as expected for forty-five degrees', () => {
        const x = getX(fortyfive, 1);
        expect(x).toBeCloseTo(0.7071);

        const x100 = getX(fortyfive, 100);
        expect(x100).toBeCloseTo(70.71);
    });

    it('works as expected for sixty degrees', () => {
        const x = getX(sixty, 1);
        expect(x).toBeCloseTo(0.5);

        const x100 = getX(sixty, 100);
        expect(x100).toBeCloseTo(50);
    });

    it('works as expected for a right angle', () => {
        const x = getX(right, 1);
        expect(x).toBeCloseTo(0);

        const x100 = getX(right, 100);
        expect(x100).toBeCloseTo(0);
    });

    it('works as expected for a 135 degree angle', () => {
        const x = getX(oblique, 1);
        expect(x).toBeCloseTo(-0.7071);

        const x100 = getX(oblique, 100);
        expect(x100).toBeCloseTo(-70.71);
    });

    it('works as expected for a hemicircle', () => {
        const x = getX(hemi, 1);
        expect(x).toBe(-1);

        const x100 = getX(hemi, 100);
        expect(x100).toBe(-100);
    });

    it('works as expected for a 270 degree angle', () => {
        const x = getX(threeQuarter, 1);
        expect(x).toBeCloseTo(0);

        const x100 = getX(threeQuarter, 100);
        expect(x100).toBeCloseTo(0);
    });

    it('works as expected for a full circle', () => {
        const x = getX(circ, 1);
        expect(x).toBe(1);

        const x100 = getX(circ, 100);
        expect(x100).toBe(100);
    });

    it('works as expected for a negative thirty degree angle', () => {
        const x = getX(negThirty, 1);
        expect(x).toBeCloseTo(0.866);

        const x100 = getX(negThirty, 100);
        expect(x100).toBeCloseTo(86.6);
    });

    it('works as expected for a negative sixty degree angle', () => {
        const x = getX(negSixty, 1);
        expect(x).toBeCloseTo(0.5);

        const x100 = getX(negSixty, 100);
        expect(x100).toBeCloseTo(50);
    });

    it('works as expected for a negative right angle', () => {
        const x = getX(negRight, 1);
        expect(x).toBeCloseTo(0);

        const x100 = getX(negRight, 100);
        expect(x100).toBeCloseTo(0);
    });

});

describe('the getY function', ()=> {

    it('works as expected for zero degrees', () => {
        const y = getY(zero, 1);
        expect(y).toBe(0);

        const y100 = getY(zero, 100);
        expect(y100).toBe(0);
    });

    it('works as expected for thirty degrees', () => {
        const y = getY(thirty, 1);
        expect(y).toBeCloseTo(0.5);

        const y100 = getY(thirty, 100);
        expect(y100).toBeCloseTo(50);
    });

    it('works as expected for forty-five degrees', () => {
        const y = getY(fortyfive, 1);
        expect(y).toBeCloseTo(0.7071);

        const y100 = getY(fortyfive, 100);
        expect(y100).toBeCloseTo(70.71);
    });

    it('works as expected for sixty degrees', () => {
        const y = getY(sixty, 1);
        expect(y).toBeCloseTo(0.866);

        const y100 = getY(sixty, 100);
        expect(y100).toBeCloseTo(86.6);
    });

    it('works as expected for a right angle', () => {
        const y = getY(right, 1);
        expect(y).toBe(1);

        const y100 = getY(right, 100);
        expect(y100).toBe(100);
    });

    it('works as expected for a 135 degree angle', () => {
        const y = getY(oblique, 1);
        expect(y).toBeCloseTo(0.7071);

        const y100 = getY(oblique, 100);
        expect(y100).toBeCloseTo(70.71);
    });

    it('works as expected for a hemicircle', () => {
        const y = getY(hemi, 1);
        expect(y).toBeCloseTo(0);

        const y100 = getY(hemi, 100);
        expect(y100).toBeCloseTo(0);
    });

    it('works as expected for a 270 degree angle', () => {
        const y = getY(threeQuarter, 1);
        expect(y).toBeCloseTo(-1);

        const y100 = getY(threeQuarter, 100);
        expect(y100).toBeCloseTo(-100);
    });

    it('works as expected for a full circle', () => {
        const y = getY(circ, 1);
        expect(y).toBeCloseTo(0);

        const y100 = getY(circ, 100);
        expect(y100).toBeCloseTo(0);
    });

    it('works as expected for a negative thirty degree angle', () => {
        const y = getY(negThirty, 1);
        expect(y).toBeCloseTo(-0.5);

        const y100 = getY(negThirty, 100);
        expect(y100).toBeCloseTo(-50);
    });

    it('works as expected for a negative sixty degree angle', () => {
        const y = getY(negSixty, 1);
        expect(y).toBeCloseTo(-0.866);

        const y100 = getY(negSixty, 100);
        expect(y100).toBeCloseTo(-86.6);
    });

    it('works as expected for a negative right angle', () => {
        const y = getY(negRight, 1);
        expect(y).toBeCloseTo(-1);

        const y100 = getY(negRight, 100);
        expect(y100).toBeCloseTo(-100);
    });
});

describe('the getPoint function', () => {

    it('works as expected for zero degrees', () => {
        const p = getPoint(zero, 100);
        expect(p.x).toBe(100);
        expect(p.y).toBe(0);
    });

    it('works as expected for thirty degrees', () => {
        const p = getPoint(thirty, 100);
        expect(p.x).toBeCloseTo(86.6);
        expect(p.y).toBeCloseTo(50);
    });

    it('works as expected for forty-five degrees', () => {
        const p = getPoint(fortyfive, 100);
        expect(p.x).toBeCloseTo(70.71);
        expect(p.y).toBeCloseTo(70.71);
    });

    it('works as expected for sixty degrees', () => {
        const p = getPoint(sixty, 100);
        expect(p.x).toBeCloseTo(50);
        expect(p.y).toBeCloseTo(86.6);
    });

    it('works as expected for a right angle', () => {
        const p = getPoint(right, 100);
        expect(p.x).toBeCloseTo(0);
        expect(p.y).toBe(100);
    });

    it('works as expected for a 135 degree angle', () => {
        const p = getPoint(oblique, 100);
        expect(p.x).toBeCloseTo(-70.71);
        expect(p.y).toBeCloseTo(70.71);
    });

    it('works as expected for a hemicircle', () => {
        const p = getPoint(hemi, 100);
        expect(p.x).toBeCloseTo(-100);
        expect(p.y).toBeCloseTo(0);
    });

    it('works as expected for a 270 degree angle', () => {
        const p = getPoint(threeQuarter, 100);
        expect(p.x).toBeCloseTo(0);
        expect(p.y).toBeCloseTo(-100);
    });

});
