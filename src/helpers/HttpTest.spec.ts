// Импортируем assert из библиотеки chai для утверждений
import { assert } from "chai";
// Импортируем класс HTTPTransport из файла Http.ts
import HTTPTransport from "./Http.ts";
// Импортируем sinon и SinonStub для создания шпионов и моков
import sinon, { SinonStub } from "sinon";
// Импортируем функцию describe из модуля node:test для организации тестов
import { describe } from "node:test";

// Описание тестового блока для класса HTTPTransport
describe('HTTP Transport', () => {
    let http: HTTPTransport; // Переменная для хранения экземпляра HTTPTransport
    let stubRequest: SinonStub; // Переменная для хранения шпиона на метод request

    // Выполняется перед каждым тестом
    beforeEach(() => {
        http = new HTTPTransport(); // Создаем новый экземпляр HTTPTransport
        // Создаем шпион для метода request, который возвращает успешный Promise
        stubRequest = sinon.stub(http, 'request').callsFake(() => Promise.resolve());
    });

    // Тест для проверки, что метод get вызывает request
    it('проверка, что метод get вызывает request', () => {
        http.get('/url'); // Вызываем метод get с URL
        assert(stubRequest.calledOnce); // Проверяем, что request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что request был вызван с правильным URL
    });

    // Тест для проверки, что метод put вызывает request
    it('проверка, что метод put вызывает request', () => {
        http.put('/url'); // Вызываем метод put с URL
        assert(stubRequest.calledOnce); // Проверяем, что request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что request был вызван с правильным URL
    });

    // Тест для проверки, что метод post вызывает request
    it('проверка, что метод post вызывает request', () => {
        http.post('/url'); // Вызываем метод post с URL
        assert(stubRequest.calledOnce); // Проверяем, что request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что request был вызван с правильным URL
    });

    // Тест для проверки, что метод delete вызывает request
    it('проверка, что метод delete вызывает request', () => {
        http.delete('/url'); // Вызываем метод delete с URL
        assert(stubRequest.calledOnce); // Проверяем, что request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что request был вызван с правильным URL
    });
});

