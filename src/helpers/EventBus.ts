//Класс EventBus реализует паттерн  для управления событиями и их слушателями
export default class EventBus {
    private readonly listeners: { [event: string]: Array<(...args: object[]) => void> } = {};

    constructor() {
        this.listeners = {};
    }

    //Метод для регистрации слушателя на событие
    on(event: string, callback: (...args: object[]) => void) {
        if (!this.listeners[event]) {this.listeners[event] = [];}this.listeners[event].push(callback);
    }

    //метод для вызова всех слушателей
    emit(event: string, ...args: object[]) {
        if (!this.listeners[event]) {throw new Error(`Нет события: ${event}`);}
        this.listeners[event].forEach(listener => {listener(...args);});
    }

    // Метод для удаления слушателя с события
    off(event: string, callback: (...args: object[]) => void) {
        if (!this.listeners[event]) {throw new Error(`Нет события: ${event}`);}
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
}
