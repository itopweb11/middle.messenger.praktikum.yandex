import EventDispatcher from "./eventBus.ts"; // Импортируем класс EventDispatcher для управления событиями
import { v4 as uuidv4 } from 'uuid'; // Импортируем функцию для генерации уникальных идентификаторов
import Handlebars from "handlebars"; // Импортируем Handlebars для компиляции шаблонов
import { isDeepEqual } from "../utils/objectUtils.ts"; // Импортируем функцию для глубокого сравнения объектов

// Интерфейс для свойств блока
export interface IProps {events?: object;} // Необязательные события, которые могут быть привязаны к блоку
export class Block {
    // Определяем события, которые будут использоваться в блоке
    static EVENTS = {
        BLOCK_INIT: "init", // Событие инициализации
        BLOCK_FLOW_CDM: "flow:component-did-mount", // Событие монтирования компонента
        BLOCK_FLOW_CDU: "flow:component-did-update", // Событие обновления компонента
        BLOCK_FLOW_RENDER: "flow:render", // Событие рендеринга
        BLOCK_FLOW_CWUM: "flow:component-will-unmount" // Событие размонтирования компонента
    };

    public id = uuidv4(); // Генерируем уникальный идентификатор для блока
    protected refs: Record<string, Block> = {}; // Ссылки на дочерние блоки
    private children: Record<string, Block> = {}; // Дочерние блоки
    private _eventBus: () => EventDispatcher; // Функция для получения экземпляра EventDispatcher
    protected _props: IProps; // Свойства блока
    protected _element: HTMLElement | null = null; // HTML-элемент блока
    protected _meta: { props: IProps; } | null = null; // Метаданные блока

    constructor(propsWithChildren: IProps) {
        const eventBus = new EventDispatcher(); // Создаем новый экземпляр EventDispatcher
        const { props, children } = this._getChildrenAndProps(propsWithChildren); // Получаем свойства и дочерние блоки

        this._meta = {props}; // Сохраняем метаданные
        this.children = children; // Сохраняем дочерние блоки
        this._props = this._makePropsProxy(props, this); // Создаем прокси для свойств
        this._eventBus = () => eventBus; // Устанавливаем функцию для получения EventDispatcher

        this._registerEvents(eventBus); // Регистрируем события
        eventBus.emit(Block.EVENTS.BLOCK_INIT); // Вызываем событие инициализации
    }

