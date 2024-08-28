import Block from "./Block.ts"; // Импортируем класс Block для создания компонентов
import Route from "./route.ts"; // Импортируем класс Route для управления маршрутами

class Router {
    private static __instance: Router; // Статическая переменная для хранения единственного экземпляра класса (Singleton)
    private routes: Route[] | undefined; // Массив маршрутов
    private history: History | undefined; // История браузера
    private _currentRoute: null | Route = null; // Текущий маршрут
    private _rootQuery: string | undefined; // Корневой селектор для приложения

    // Конструктор класса Router
    constructor(rootQuery: string) {
        // Проверяем, существует ли уже экземпляр класса
        if (Router.__instance) {return Router.__instance} // Если экземпляр существует, возвращаем его
        this.routes = []; // Инициализируем массив маршрутов
        this.history = window.history; // Получаем объект истории браузера
        this._currentRoute = null; // Изначально текущий маршрут равен null
        this._rootQuery = rootQuery; // Устанавливаем корневой селектор
        Router.__instance = this; // Устанавливаем текущий экземпляр как единственный
    }

    // Статический метод для получения единственного экземпляра класса
    public static getRouter() {return this.__instance} // Возвращаем экземпляр класса

    // Геттер для получения текущего пути маршрута
    public get currentRoute() {return this._currentRoute?.pathname} // Возвращаем путь текущего маршрута

    // Метод для добавления маршрута
    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery }); // Создаем новый маршрут
        this.routes?.push(route); // Добавляем маршрут в массив
        return this; // Возвращаем текущий экземпляр для цепочки вызовов
    }

    // Метод для запуска маршрутизатора
    start() {
        // Устанавливаем обработчик события на изменение истории
        window.onpopstate = event => {this._onRoute((event?.currentTarget as Window)?.location?.pathname)}; // Обрабатываем изменение маршрута
        this._onRoute(window.location.pathname); // Обрабатываем текущий путь при старте
    }

    // Метод для обработки маршрута
    _onRoute(pathname: string) {
        const route = this.getRoute(pathname); // Получаем маршрут по пути
        if (!route) {return} // Если маршрут не найден, выходим

        // Если текущий маршрут существует и он не равен новому маршруту, вызываем leave для текущего маршрута
        if (this._currentRoute && this._currentRoute !== route) {this._currentRoute.leave()}

        this._currentRoute = route; // Устанавливаем новый текущий маршрут
        route.render(); // Рендерим новый маршрут
    }

    // Метод для перехода по маршруту
    go(pathname: string) {this.history?.pushState({}, "", pathname); // Добавляем новый маршрут в историю
        this._onRoute(pathname); // Обрабатываем новый маршрут
    }

    // Метод для возврата на предыдущий маршрут
    back() {this.history?.back()} // Возвращаемся на предыдущую страницу в истории

    // Метод для перехода вперед в истории
    forward() {this.history?.forward()} // Переходим на следующую страницу в истории

    // Метод для обновления текущей страницы
    update() {this.history?.go(0)} // Обновляем текущую страницу

    // Метод для получения маршрута по пути
    getRoute(pathname: string) {return this.routes?.find(route => route.match(pathname))} // Находим маршрут, соответствующий переданному пути

}

export default Router;

