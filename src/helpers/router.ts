import Block from "./Block.ts"; // Импорт класса Block для работы с компонентами
import Route from "./route.ts"; // Импорт класса Route для управления маршрутами

// Класс Router отвечает за управление маршрутами в приложении
class Router {
    private static __instance: Router; // Статическое свойство для хранения единственного экземпляра Router
    private routes: Route[] | undefined; // Массив маршрутов
    private history: History | undefined; // Объект History для управления историей навигации
    private _currentRoute: null | Route = null; // Текущий маршрут
    private _rootQuery: string | undefined; // Корневой селектор для рендеринга компонентов

    // Конструктор класса Router
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance; // Возвращаем существующий экземпляр, если он уже создан
        }

        this.routes = []; // Инициализация массива маршрутов
        this.history = window.history; // Получение объекта History из окна
        this._currentRoute = null; // Изначально текущий маршрут равен null
        this._rootQuery = rootQuery; // Установка корневого селектора

        Router.__instance = this; // Сохранение текущего экземпляра
    }

    // Статический метод для получения экземпляра Router
    public static getRouter() {
        return this.__instance; // Возвращаем единственный экземпляр Router
    }

    // Геттер для получения пути текущего маршрута
    public get currentRoute() {
        return this._currentRoute?.pathname; // Возвращаем путь текущего маршрута
    }

    // Метод для добавления нового маршрута
    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery }); // Создание нового маршрута
        this.routes?.push(route); // Добавление маршрута в массив
        return this; // Возвращаем текущий экземпляр Router для цепочного вызова
    }

    // Метод для запуска маршрутизатора
    start() {
        // Обработчик события для изменения маршрута при навигации назад/вперед
        window.onpopstate = event => {
            this._onRoute((event?.currentTarget as Window)?.location?.pathname); // Получаем текущий путь и обрабатываем его
        };
        this._onRoute(window.location.pathname); // Обрабатываем начальный путь при запуске
    }

    // Метод для обработки изменения маршрута
    _onRoute(pathname: string) {
        const route = this.getRoute(pathname); // Получаем маршрут по текущему пути
        if (!route) {
            return; // Если маршрут не найден, выходим из метода
        }

        // Если текущий маршрут существует и не равен новому маршруту, скрываем текущий маршрут
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave(); // Вызываем метод leave у текущего маршрута
        }

        this._currentRoute = route; // Устанавливаем новый текущий маршрут
        route.render(); // Рендерим новый маршрут
    }

    // Метод для перехода на указанный маршрут
    go(pathname: string) {
        this.history?.pushState({}, "", pathname); // Добавляем новый путь в историю
        this._onRoute(pathname); // Обрабатываем новый маршрут
    }

    // Метод для перехода на предыдущий маршрут
    back() {
        this.history?.back(); // Переход назад в истории
    }

    // Метод для перехода на следующий маршрут
    forward() {
        this.history?.forward(); // Переход вперед в истории
    }

    // Метод для обновления текущего маршрута
    update() {
        this.history?.go(0); // Обновление текущей страницы
    }

    // Метод для получения маршрута по пути
    getRoute(pathname: string) {
        return this.routes?.find(route => route.match(pathname)); // Возвращаем маршрут, соответствующий указанному пути
    }
}

export default Router; // Экспорт класса Router по умолчанию