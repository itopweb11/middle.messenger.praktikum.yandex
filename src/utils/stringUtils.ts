import { isObject } from "./objectUtils.ts"; // Импортируем функцию для проверки, является ли значение объектом

// Определяем тип StringI как объект с ключами типа string и значениями любого типа
export type StringI = Record<string, unknown>;

// Функция для обрезки пробелов в строке
export const trim = (str: string, deleted?: string): string => {
    // Если строка не пустая и не указаны символы для удаления, просто обрезаем пробелы
    if (str && !deleted) return str.trim();

    // Разбиваем строку deleted на отдельные символы и экранируем их для регулярного выражения
    const chars = deleted?.split("").map(item => "\\" + item).join('');
    // Создаем регулярное выражение для удаления указанных символов
    const regexp = new RegExp(`[${chars}]`, 'g');
    // Преобразуем строку в массив символов
    const array = str.split('');
    // Индекс начала слова
    let startWord = 0;
    // Находим первый индекс, не соответствующий регулярному выражению
    for (let i = 0; i < array.length; i++) {
        // Устанавливаем индекс начала слова
        if (!array[i].match(regexp)) {startWord = i;
            break;
        }
    }
    let endWord = 0; // Индекс конца слова
    // Находим последний индекс, не соответствующий регулярному выражению
    for (let i = array.length - 1; i > startWord; i--) {
        // Устанавливаем индекс конца слова
        if (!array[i].match(regexp)) {endWord = i + 1;
            break;
        }
    }
    // Возвращаем обрезанную строку
    return str.substring(startWord, endWord);
}

// Функция для преобразования объекта в строку запроса
export function queryStringify(data: StringI) {
    // Проверяем, является ли входные данные объектом
    if (!isObject(data)) {throw Error('Input must be an object')} // Если нет, выбрасываем ошибку

    // Массив для хранения частей строки запроса
    const result: string[] = [];
    // Преобразуем объект в массив пар [ключ, значение] и обрабатываем каждую пару
    Object.entries(data).map(([key, value]) => {
        // Преобразуем значение в строку
        valueToString(key, value, result);
    })
    // Возвращаем строку запроса, начинающуюся с '?'
    return '?' + result.join("&");
}

// Функция для преобразования вложенного объекта в строку запроса
export const objToString = (keyItog: string, value: object, resultArray: string[]) => {
    // Преобразуем объект в массив пар [ключ, значение] и обрабатываем каждую пару
    Object.entries(value).map(([key, value]) => {
        // Формируем строку для вложенных объектов
        valueToString(`${keyItog}[${key}]`, value, resultArray);
    })
}

// Функция для преобразования массива в строку запроса
export const arrayToString = (key: string, value: Array<unknown>, resultArray: string[]) => {
    // Обрабатываем каждый элемент массива
    value.map((item, index) => {
        // Формируем строку для каждого элемента массива
        valueToString(`${key}[${String(index)}]`, item, resultArray);
    })
}

// Функция для преобразования значения в строку запроса
export const valueToString = (key: string, value: unknown, result: string[]) => {
    // Если значение является массивом, обрабатываем его
    if (Array.isArray(value)) return arrayToString(key, value, result);
    // Если значение является объектом, обрабатываем его
    if (isObject(value)) return objToString(key, value as NonNullable<unknown>, result);
    // Добавляем строку в массив результата в формате "ключ=значение"
    result.push(`${key}=${String(value)}`);
}
