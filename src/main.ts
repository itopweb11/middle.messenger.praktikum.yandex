// Импортируем основные стили приложения
import './styles/main.scss';
// Импортируем все компоненты из директории components
import * as Components from './components';
// Импортируем все страницы из директории pages
import * as Pages from './pages';
// Импортируем функцию для регистрации компонентов
import { registerComp } from "./helpers/registerComponents.ts";
// Импортируем маршрутизатор
import Router from "./helpers/router.ts";
// Импортируем базовые URL-адреса из конфигурации
import { BASE_URLS } from "./config.ts";
// Импортируем функцию для инициализации состояния приложения
import { stateApp } from "./services/app.ts";
// Импортируем интерфейс состояния приложения
import { IAppState } from "./typesModels/typesModels.ts";
// Импортируем класс Store для управления состоянием приложения
import { Store } from "./helpers/store.ts";

// Регистрируем все компоненты, перебирая их по именам и значениям
Object.entries(Components).forEach(
    ([componentName, component]) => registerComp(componentName, component) // Регистрируем каждый компонент
)

// Объявляем глобальные типы и интерфейсы
declare global {
    interface Window {store: Store<IAppState>} // Добавляем свойство store в интерфейс Window
    type Nullable<T> = T | null; // Определяем тип Nullable, который может быть T или null
}

// Инициализируем начальное состояние приложения
const initState: IAppState = {
    chats: [], // Начальное значение для списка чатов
    currentChat: null, // Начальное значение для текущего чата
    user: undefined, // Начальное значение для пользователя
    error: null, // Начальное значение для ошибок
}

// Создаем новое состояние хранилища и присваиваем его объекту window
window.store = new Store<IAppState>(initState);

// Создаем новый экземпляр маршрутизатора, указывая корневой элемент приложения
const router = new Router(".app");
// Инициализируем состояние приложения
stateApp();

// Настраиваем маршрутизацию, связывая URL-адреса с соответствующими страницами
router
    .use(BASE_URLS['page-login'], Pages.LoginPage) // Маршрут для страницы входа
    .use(BASE_URLS['page-sign-up'], Pages.PageRegistration) // Маршрут для страницы регистрации
    .use(BASE_URLS['page-profile'], Pages.PageProfile) // Маршрут для страницы профиля
    .use(BASE_URLS['page-404'], Pages.Page404) // Маршрут для страницы 404 (не найдено)
    .use(BASE_URLS['page-500'], Pages.Page500) // Маршрут для страницы 500 (внутренняя ошибка сервера)
    .use(BASE_URLS['page-chat'], Pages.PageChat) // Маршрут для страницы чата
    .start(); // Запускаем маршрутизатор


