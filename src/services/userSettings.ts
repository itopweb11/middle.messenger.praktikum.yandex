import UserSetting from "../chatApi/userSettings.ts"; // Импортируем класс для работы с API настроек пользователя
import { IPasswords, IUser } from "../modalTypes/modalTypes.ts"; // Импортируем интерфейсы для паролей и пользователя
import { responseHasError } from "../utils/apiUtils.ts"; // Импортируем утилиту для проверки ошибок в ответах API
import { stateUser } from "./app.ts"; // Импортируем функцию для обновления состояния пользователя
import Router from "../helpers/router.ts"; // Импортируем маршрутизатор для управления навигацией

// Создаем экземпляр UserSetting с базовым URL для настроек пользователя
const userApi = new UserSetting('/user');

// Асинхронная функция для обновления профиля пользователя
const UserProfile = async (newUserData: IUser) => {
    const result = await userApi.changeProfile(newUserData); // Вызываем метод API для изменения профиля
    const error = responseHasError(result); // Проверяем наличие ошибок в ответе
    if (error) throw Error(error); // Если есть ошибка, выбрасываем исключение
    if (!error) stateUser(result.data as IUser); // Если ошибок нет, обновляем состояние пользователя
}

// Асинхронная функция для изменения пароля пользователя
const UserPassword = async (newUserPasswords: IPasswords) => {
    const result = await userApi.changePassword(newUserPasswords); // Вызываем метод API для изменения пароля
    const error = responseHasError(result); // Проверяем наличие ошибок в ответе
    if (error) throw Error(error); // Если есть ошибка, выбрасываем исключение
    Router.getRouter().back(); // Если ошибок нет, возвращаемся на предыдущую страницу
}

// Асинхронная функция для изменения аватара пользователя
const UserAvatar = async (newAvatar: FormData) => {
    const result = await userApi.changeAvatar(newAvatar); // Вызываем метод API для изменения аватара
    const error = responseHasError(result); // Проверяем наличие ошибок в ответе
    if (error) throw Error(error); // Если есть ошибка, выбрасываем исключение
    stateUser(result.data as IUser); // Обновляем состояние пользователя
    return result.data as IUser; // Возвращаем данные обновленного пользователя
}

// Асинхронная функция для поиска пользователей по логину
const searchUsers = async (login: string) => {
    const result = await userApi.searchUser(login); // Вызываем метод API для поиска пользователей
    const error = responseHasError(result); // Проверяем наличие ошибок в ответе
    if (error) throw Error(error); // Если есть ошибка, выбрасываем исключение
    return result.data as IUser[]; // Возвращаем данные найденных пользователей
}

// Экспортируем функции для использования в других модулях
export {
    UserProfile,
    UserPassword,
    UserAvatar,
    searchUsers
}


