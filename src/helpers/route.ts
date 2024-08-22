import Block, { IProps } from "./Block.ts"; // Импорт класса Block и интерфейса IProps

// Класс Route представляет собой маршрут в приложении
class Route {
    private _pathname: string; // Приватное свойство для хранения пути маршрута
    private readonly _blockClass: typeof Block; // Приватное свойство для хранения класса блока, связанного с маршрутом
    private _block: Block | null = null; // Приватное свойство для хранения экземпляра блока
    private readonly _props: IProps; // Приватное свойство для хранения свойств блока

    // Конструктор класса Route
    constructor(pathname: string, view: typeof Block, props: object) {
        this._pathname = pathname; // Инициализация пути маршрута
        this._blockClass = view; // Инициализация класса блока
        this._block = null; // Инициализация экземпляра блока как null
        this._props = props; // Инициализация свойств блока
    }

    // Геттер для получения пути маршрута
    public get pathname() {
        return this._pathname;
    }

    // Метод для навигации по маршруту
    navigate(pathname: string) {
        if (this.match(pathname)) { // Проверка, соответствует ли путь текущему маршруту
            this._pathname = pathname; // Обновление пути маршрута
            this.render(); // Рендеринг блока
        }
    }

    // Метод для скрытия блока при переходе на другой маршрут
    leave() {
        if (this._block) {
            this._block.hide(); // Скрытие блока
        }
    }

    // Метод для проверки соответствия пути маршруту
    match(pathname: string) {
        return pathname === this._pathname; // Возвращает true, если пути совпадают
    }

    // Метод для рендеринга блока
    render() {
        if (!this._block) { // Если экземпляр блока не создан
            this._block = new this._blockClass(this._props); // Создание нового экземпляра блока с заданными свойствами
            this.render(); // Рекурсивный вызов метода render для отображения блока
            return;
        }

        this._block.show(); // Отображение блока
    }
}

export default Route; // Экспорт класса Route по умолчанию