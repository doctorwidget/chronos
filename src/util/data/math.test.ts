import { describe, expect, it } from 'vitest';

import { clamp, toPrecision, toUnitData } from './math';
import type { Datum, UnitDatum } from './types';

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

describe('the toUnitData function', () => {

    const simpleData: Array<Datum> = [
        {
            value: 50,
            units: 'days',
            category: 'done',
        },
        {
            value: 100,
            units: 'days',
            category: 'now',
        },
        {
            value: 150,
            units: 'days',
            category: 'left'
        },
    ];

    it('works for an array of simple scalar data', () => {
        const [done, now, left] = toUnitData(simpleData);

        // done category
        // expect a copy, not the original
        expect(done).not.toBe(simpleData[0]);

        // but the same underlying data
        expect(done.value).toBe(50);
        expect(done.category).toBe('done');

        // and now with a unitData property
        expect(done.I.value).toBeCloseTo(1/6);
        expect(done.I.percent(2)).toBe(16.67);

        /// now category
        // expect a copy, not the original
        expect(now).not.toBe(simpleData[1]);

        // but the same underlying data
        expect(now.value).toBe(100);
        expect(now.category).toBe('now');

        // and now with a unitData property
        expect(now.I.value).toBeCloseTo(1/3);
        expect(now.I.percent(2)).toBe(33.33);
        
        /// left category
        // expect a copy, not the original
        expect(left).not.toBe(simpleData[2]);

        // but the same underlying data
        expect(left.value).toBe(150);
        expect(left.category).toBe('left');

        // and now with a unitData property
        expect(left.I.value).toBeCloseTo(0.5);
        expect(left.I.percent(2)).toBe(50);
    });

});