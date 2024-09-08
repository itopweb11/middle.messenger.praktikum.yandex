import { IAuthData, IUser } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейсы для данных аутентификации и пользователя
import AuthApi from "../chatApi/auth.ts"; // Импортируем класс для работы с API аутентификации
import { responseHasError } from "../utils/apiUtils.ts"; // Импортируем утилиту для проверки ошибок в ответах API
import Router from "../helpers/router.ts"; // Импортируем маршрутизатор для управления навигацией
import { BASE_URLS } from "../config.ts"; // Импортируем базовые URL-адреса из конфигурации
import { stateApp, stateUser } from "./app.ts"; // Импортируем функции для управления состоянием приложения и пользователя

// Создаем экземпляр AuthApi с базовым URL для аутентификации
const authApi = new AuthApi('/auth');

// Функция для регистрации нового пользователя
const signUp = async (data: IUser) => {
    // Вызываем метод signUp API для регистрации пользователя
    const result = await authApi.signUp(data);
    // Проверяем, есть ли ошибка в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);

    // Если ошибки нет, получаем нового пользователя и обновляем состояние пользователя
    if (!error) {
        // Получаем данные нового пользователя
        const newUser = await getUser() as IUser;
        // Обновляем состояние пользователя в хранилище
        stateUser(newUser);
    }
    // Возвращаем данные результата
    return result.data;
}

// Функция для входа пользователя
const signIn = async (data: IAuthData) => {
    // Вызываем метод signIn API для входа пользователя
    const result = await authApi.signIn(data);
    // Проверяем, есть ли ошибка в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);

    // Если ошибки нет, обновляем состояние приложения и перенаправляем на страницу чата
    if (!error) {
        // Обновляем состояние приложения
        await stateApp();
        // Перенаправляем на страницу чата
        Router.getRouter().go(BASE_URLS['page-chat']);
    }
}

// Функция для получения информации о текущем пользователе
const getUser = async () => {
    // Вызываем метод для получения данных аутентифицированного пользователя
    const result = await authApi.getAuthUser();
    // Проверяем, есть ли ошибка в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);

    // Если ошибки нет, возвращаем данные пользователя или null
    if (!error) return result.data ? result.data : null;
}

// Функция для выхода пользователя из системы
const logOut = async () => {
    // Вызываем метод для выхода пользователя
    const result = await authApi.logOut();
    // Проверяем, есть ли ошибка в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);

    // Если ошибки нет, перенаправляем на страницу входа и обновляем состояние пользователя
    Router.getRouter().go(BASE_URLS['page-login']); // Перенаправляем на страницу входа
    // Устанавливаем состояние пользователя как null
    stateUser(null);
}

// Экспортируем функции для использования в других модулях
export {
    getUser,
    logOut,
    signIn,
    signUp
}

