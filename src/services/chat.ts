import { responseHasError } from "../utils/apiUtils.ts"; // Импортируем утилиту для проверки ошибок в ответах API
import ChatApi from "../chatApi/chat.ts"; // Импортируем класс для работы с API чатов
import { IChat, IChatUsersData, IUser } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейсы для чата и пользователей
import { stateCurrentChat, renovateChats } from "./app.ts"; // Импортируем функции для обновления состояния чата и списка чатов

// Создаем экземпляр ChatApi с базовым URL для чатов
const chatApi = new ChatApi('/chats');

// Асинхронная функция для получения списка чатов
const getChats = async (): Promise<IChat[]> => {
    // Вызываем метод API для получения чатов
    const result = await chatApi.getChats();
    // Проверяем наличие ошибок в ответе
    responseHasError(result);
    // Возвращаем данные чатов
    return result.data as IChat[];
}

// Асинхронная функция для создания нового чата
const createChat = async (title: string): Promise<IChat> => {
    // Вызываем метод API для создания чата
    const result = await chatApi.createChat(title);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Возвращаем данные нового чата
    return result.data as IChat;
}

// Асинхронная функция для добавления пользователей в чат
const addChatUser = async (data: IChatUsersData) => {
    // Вызываем метод API для добавления пользователей
    const result = await chatApi.addChatUsers(data);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Обновляем список чатов после добавления пользователей
    await renovateChats();
}

// Асинхронная функция для удаления пользователей из чата
const deleteChatUsers = async (data: IChatUsersData) => {
    // Вызываем метод API для удаления пользователей
    const result = await chatApi.deleteChatUsers(data);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Обновляем список чатов после удаления пользователей
    await renovateChats();
}

// Асинхронная функция для получения пользователей чата по его ID
const getChatUsers = async (idChat: string): Promise<IUser[]> => {
    // Вызываем метод API для получения пользователей чата
    const result = await chatApi.getChatUsers(idChat);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Возвращаем данные пользователей
    return result.data as IUser[];
}

// Асинхронная функция для получения токена чата по его ID
const getChatToken = async (idChat: string): Promise<string> => {
    // Вызываем метод API для получения токена чата
    const result = await chatApi.getChatToken(idChat);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Возвращаем токен чата
    return (result.data as { token: string }).token;
}

// Асинхронная функция для обновления аватара чата
const updateChatAvatar = async (newAvatar: FormData, chatId: number) => {
    // Вызываем метод API для обновления аватара
    const result = await chatApi.updateChatAvatar(newAvatar, chatId);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Обновляем состояние текущего чата
    await stateCurrentChat(result.data as IChat);
    // Возвращаем данные обновленного чата
    return result.data as IChat;
}

// Экспортируем функции для использования в других модулях
export {
    updateChatAvatar,
    deleteChatUsers,
    getChatUsers,
    getChatToken,
    addChatUser,
    createChat,
    getChats
}

