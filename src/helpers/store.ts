import EventDispatcher from "./EventBus.ts"; // Импортируем класс EventDispatcher для управления событиями

// Перечисление для событий хранилища
export enum StoreEvents {Updated = 'Updated'} // Событие, которое будет вызываться при обновлении состояния


// Класс Store, который наследует от EventDispatcher
export class Store<State extends Record<string, unknown>> extends EventDispatcher {
    private state: State = {} as State; // Хранит текущее состояние хранилища
    // Конструктор класса Store
    constructor(initState: State) {
        super(); // Вызываем конструктор родительского класса
        this.state = initState; // Инициализируем состояние с переданным начальным состоянием
        this.set(this.state); // Устанавливаем начальное состояние
    }

    // Метод для получения текущего состояния
    public getState() {return this.state} // Возвращаем текущее состояние


    // Метод для установки нового состояния
    public set(nextState: Partial<State>) {
        const prevState = { ...this.state }; // Сохраняем предыдущее состояние
        this.state = { ...this.state, ...nextState }; // Обновляем состояние, объединяя текущее и новое состояние
        this.emit(StoreEvents.Updated, prevState, nextState); // Вызываем событие обновления, передавая предыдущее и новое состояние
    }
}