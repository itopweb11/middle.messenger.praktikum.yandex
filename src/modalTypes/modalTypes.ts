import SocketIO from "../chatApi/socketApi.ts"; // Импортируем класс для работы с WebSocket

// Интерфейс для представления пользователя
export interface IUser {
    login?: string; // Логин пользователя (необязательное поле)
    password?: string; // Пароль пользователя (необязательное поле)
    display_name?: string; // Отображаемое имя пользователя (необязательное поле)
    first_name: string; // Имя пользователя (обязательное поле)
    second_name: string; // Фамилия пользователя (обязательное поле)
    phone: string; // Телефон пользователя (обязательное поле)
    email: string; // Email пользователя (обязательное поле)
    avatar?: string; // Аватар пользователя (необязательное поле)
    id?: string; // ID пользователя (необязательное поле)
}

// Интерфейс для данных аутентификации
export interface IAuthData {
    login: string; // Логин пользователя (обязательное поле)
    password: string; // Пароль пользователя (обязательное поле)
}

// Тип для состояния приложения
export type IAppState = {
    error: string | null; // Ошибка приложения (может быть строкой или null)
    user?: IUser | null; // Текущий пользователь (необязательное поле)
    chats: IChat[] | null; // Список чатов (может быть массивом чатов или null)
    currentChat: IChat | null; // Текущий чат (может быть объектом чата или null)
}

// Интерфейс для представления чата
export interface IChat {
    id: number; // ID чата (обязательное поле)
    title: string; // Заголовок чата (обязательное поле)
    avatar?: string; // Аватар чата (необязательное поле)
    token?: string; // Токен чата (необязательное поле)
    unreadCount: number; // Количество непрочитанных сообщений (обязательное поле)
    created_by: number; // ID пользователя, создавшего чат (обязательное поле)
    last_message?: ILastMessage; // Последнее сообщение в чате (необязательное поле)
    users?: IUser[]; // Пользователи чата (необязательное поле)
    connection?: SocketIO | null; // Соединение WebSocket для чата (необязательное поле)
    messages?: IChatMessage[] | null; // Сообщения чата (может быть массивом сообщений или null)
}

// Интерфейс для представления последнего сообщения
export interface ILastMessage {
    user: IUser; // Пользователь, отправивший сообщение
    time: string; // Время отправки сообщения
    content: string; // Содержимое сообщения
}

// Тип для данных пользователей чата
export type IChatUsersData = {
    users: number[]; // Массив ID пользователей
    chatId: number; // ID чата
}

// Интерфейс для представления файла
export interface IFile {
    id: number; // ID файла
    user_id: number; // ID пользователя, загрузившего файл
    path: string; // Путь к файлу
    filename: string; // Имя файла
    content_type: string; // Тип содержимого файла
    content_size: number; // Размер содержимого файла
    upload_date: string; // Дата загрузки файла
}

// Интерфейс для представления сообщения чата
export interface IChatMessage {
    id: number; // ID сообщения
    user_id: number; // ID пользователя, отправившего сообщение
    chat_id: number; // ID чата, в который отправлено сообщение
    time: string; // Время отправки сообщения
    type: string | 'message' | 'file'; // Тип сообщения (может быть 'message' или 'file')
    content: number | string; // Содержимое сообщения (может быть числом или строкой)
    file?: IFile; // Файл, если сообщение содержит файл (необязательное поле)
    main?: boolean; // Основное сообщение (необязательное поле)
    is_read?: boolean; // Статус прочтения сообщения (необязательное поле)
}

// Интерфейс для представления паролей
export interface IPasswords {
    oldPassword: string; // Старый пароль
    newPassword: string; // Новый пароль
}

// Импортируем функции валидации из утилит
import {
    validateDisplayName,
    validateEmail,
    validateLogin,
    validateName,
    validateNameChat,
    validatePassword,
    validatePhone
} from "../utils/validatesUtils.ts";

// Интерфейс для типов валидации
export interface IValidateType {
    login?: (value: string) => string; // Функция валидации для логина
    password?: (value: string) => string; // Функция валидации для пароля
    password2?: (value: string) => string; // Функция валидации для повторного ввода пароля
    name?: (value: string) => string; // Функция валидации для имени
    phone?: (value: string) => string; // Функция валидации для телефона
    email?: (value: string) => string; // Функция валидации для email
    nameChat?: (value: string) => string; // Функция валидации для имени чата
    displayName?: (value: string) => string; // Функция валидации для отображаемого имени
}

// Объект, содержащий все функции валидации
export const ALL_VALIDATE_FIELDS: IValidateType = {
    login: validateLogin, // Валидация логина
    name: validateName, // Валидация имени
    phone: validatePhone, // Валидация телефона
    email: validateEmail, // Валидация email
    password: validatePassword, // Валидация пароля
    nameChat: validateNameChat, // Валидация имени чата
    displayName: validateDisplayName // Валидация отображаемого имени
}


