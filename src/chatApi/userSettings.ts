import HTTPPath from "../helpers/Http.ts"; // Импортируем класс HTTPPath для выполнения HTTP-запросов
import { IPasswords, IUser } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейсы для данных пользователя и паролей

export class UserSetting { // Класс для работы с настройками пользователя
    private httpPath = new HTTPPath(); // Экземпляр класса HTTPPath для отправки HTTP-запросов
    private readonly mainUrl: string | null = null; // Основной URL-адрес API, может быть null

    constructor(mainUrl?: string) { // Конструктор класса
        if (mainUrl) this.mainUrl = mainUrl; // Если передан mainUrl, устанавливаем его
    }

    // Метод для изменения профиля пользователя
    public changeProfile(userData: IUser) {
        return this.httpPath.put(this.mainUrl + '/profile',
            { data: userData }); // Отправляем PUT-запрос на /Profile с данными пользователя
    }

    // Метод для изменения аватара пользователя
    public changeAvatar(file: FormData) {
        return this.httpPath.put(this.mainUrl + '/profile/avatar',
            { data: file }); // Отправляем PUT-запрос на /Profile/avatar с данными файла
    }

    // Метод для изменения пароля пользователя
    public changePassword(data: IPasswords) {
        return this.httpPath.put(this.mainUrl + '/password',
            { data: data }); // Отправляем PUT-запрос на /password с данными паролей
    }

    // Метод для поиска пользователя по логину
    public searchUser(login: string) {
        return this.httpPath.post(this.mainUrl + '/search',
            { data: { login: login } }); // Отправляем POST-запрос на /search с логином
    }
}

export default UserSetting;
