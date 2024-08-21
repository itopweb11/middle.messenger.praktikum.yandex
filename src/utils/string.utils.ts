import {isObject} from "./object.utils.ts";


export type StringIndexed = Record<string, unknown>;


export const trim = (str: string, deleted?: string): string => {
    if (str && !deleted) return str.trim();
    const chars = deleted?.split("").map(item => "\\" + item).join('');
    const regexp = new RegExp(`[${chars}]`, 'g');
    const array = str.split('');
    let startWord = 0;
    for (let i = 0; i < array.length; i++) {
        if (!array[i].match(regexp)) {
            startWord = i;
            break;
        }
    }
    let endWord = 0;
    for (let i = array.length - 1; i > startWord; i--) {
        if (!array[i].match(regexp)) {
            endWord = i + 1;
            break;
        }
    }

    return str.substring(startWord, endWord);
}

export function queryStringify(data: StringIndexed) {
    if (!isObject(data)) {
        throw Error('Input must be an object')
    }
    const result: string[] = [];
    Object.entries(data).map(([key, value]) => {
        valueToString(key, value, result)
    })
    return '?' + result.join("&");
}

export const objToString = (keyItog: string, value: object, resultArray: string[]) => {
    Object.entries(value).map(([key, value]) => {
        valueToString(`${keyItog}[${key}]`, value, resultArray)
    })
}

export const arrayToString = (key: string, value: Array<unknown>, resultArray: string[]) => {
    value.map((item, index) => {
        valueToString(`${key}[${String(index)}]`, item, resultArray)
    })
}

export const valueToString = (key: string, value: unknown, result: string[]) => {
    if (Array.isArray(value)) return arrayToString(key, value, result);
    if (isObject(value)) return objToString(key, value as NonNullable<unknown>, result);
    result.push(`${key}=${String(value)}`);
}
