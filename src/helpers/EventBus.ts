export default class EventDispatcher {
    // Хранит слушателей событий в виде объекта, где ключ - имя события, а значение - массив функций-обработчиков
    private readonly listeners: { [event: string]: Array<(...args: object[]) => void> } = {};
    // Инициализируем объект слушателей
    constructor() {this.listeners = {}}

    // Метод для регистрации обработчика события
    on(event: string, callback: (...args: object[]) => void) {
        // Если событие еще не зарегистрировано, создаем новый массив для слушателей
        if (!this.listeners[event]) {this.listeners[event] = []}
        // Добавляем переданный обработчик в массив слушателей для данного события
        this.listeners[event].push(callback);
    }

    // Метод для удаления обработчика события
    off(event: string, callback: (...args: object[]) => void) {
        // Если событие не зарегистрировано, выбрасываем ошибку
        if (!this.listeners[event]) {throw new Error(`Нет события: ${event}`);}
        // Фильтруем массив слушателей, удаляя указанный обработчик
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }

    // Метод для вызова всех обработчиков зарегистрированного события
    emit(event: string, ...args: object[]) {
        // Если событие не зарегистрировано, просто выходим
        if (!this.listeners[event]) {return}
        // Вызываем каждый обработчик события, передавая ему аргументы
        this.listeners[event].forEach(listener => {listener(...args)});
    }
}

