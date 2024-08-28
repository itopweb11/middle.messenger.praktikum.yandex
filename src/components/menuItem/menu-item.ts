import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента MenuItem
export interface IMenuItem extends IProps {
    onClick: () => void; // Функция обратного вызова для обработки клика по элементу меню
    disabled?: boolean; // Необязательный флаг, указывающий, отключен ли элемент меню
    desc: string; // Текст, отображаемый на элементе меню
    icon: 'media' | 'file' | 'location' | 'plus' | 'delete' | 'avatar'; // Иконка, отображаемая на элементе меню
}

export class MenuItem extends Block { // Класс MenuItem, наследующий от класса Block
    constructor(props: IMenuItem) {
        super({ // Вызываем конструктор родительского класса с переданными свойствами
            ...props,
            events: { // Устанавливаем обработчики событий
                click: () => { // Обработчик клика
                    if (this.props.disabled) return; // Если элемент меню отключен, ничего не делаем
                    this.props.onClick(); // Вызываем функцию обратного вызова при клике
                }
            }
        });
    }

    public renderForList = this.render; // Создаем ссылку на метод render для использования в списках

    // Геттер для получения свойств компонента MenuItem
    public get props() {
        return this._props as IMenuItem; // Приводим _props к типу IMenuItem
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const {
            desc = '', // Деструктурируем текст элемента меню с установкой значения по умолчанию
            icon // Деструктурируем иконку элемента меню
        } = this.props;

        return (`
            <li class='menuItem'> <!-- Контейнер для элемента меню с классом disabled, если элемент отключен -->
                <div class='menuItem__icon ${`menuItem__icon_` + icon}'></div> <!-- Контейнер для иконки элемента меню -->
                <p class='menuItem__caption'> <!-- Контейнер для текста элемента меню -->
                    ${desc} <!-- Отображаем текст элемента меню -->
                </p>               
            </li>
        `);
    }
}

