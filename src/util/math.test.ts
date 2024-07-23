import { describe, expect, it } from 'vitest';

import { clamp } from './math';

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