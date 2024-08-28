import HTTPPath from "../helpers/Http.ts"; // Импортируем класс HTTPPath для выполнения HTTP-запросов
import { IAuthData, IUser } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейсы для данных аутентификации и пользователя

export class AuthApi { // Класс для работы с API аутентификации
    private httpRoute = new HTTPPath(); // Экземпляр класса HTTPPath для отправки HTTP-запросов
    private readonly mainUrl: string | null = null; // Основной URL-адрес API, может быть null

    constructor(mainUrl?: string) { // Конструктор класса
        if (mainUrl) this.mainUrl = mainUrl; // Если передан mainUrl, устанавливаем его
    }

    // Метод для регистрации пользователя
    public signUp(userData: IUser) {
        return this.httpRoute.post(this.mainUrl + '/signup', { data: userData }); // Отправляем POST-запрос на /signup с данными пользователя
    }

    // Метод для входа пользователя
    public signIn(userData: IAuthData) {
        return this.httpRoute.post(this.mainUrl + '/signin', { data: userData }); // Отправляем POST-запрос на /signin с данными аутентификации
    }

    // Метод для получения информации об аутентифицированном пользователе
    public getAuthUser() {
        return this.httpRoute.get(this.mainUrl + '/user'); // Отправляем GET-запрос на /user для получения данных пользователя
    }

    // Метод для выхода пользователя из системы
    public logOut() {
        return this.httpRoute.post(this.mainUrl + '/logout'); // Отправляем POST-запрос на /logout для выхода пользователя
    }
}

export default AuthApi;
