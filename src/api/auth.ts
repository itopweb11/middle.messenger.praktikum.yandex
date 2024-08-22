import HTTPTransport from "../helpers/Http.ts"; // Импорт класса HTTPTransport для выполнения HTTP-запросов
import { IAuthData, IUser } from "../modalTypes/modalTypes.ts"; // Импорт интерфейсов для данных аутентификации и пользователя

// Класс для работы с API аутентификации
export class AuthApi {
    private httpTransport = new HTTPTransport(); // Создание экземпляра HTTPTransport для выполнения запросов
    private readonly baseUrl: string | null = null; // Базовый URL для API аутентификации (может быть null)

    // Конструктор класса
    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl; // Если передан baseUrl, устанавливаем его
    }

    // Метод для регистрации пользователя
    public signUp(userData: IUser) {
        return this.httpTransport.post(this.baseUrl + '/signup', { data: userData }); // Отправка POST-запроса на /signup с данными пользователя
    }

    // Метод для авторизации пользователя
    public signIn(userData: IAuthData) {
        return this.httpTransport.post(this.baseUrl + '/signin', { data: userData }); // Отправка POST-запроса на /signin с данными аутентификации
    }

    // Метод для получения информации об авторизованном пользователе
    public getAuthUser() {
        return this.httpTransport.get(this.baseUrl + '/user'); // Отправка GET-запроса на /user для получения информации о пользователе
    }

    // Метод для выхода из системы
    public logOut() {
        return this.httpTransport.post(this.baseUrl + '/logout'); // Отправка POST-запроса на /logout для выхода из системы
    }
}

// Экспорт класса AuthApi по умолчанию
export default AuthApi