import { getUser } from "./auth.ts"; // Импортируем функцию для получения информации о пользователе
import Router from "../helpers/router.ts"; // Импортируем маршрутизатор для управления навигацией
import { BASE_URLS } from "../config.ts"; // Импортируем базовые URL-адреса из конфигурации
import { IUser } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейс IUser
import { getChats, getChatToken, getChatUsers } from "./chat.ts"; // Импортируем функции для работы с чатами
import { IChat } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейс IChat
import { connectMessages } from "./sendMessage.ts"; // Импортируем функцию для открытия соединения сообщений

// Асинхронная функция для инициализации состояния приложения
const stateApp = async () => {
    const store = window.store.getState(); // Получаем текущее состояние хранилища
    let user = null; // Переменная для хранения пользователя
    try {
        user = await getUser(); // Получаем информацию о пользователе
        if (user) {
            Router.getRouter().go(BASE_URLS['page-chat']); // Если пользователь существует, перенаправляем на страницу чата
        }
    } catch (error) {
        // Если произошла ошибка при получении пользователя
        if (Router.getRouter().currentRoute !== BASE_URLS['page-sign-up']) {
            Router.getRouter().go(BASE_URLS['page-login']); // Перенаправляем на страницу входа
        }
        stateUser(null); // Устанавливаем состояние пользователя как null
        return; // Выходим из функции
    }
    store.user = user as IUser; // Обновляем состояние пользователя в хранилище
    await renovateChats(); // Обновляем список чатов
}

// Асинхронная функция для обновления списка чатов
const renovateChats = async () => {
    let chats: IChat[] = []; // Переменная для хранения чатов
    try {
        chats = await getChats(); // Получаем список чатов
    } catch (error) {
        stateChats(chats); // Устанавливаем состояние чатов в хранилище
    }
    stateChats(chats); // Устанавливаем состояние чатов в хранилище
}

// Асинхронная функция для инициализации пользователей чата
const initialChatUsers = async (chat: IChat | null) => {
    if (!chat) return; // Если чат не передан, выходим из функции
    let users: IUser[] = []; // Переменная для хранения пользователей чата
    try {
        users = await getChatUsers(String(chat.id)); // Получаем пользователей чата по его ID
    } catch (error) {
        stateUsers(chat, []); // Устанавливаем состояние пользователей чата в хранилище
    }
    stateUsers(chat, users); // Устанавливаем состояние пользователей чата в хранилище
}

// Асинхронная функция для инициализации токена чата
const initialChatToken = async (chat: IChat | null) => {
    if (!chat) return; // Если чат не передан, выходим из функции
    let token = ''; // Переменная для хранения токена чата
    try {
        token = await getChatToken(String(chat.id)); // Получаем токен чата по его ID
    } catch (error) {
        stateToken(chat, token); // Устанавливаем состояние токена чата в хранилище
    }
    stateToken(chat, token); // Устанавливаем состояние токена чата в хранилище
}

// Функция для обновления состояния пользователя в хранилище
const stateUser = (user?: IUser | null) => {
    window.store.set({ user: user }); // Устанавливаем состояние пользователя в хранилище
}

// Функция для обновления состояния чатов в хранилище
const stateChats = (chats: IChat[] | null) => {
    window.store.set({ chats: chats }); // Устанавливаем состояние чатов в хранилище
}

// Функция для обновления состояния пользователей чата
const stateUsers = (chat: IChat, users: IUser[]) => {
    chat.users = [...users]; // Обновляем пользователей чата
}

// Функция для обновления состояния токена чата
const stateToken = (chat: IChat, token: string) => {
    chat.token = token; // Устанавливаем токен чата
}

// Асинхронная функция для обновления состояния текущего чата
const stateCurrentChat = async (chat: IChat | null) => {
    await initialChatUsers(chat); // Инициализируем пользователей чата
    await initialChatToken(chat); // Инициализируем токен чата
    const user = window.store.getState().user; // Получаем текущего пользователя
    if (chat && user) {
        const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id); // Находим чат по ID
        if (foundedChat && chat.connection) { foundedChat.unreadCount = 0; } // Сбрасываем количество непрочитанных сообщений
        connectMessages(chat, user); // Открываем соединение для отправки сообщений
    }
    window.store.set({ currentChat: chat, chats: window.store.getState().chats }); // Устанавливаем текущее состояние чата и чатов в хранилище
}

// Экспортируем функции для использования в других модулях
export {
    stateApp,
    stateUser,
    renovateChats,
    stateCurrentChat,
    stateUsers,
    initialChatToken,
    initialChatUsers,
    stateToken
}

