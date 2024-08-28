import { queryStringify } from "../utils/stringUtils.ts"; // Импортируем функцию для преобразования объекта в строку запроса
import { BASE_API_URL } from "../config.ts"; // Импортируем базовый URL API

// Перечисление для методов HTTP
enum METHODS {
    GET = 'GET', // Метод GET
    POST = 'POST', // Метод POST
    PUT = 'PUT', // Метод PUT
    DELETE = 'DELETE' // Метод DELETE
}

// Тип для опций запроса
type IOptionsRequest = {
    data?: object; // Данные для отправки в запросе (необязательные)
    method?:
        METHODS.GET
        | METHODS.POST
        | METHODS.PUT
        | METHODS.DELETE; // Метод HTTP (необязательный)
    timeout?: number; // Таймаут для запроса (необязательный)
    headers?: Record<string, string>; // Заголовки запроса (необязательные)
    params?: object; // Параметры запроса (необязательные)
}

// Тип для результата запроса
export type IResult = {
    status: number; // Код статуса ответа
    data: object; // Данные ответа
}

// Тип для HTTP-метода
type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<IResult>

// Класс для работы с HTTP-запросами
class HTTPPath {private readonly mainUrl: string = ''; // Основной URL для запросов
    constructor(main_url?: string) {this.mainUrl = main_url || BASE_API_URL} // Устанавливаем основной URL, если он не передан, используем базовый URL

    // Метод для выполнения GET-запроса
    get: HTTPMethod = (url, options = {}): Promise<IResult> => {
        return this.request(this.mainUrl + url + queryStringify(options.params as NonNullable<unknown> || {}) || '', {
            ...options,
            method: METHODS.GET // Устанавливаем метод GET
        }, options.timeout) as Promise<IResult>;
    };

    // Метод для выполнения PUT-запроса
    put: HTTPMethod = (url, options = {}) => {return this.request(this.mainUrl + url, { ...options, method: METHODS.PUT }, options.timeout) as Promise<IResult>;};
    // Метод для выполнения POST-запроса
    post: HTTPMethod = (url, options = {}) => {return this.request(this.mainUrl + url, { ...options, method: METHODS.POST }, options.timeout) as Promise<IResult>;};
    // Метод для выполнения DELETE-запроса
    delete: HTTPMethod = (url, options = {}) => {return this.request(this.mainUrl + url, { ...options, method: METHODS.DELETE }, options.timeout) as Promise<IResult>;};
    // Метод для выполнения HTTP-запроса
    request = (url: string, options: IOptionsRequest = { method: METHODS.GET }, timeout = 5000) => {const { method, data, headers } = options; // Деструктурируем опции запроса

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
            xhr.withCredentials = true; // Устанавливаем флаг для отправки учетных данных
            xhr.timeout = timeout; // Устанавливаем таймаут для запроса
            xhr.open(method || METHODS.GET, url); // Открываем соединение с указанным методом и URL

            // Устанавливаем заголовки запроса, если они указаны
            if (headers) {Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))}

            // Обработчик события загрузки
            xhr.onload = function () {
                // Проверяем, является ли ответ JSON
                if (xhr.getResponseHeader('content-type')?.includes('application/json')) {
                    const resultData = { status: xhr.status, data: JSON.parse(xhr.responseText) }; // Парсим ответ как JSON
                    resolve(resultData); // Разрешаем промис с результатом
                } else {resolve(xhr)} // Разрешаем промис с объектом XMLHttpRequest

            };
            // Обработчики ошибок
            xhr.onabort = reject; // Обработка отмены запроса
            xhr.onerror = reject; // Обработка ошибки запроса
            xhr.ontimeout = reject; // Обработка таймаута запроса

            // Отправка запроса
            if (method === METHODS.GET || !data) {xhr.send(); // Если метод GET или нет данных, отправляем запрос без данных
            } else if (data instanceof FormData) {xhr.send(data); // Если данные являются FormData, отправляем их
            } else {xhr.setRequestHeader('Content-Type', 'application/json'); // Устанавливаем заголовок для JSON
                xhr.send(JSON.stringify(data)); // Отправляем данные как JSON
            }
        });
    };
}

export default HTTPPath; // Экспортируем класс HTTPPath по умолчанию

