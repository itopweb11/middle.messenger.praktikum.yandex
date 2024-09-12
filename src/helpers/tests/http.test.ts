// Импортируем необходимые библиотеки для тестирования
import { assert } from "chai"; // Импортируем функцию assert из библиотеки Chai для проверки условий
import HTTPTransport from "../Http.ts"; // Импортируем класс HTTPTransport, который мы будем тестировать
import sinon, { SinonStub } from "sinon"; // Импортируем библиотеку Sinon для создания подмен и шпионов

// Определяем тестовый блок для HTTP Transport
describe('HTTP Transport', () => {
    let http: HTTPTransport; // Объявляем переменную для экземпляра HTTPTransport
    let stubRequest: SinonStub; // Объявляем переменную для подмены метода request

    // Выполняем код перед каждым тестом
    beforeEach(() => {
        http = new HTTPTransport(); // Создаем новый экземпляр HTTPTransport
        // Подменяем метод request, чтобы он возвращал успешный Promise
        stubRequest = sinon.stub(http, 'request').callsFake(() => Promise.resolve());
    });

    // Тестируем метод GET
    it('get should get request', () => {
        http.get('/url'); // Вызываем метод get с заданным URL
        assert(stubRequest.calledOnce); // Проверяем, что метод request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что метод request был вызван с правильным URL
    });

    // Тестируем метод PUT
    it('put should put request', () => {
        http.put('/url'); // Вызываем метод put с заданным URL
        assert(stubRequest.calledOnce); // Проверяем, что метод request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что метод request был вызван с правильным URL
    });

    // Тестируем метод POST
    it('post should POST request', () => {
        http.post('/url'); // Вызываем метод post с заданным URL
        assert(stubRequest.calledOnce); // Проверяем, что метод request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что метод request был вызван с правильным URL
    });

    // Тестируем метод DELETE
    it('delete should Delete request', () => {
        http.delete('/url'); // Вызываем метод delete с заданным URL
        assert(stubRequest.calledOnce); // Проверяем, что метод request был вызван один раз
        assert(stubRequest.calledWithMatch('/url')); // Проверяем, что метод request был вызван с правильным URL
    });
});