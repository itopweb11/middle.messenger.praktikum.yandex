import { getUser } from "./auth.ts"; // Функция для получения информации о пользователе
import Router from "../helpers/router.ts"; // Модуль для управления маршрутизацией
import { BASE_URLS } from "../config.ts"; // Константы с базовыми URL
import { IUser } from "../modalTypes/modalTypes.ts"; // Интерфейс для пользователя
import { getChats, getChatToken, getChatUsers } from "./chat.ts"; // Функции для работы с чатами
import { IChat } from "../modalTypes/modalTypes.ts"; // Интерфейс для чата
import { openConnectMessages } from "./send-message.ts"; // Функция для открытия соединения сообщений

// Функция для инициализации состояния приложения
const initialStateApp = async () => {
    const store = window.store.getState(); // Получение текущего состояния хранилища
    let user = null; // Переменная для хранения информации о пользователе
    try {
        user = await getUser(); // Попытка получить пользователя
        if (user) {
            Router.getRouter().go(BASE_URLS['page-chat']); // Если пользователь найден, перенаправляем на страницу чата
        }
    } catch (error) {
        // Если произошла ошибка при получении пользователя
        if (Router.getRouter().currentRoute !== BASE_URLS['page-sign-up']) {
            Router.getRouter().go(BASE_URLS['page-login']); // Перенаправляем на страницу логина
        }
        setStateUser(null); // Устанавливаем состояние пользователя в null
        return; // Завершаем выполнение функции
    }
    store.user = user as IUser; // Устанавливаем пользователя в состояние хранилища
    await updateChats(); // Обновляем список чатов
}

// Функция для обновления списка чатов
const updateChats = async () => {
    let chats: IChat[] = []; // Переменная для хранения чатов
    try {
        chats = await getChats(); // Получение списка чатов
    } catch (error) {
        setStateChats(chats); // Устанавливаем состояние чатов, даже если произошла ошибка
    }
    setStateChats(chats); // Устанавливаем состояние чатов
}

// Функция для инициализации пользователей чата
const initChatUsers = async (chat: IChat | null) => {
    if (!chat) return; // Если чат не указан, выходим из функции
    let users: IUser[] = []; // Переменная для хранения пользователей чата
    try {
        users = await getChatUsers(String(chat.id)); // Получение пользователей чата по его ID
    } catch (error) {
        setStateUsers(chat, []); // Устанавливаем пустой массив пользователей в случае ошибки
    }
    setStateUsers(chat, users); // Устанавливаем пользователей чата
}

// Функция для инициализации токена чата
const initChatToken = async (chat: IChat | null) => {
    if (!chat) return; // Если чат не указан, выходим из функции
    let token = ''; // Переменная для хранения токена
    try {
        token = await getChatToken(String(chat.id)); // Получение токена чата по его ID
    } catch (error) {
        setStateToken(chat, token); // Устанавливаем токен в случае ошибки
    }
    setStateToken(chat, token); // Устанавливаем токен чата
}

// Функция для установки состояния пользователя в хранилище
const setStateUser = (user?: IUser | null) => {
    window.store.set({ user: user }); // Устанавливаем пользователя в состояние хранилища
}

// Функция для установки состояния чатов в хранилище
const setStateChats = (chats: IChat[] | null) => {
    window.store.set({ chats: chats }); // Устанавливаем чаты в состояние хранилища
}

// Функция для установки состояния пользователей чата
const setStateUsers = (chat: IChat, users: IUser[]) => {
    chat.users = [...users]; // Обновляем список пользователей в чате
}

// Функция для установки токена чата
const setStateToken = (chat: IChat, token: string) => {
    chat.token = token; // Устанавливаем токен в чат
}

// Функция для установки текущего чата и инициализации его пользователей и токена
const setStateCurrentChat = async (chat: IChat | null) => {
    await initChatUsers(chat); // Инициализируем пользователей чата
    await initChatToken(chat); // Инициализируем токен чата
    const user = window.store.getState().user; // Получаем текущего пользователя из состояния
    if (chat && user) {
        const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id); // Поиск текущего чата в списке чатов
        if (foundedChat && chat.connection) {
            foundedChat.unread_count = 0; // Сбрасываем количество непрочитанных сообщений
        }
        openConnectMessages(chat, user); // Открываем соединение сообщений
    }
    window.store.set({ currentChat: chat, chats: window.store.getState().chats }); // Устанавливаем текущий чат и обновляем состояние чатов
}

// Экспортируем функции для использования в других модулях
export {
    initialStateApp,
    setStateUser,
    updateChats,
    setStateCurrentChat,
    setStateUsers,
    initChatToken,
    initChatUsers,
    setStateToken
}