    // Метод для получения дочерних блоков и свойств
    _getChildrenAndProps(childrenAndProps: IProps) {
        const children: Record<string, Block> = {}; // Объект для хранения дочерних блоков
        const props: Record<string, unknown> = {}; // Объект для хранения свойств

        // Перебираем все свойства и разделяем их на свойства и дочерние блоки
        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {children[key] = value; // Если это блок, добавляем его в дочерние блоки
            } else {props[key] = value} // Иначе добавляем в свойства
        });
        return { props, children }; // Возвращаем свойства и дочерние блоки
    }

    // Метод для регистрации событий
    _registerEvents(eventBus: EventDispatcher) {
        eventBus.on(Block.EVENTS.BLOCK_INIT, this._init.bind(this)); // Регистрация события инициализации
        eventBus.on(Block.EVENTS.BLOCK_FLOW_RENDER, this._render.bind(this)); // Регистрация события рендеринга
        eventBus.on(Block.EVENTS.BLOCK_FLOW_CWUM, this._componentWillUnmount.bind(this)); // Регистрация события размонтирования
        eventBus.on(Block.EVENTS.BLOCK_FLOW_CDM, this._componentDidMount.bind(this)); // Регистрация события монтирования
        eventBus.on(Block.EVENTS.BLOCK_FLOW_CDU, this._componentDidUpdate.bind(this)); // Регистрация события обновления
    }

    // Метод для обработки инициализации
    private _init() {this.init(); // Вызываем метод инициализации
        this._eventBus().emit(Block.EVENTS.BLOCK_FLOW_RENDER); // Вызываем событие рендеринга
    }

    // Метод для инициализации (может быть переопределен в дочерних классах)
    protected init() {}

    // Метод для обработки монтирования компонента
    private _componentDidMount() {this.componentDidMount()} // Вызываем метод монтирования компонента


    // Метод для монтирования компонента (может быть переопределен в дочерних классах)
    protected componentDidMount() {}

    // Метод для вызова события монтирования компонента
    public dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.BLOCK_FLOW_CDM); // Вызываем событие монтирования
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount()); // Вызываем событие монтирования для дочерних блоков
    }

    // Метод для обработки обновления компонента
    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        const response = this.componentDidUpdate(oldProps, newProps); // Вызываем метод обновления компонента
        if (response) {this._eventBus().emit(Block.EVENTS.BLOCK_FLOW_RENDER)} // Вызываем событие рендеринга, если обновление произошло
    }

    // Метод для обновления компонента (может быть переопределен в дочерних классах)
    protected componentDidUpdate(oldProps: IProps, newProps: IProps) {
        return isDeepEqual<IProps>(oldProps as { [index: string]: IProps }, newProps as { [index: string]: IProps }); // Проверяем, изменились ли свойства
    }

    // Метод для обработки размонтирования компонента
    private _componentWillUnmount() {this.componentWillUnmount(); // Вызываем метод размонтирования
        this._removeEvents(); // Удаляем события
    }

    // Метод для размонтирования компонента (может быть переопределен в дочерних классах)
    protected componentWillUnmount() {this._removeEvents()} // Удаляем события

    // Метод для установки новых свойств
    setProps = (nextProps: IProps) => {
        if (!nextProps) {return} // Если новых свойств нет, выходим
        Object.assign(this._props, nextProps); // Обновляем свойства
    };

    // Геттер для получения элемента
    get element() {return this._element} // Возвращаем HTML-элемент блока


    // Метод для получения значения поля ввода
    public value() {return this._element && (<HTMLInputElement>this._element).value ? (<HTMLInputElement>this._element).value : ''} // Возвращаем значение, если элемент существует


    // Метод для получения ссылок на дочерние блоки
    public getRefs() {return this.refs} // Возвращаем ссылки на дочерние блоки


    // Метод для рендеринга компонента
    private _render() {
        try {const fragment = this.compile(this.render(), this._props); // Компилируем шаблон с текущими свойствами
            const newElement = fragment.firstElementChild as HTMLElement; // Получаем первый элемент из скомпилированного фрагмента
            if (this._element && newElement) {this._element.replaceWith(newElement)} // Заменяем старый элемент новым
            this._element = newElement; // Обновляем ссылку на элемент
            this._addEvents(); // Добавляем события
        } catch (err: unknown) {
            console.error('Error rendering component:', err); // Логируем ошибку
        } // Обрабатываем ошибки
    }

    // Метод для добавления событий
    _addEvents() {
        const { events = {} } = this._props as { events: Record<string, () => void> }; // Получаем события из свойств
        Object.keys(events).forEach(eventName => {this._element?.addEventListener(eventName, events[eventName]); // Добавляем обработчики событий
        });
    }

    // Метод для удаления событий
    _removeEvents() {
        const { events = {} } = this._props as { events: Record<string, () => void> }; // Получаем события из свойств
        Object.keys(events).forEach(eventName => {this._element?.removeEventListener(eventName, events[eventName]); // Удаляем обработчики событий
        });
    }

    // Метод для компиляции шаблона
    private compile(template: string, context: object) {
        const contextAndStubs = {...context,
            __children: [] as Array<{ component: unknown, embed(node: DocumentFragment): void }>, // Дочерние компоненты
            __refs: this.refs // Ссылки на дочерние блоки
        };

        const html = Handlebars.compile(template)(contextAndStubs); // Компилируем шаблон с контекстом
        const temp = document.createElement('template'); // Создаем временный элемент template
        temp.innerHTML = html; // Устанавливаем скомпилированный HTML
        contextAndStubs.__children?.forEach(({ embed }) => {embed(temp.content)}); // Встраиваем дочерние компоненты
        return temp.content; // Возвращаем содержимое
    }

    // Метод для рендеринга компонента (может быть переопределен в дочерних классах)
    protected render(): string {return ''} // Возвращаем пустую строку по умолчанию


    // Метод для получения содержимого компонента
    getContent() {return this.element} // Возвращаем HTML-элемент блока


    // Метод для создания прокси для свойств
    _makePropsProxy(props: { [index: string | symbol]: unknown }, self: Block) {
        return new Proxy(props, {
            get(target, prop) {const value = target[prop]; // Получаем значение свойства
                return typeof value === "function" ? value.bind(target) : value; // Если это функция, связываем ее с контекстом
            },
            set(target, prop, value) {const oldTarget = { ...target }; // Сохраняем старые свойства
                target[prop] = value; // Устанавливаем новое значение
                self._eventBus().emit(Block.EVENTS.BLOCK_FLOW_CDU, oldTarget, target); // Вызываем событие обновления
                return true; // Возвращаем true для успешного обновления
            },
            deleteProperty() {throw new Error("Нет доступа")} // Запрещаем удаление свойств
        });
    }

    // Метод для скрытия блока (может быть переопределен в дочерних классах)
    public hide() {}

    // Метод для отображения блока (может быть переопределен в дочерних классах)
    public show() {const app = document.getElementById('app'); // Получаем элемент приложения
        const htmlElement = this.getContent(); // Получаем содержимое блока
        if (!app?.firstElementChild) app?.append(document.createElement('div')); // Если нет дочерних элементов, добавляем новый div
        if (htmlElement) app?.firstElementChild?.replaceWith(htmlElement); // Заменяем содержимое приложения на новое
    }
}

export default Block; // Экспортируем класс Block по умолчанию

