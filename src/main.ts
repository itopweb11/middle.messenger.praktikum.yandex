import './style/main.scss'; // Импорт главного файла стилей
import * as Components from './components'; // Импорт всех компонентов из директории components
import * as Pages from './pages'; // Импорт всех страниц из директории pages
import { registerComponent } from "./helpers/registerComponent.ts"; // Функция для регистрации компонентов
import Router from "./helpers/router.ts"; // Модуль для управления маршрутизацией
import { BASE_URLS } from "./config.ts"; // Константы с базовыми URL
import { initialStateApp } from "./services/app.ts"; // Функция для инициализации состояния приложения
import { IAppState } from "./modalTypes/modalTypes.ts"; // Интерфейс для состояния приложения
import { Store } from "./helpers/store.ts"; // Класс Store для управления состоянием приложения

// Регистрация всех компонентов в системе
Object.entries(Components).forEach(
    ([componentName, component]) => registerComponent(componentName, component) // Регистрируем каждый компонент по его имени
);

// Объявление глобального интерфейса для окна браузера
declare global {
    interface Window {
        store: Store<IAppState>; // Добавление свойства store в глобальный объект window
    }

    // Определение типа Nullable для упрощения работы с возможными null значениями
    type Nullable<T> = T | null;
}

// Инициализация состояния приложения
const initState: IAppState = {
    error: null, // Начальное состояние ошибки
    user: undefined, // Начальное состояние пользователя
    currentChat: null, // Начальное состояние текущего чата
    chats: [], // Начальное состояние списка чатов
}

// Создание нового экземпляра Store с начальным состоянием
window.store = new Store<IAppState>(initState);

// Создание нового экземпляра Router с указанием корневого элемента приложения
const router = new Router(".app");

// Инициализация состояния приложения
initialStateApp();

// Настройка маршрутов для приложения
router.use(BASE_URLS['page-default'], Pages.PageChat) // Установка маршрута по умолчанию
    .use(BASE_URLS['page-login'], Pages.LoginPage) // Установка маршрута для страницы логина
    .use(BASE_URLS['page-sign-up'], Pages.PageRegistration) // Установка маршрута для страницы регистрации
    .use(BASE_URLS['page-profile'], Pages.PageProfile) // Установка маршрута для страницы профиля
    .use(BASE_URLS['page-404'], Pages.Page404) // Установка маршрута для страницы 404 (не найдено)
    .use(BASE_URLS['page-500'], Pages.Page500) // Установка маршрута для страницы 500 (ошибка сервера)
    .use(BASE_URLS['page-chat'], Pages.PageChat) // Установка маршрута для страницы чата
    .start(); // Запуск маршрутизатора