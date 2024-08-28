import HTTPPath from "../helpers/http.ts"; // Импортируем класс HTTPPath для выполнения HTTP-запросов
import { IChatUsersData } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейс для данных пользователей чата

export class ChatApi { // Класс для работы с API чатов
    private httpPath = new HTTPPath(); // Экземпляр класса HTTPPath для отправки HTTP-запросов
    private readonly mainUrl: string = '/chats'; // Основной URL-адрес API для чатов

    constructor(mainUrl?: string) { // Конструктор класса
        if (mainUrl) this.mainUrl = mainUrl; // Если передан mainUrl, устанавливаем его
    }

    // Метод для создания нового чата
    public createChat(title: string) {
        return this.httpPath.post(this.mainUrl, { data: { title: title } }); // Отправляем POST-запрос на /chats с заголовком нового чата
    }

    // Метод для получения списка чатов
    public getChats() {
        return this.httpPath.get(this.mainUrl); // Отправляем GET-запрос на /chats для получения списка чатов
    }

    // Метод для получения токена чата
    public getChatToken(id: string) {
        return this.httpPath.post(this.mainUrl + `/token/${id}`); // Отправляем POST-запрос на /chats/token/{id} для получения токена чата
    }

    // Метод для обновления аватара чата
    public updateChatAvatar(file: FormData, chatId: number) {
        file.append('chatId', String(chatId)); // Добавляем chatId в FormData
        return this.httpPath.put(this.mainUrl + '/avatar', { data: file }); // Отправляем PUT-запрос на /chats/avatar с FormData, содержащей файл и chatId
    }

    // Метод для добавления пользователей в чат
    public addChatUsers(userData: IChatUsersData) {
        return this.httpPath.put(this.mainUrl + '/users', { data: userData }); // Отправляем PUT-запрос на /chats/users с данными пользователей
    }

    // Метод для удаления пользователей из чата
    public deleteChatUsers(userData: IChatUsersData) {
        return this.httpPath.delete(this.mainUrl + '/users', { data: userData }); // Отправляем DELETE-запрос на /chats/users с данными пользователей
    }

    // Метод для получения списка пользователей чата
    public getChatUsers(id: string) {
        return this.httpPath.get(this.mainUrl + `/${id}/users`); // Отправляем GET-запрос на /chats/{id}/users для получения списка пользователей чата
    }

}

export default ChatApi;
