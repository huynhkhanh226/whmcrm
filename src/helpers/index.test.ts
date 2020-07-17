import { Common } from './index';
import Config from '../config/Config';

describe('Helpers', () => {

    beforeEach(() => {
        Config.api = "https://api.covid19api.com";
        Config.PUBLIC_URL = "/fe_hkhanh";
        return Config;
    });

    test('verify getUrl()', () => {
        expect(Common.getUrl('/country')).toBe("https://api.covid19api.com/country");
    });

    test('Verify that converting date string to dd/MM/yyyy with day < 10', () => {
        const d = new Date("2012/12/02").toISOString();
        expect(Common.formatDate(d)).toBe("02/12/2012");
    });

    test('Verify that converting date string to dd/MM/yyyy with month < 10', () => {
        const d = new Date("2012/09/02").toISOString();
        expect(Common.formatDate(d)).toBe("02/09/2012");
    });

    test('Verify that sum by column in array', () => {
        const arr = [
            {
                a: 10,
                b: 20
            },
            {
                a: 30,
                b: 40
            }
        ]
        expect(Common.sumColumn(arr, "a")).toEqual(40);
        expect(Common.sumColumn(arr, "b")).toEqual(60);
    });

    test('Verify that convering from UpperCase to capitalize in object', () => {
        const obj ={
            A: 10,
            B: 20
        };
        const convert = Common.convertResponse<{[key:string]: any}>(obj);
        expect(convert.hasOwnProperty("a")).toBeTruthy();
        expect(convert.hasOwnProperty("b")).toBeTruthy();
    });

    test('verify url()', () => {
        expect(Common.url()).toBe("/fe_hkhanh");
    });

});