import { describe, expect, it } from 'vitest';

import { UnitInterval } from './types';

describe('the UnitInterval class', () => {

    const u0 = new UnitInterval(0);
    const u1 = new UnitInterval(1/9);
    const u3 = new UnitInterval(1/3);
    const u5 = new UnitInterval(0.5);
    const u9 = new UnitInterval(0.999999999);
    const uOne = new UnitInterval(1);
    const uPi = new UnitInterval(Math.PI - 3);

    it('works for simple values between 0 and 1', () => {
        expect(u0.value).toBe(0);
        expect(u1.value).toBe(1/9);
        expect(u3.value).toBe(1/3);
        expect(u5.value).toBe(0.5);
        expect(u9.value).toBe(0.999999999)
        expect(uOne.value).toBe(1);
        expect(uPi.value).toBe(Math.PI - 3)
    });

    it('throws errors for numbers below 0', () => {
        const bad = () => new UnitInterval(-1);
        expect(bad).toThrowError();
    });

    it('throws errors for numbers above 1', () => {
        const bad = () => new UnitInterval(1.0000000001);
        expect(bad).toThrowError();
    });

    it('has a working percent() method', () => {
        expect(u0.percent()).toBe(0);
        expect(u0.percent(2)).toBe(0);

        expect(u1.percent()).toBe(11);
        expect(u1.percent(2)).toBe(11.11);

        expect(u3.percent()).toBe(33);
        expect(u3.percent(2)).toBe(33.33);
        expect(u3.percent(6)).toBe(33.333333);

        expect(u5.percent()).toBe(50);
        expect(u5.percent(2)).toBe(50);

        expect(u9.percent()).toBe(100);
        expect(u9.percent(2)).toBe(100);
        expect(u9.percent(6)).toBe(100);

        expect(uOne.percent()).toBe(100);
        expect(uOne.percent(2)).toBe(100);

        expect(uPi.percent()).toBe(14);
        expect(uPi.percent(2)).toBe(14.16);
        expect(uPi.percent(4)).toBe(14.1593);
    });

});