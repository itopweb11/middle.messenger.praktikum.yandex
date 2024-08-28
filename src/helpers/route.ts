import Block, { IProps } from "./block.ts"; // Импортируем класс Block и интерфейс IProps из модуля block.ts

class Route {
    private _pathname: string; // Хранит текущий путь маршрута
    private readonly _blockClass: typeof Block; // Хранит класс блока, который будет использоваться для данного маршрута
    private _block: Block | null = null; // Хранит экземпляр блока (или null, если блок еще не создан)
    private readonly _props: IProps; // Хранит свойства, переданные в блок

    // Конструктор класса Route
    constructor(pathname: string, view: typeof Block, props: object) {
        this._pathname = pathname; // Устанавливаем путь маршрута
        this._blockClass = view; // Устанавливаем класс блока для данного маршрута
        this._block = null; // Изначально блок не создан
        this._props = props; // Устанавливаем свойства блока
    }

    // Геттер для получения текущего пути
    public get pathname() {return this._pathname} // Возвращаем текущий путь


    // Метод для навигации по маршруту
    navigate(pathname: string) {
        // Проверяем, соответствует ли новый путь текущему маршруту
        if (this.match(pathname)) {this._pathname = pathname; // Обновляем текущий путь
            this.render(); // Вызываем метод рендеринга
        }
    }

    // Метод для скрытия блока при уходе с маршрута
    leave() {if (this._block) {this._block.hide()}} // Скрываем блок, если он существует
    // Метод для проверки соответствия пути
    match(pathname: string) {return pathname === this._pathname} // Возвращаем true, если путь совпадает с текущим маршрутом


    // Метод для рендеринга блока
    render() {
        if (!this._block) { // Если блок еще не создан
            this._block = new this._blockClass(this._props); // Создаем новый экземпляр блока с переданными свойствами
            this.render(); // Рендерим блок (возможно, здесь ошибка, так как метод рендеринга может вызывать сам себя бесконечно)
            return; // Выходим из метода
        }
        this._block.show(); // Если блок уже создан, показываем его
    }
}

export default Route; // Экспортируем класс Route по умолчанию


