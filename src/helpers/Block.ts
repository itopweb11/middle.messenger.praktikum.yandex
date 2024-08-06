import EventBus from "./EventBus";
import {v4 as uuidv4} from 'uuid';
import Handlebars from "handlebars";
import {areObjectsEqual} from "./areObjectsEqual.utils.ts";

// Интерфейс для свойств компонента
export interface IProps {
    events?: object
}

// Базовый класс компонента, который управляет жизненным циклом и событиями
export class Block {
    static EVENTS = {
        INIT: "init", // Инициализация компонента
        FLOW_CDM: "flow:component-did-mount", // Компонент был смонтирован
        FLOW_CWUM: "flow:component-will-unmount", // Компонент будет размонтирован
        FLOW_CDU: "flow:component-did-update", // Компонент был обновлен
        FLOW_RENDER: "flow:render" // Рендеринг компонента
    };

    public id = uuidv4();
    protected _meta: { props: IProps; } | null = null;
    protected _element: HTMLElement | null = null;
    protected refs: Record<string, Block> = {};
    private children: Record<string, Block> = {};
    private _eventBus: () => EventBus;
    protected _props: IProps;

    // Конструктор класса
    constructor(propsWithChildren: IProps) {
        const eventBus = new EventBus();
        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            props
        };

        this.children = children;
        this._props = this._makePropsProxy(props, this);

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    // Метод для разделения свойств и дочерних компонентов
    _getChildrenAndProps(childrenAndProps: IProps) {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {props, children};
    }

    // Метод для регистрации событий
    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWUM, this._componentWillUnmount.bind(this));
    }

    //метод для инициализации компонента
    private _init() {
        this.init(); //Вызов пользовательского метода инициализации

        this._eventBus().emit(Block.EVENTS.FLOW_RENDER); // Эмитирование события рендеринга
    }

    protected init() {
    }

    //Метод, вызываемый после монтирования компонента
    private _componentDidMount() {
        this.componentDidMount();
    }

    // пользовательский метод монтирования, может быть переопределен
    protected componentDidMount() {
    }

    //Метод для вызова события монтирования для дочерних компонентов
    public dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    // Метод для обработки обновлений компонента
    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    //ользовательский метод обновления, может быть переопределен
    protected componentDidUpdate(oldProps: IProps, newProps: IProps) {
        // this.setProps(newProps);
        return areObjectsEqual<IProps>(oldProps as { [index: string]: IProps }, newProps as { [index: string]: IProps });
    }

    // метод для обработки размонтирования компонента
    private _componentWillUnmount() {
        this.componentWillUnmount();
        this._removeEvents();
    }

    // Пользовательский метод размонтирования, может быть переопределен
    protected componentWillUnmount() {
        this._removeEvents();
    }

    //Метод для установки новых свойств компонента
    setProps = (nextProps: IProps) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this._props, nextProps);
    };

    //Геттер для получения HTML-элемента
    get element() {
        return this._element;
    }

    //Метод для получения значения элемента
    public value() {
        return this._element && (<HTMLInputElement>this._element).value ? (<HTMLInputElement>this._element).value : '';
    }

    // Метод для получения ссылок на дочерние компоненты
    public getRefs() {
        return this.refs;
    }

    // Метод для рендеринга компонента
    private _render() {
        const fragment = this.compile(this.render(), this._props);

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    //Метод для добавления событий к элементу
    _addEvents() {
        const {events = {}} = this._props as { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    //Метод для удаления событий из элемента
    _removeEvents() {
        const {events = {}} = this._props as { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    // Метод для компиляции
    private compile(template: string, context: object) {
        const contextAndStubs = {...context, __children: [] as Array<{ component: unknown, embed(node: DocumentFragment): void }>, __refs: this.refs};

        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        contextAndStubs.__children?.forEach(({embed}) => {
            embed(temp.content);
        });

        return temp.content;
    }

    // метод для рендеринга компонента
    protected render(): string {
        return '';
    }

    //Метод для получения контента
    getContent() {
        return this.element;
    }

    // Метод для создания прокси
    _makePropsProxy(props: { [index: string | symbol]: unknown }, self: Block) {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target};

                target[prop] = value;

                self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }
}

export default Block;
