import { describe, expect, it } from 'vitest';

import { clamp, toPrecision } from './math';

describe('the clamp function', () => {

    it('works for numbers within the range', () => {
        expect(clamp(5, 1, 10)).toBe(5);
    });

    it('works for numbers below the minimum', () => {
        expect(clamp(-5, 1, 10)).toBe(1);
    });

    it('works for numbers above the maximum', () => {
        expect(clamp(100, 1, 10)).toBe(10);
    });

    it('errors out when giving invalid constraints', () => {
        const badCall = () => clamp(5, 10, 1);
        expect(badCall).toThrowError(/invalid clamp constraints/);
    });

});

describe('the toPrecision function', () => {

    it('works to zero digits', () => {
        expect(toPrecision(Math.PI, 0)).toBe(3);
    });

    it('works to one digit', () => {
        expect(toPrecision(Math.PI, 1)).toBe(3.1);
    });

    it('works to two digits', () => {
        expect(toPrecision(Math.PI, 2)).toBe(3.14);
    });

    it('works to three digits', () => {
        expect(toPrecision(Math.PI, 3)).toBe(3.142);
    });

    it('works to four digits', () => {
        expect(toPrecision(Math.PI, 4)).toBe(3.1416);
    });

    it ('works to five digits', () => {
        expect(toPrecision(Math.PI, 5)).toBe(3.14159);
    });

    it ('works to six digits', () => {
        expect(toPrecision(Math.PI, 6)).toBe(3.141593);
    });

    it('works to seven digits', () => {
        expect(toPrecision(Math.PI, 7)).toBe(3.1415927);
    });

    it('works to eight digits', () => {
        expect(toPrecision(Math.PI, 8)).toBe(3.14159265);
    });

    it('works to nine digits', () => {
        expect(toPrecision(Math.PI, 9)).toBe(3.141592654);
    });
    
});