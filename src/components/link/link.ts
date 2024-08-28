import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import Router from "../../helpers/router.ts"; // Импортируем класс Router для навигации по страницам

// Интерфейс для свойств компонента Link
interface ILink extends IProps {
    id?: string; // Необязательный идентификатор ссылки
    type: string; // Тип ссылки, который может использоваться для стилизации
    linkIcon?: boolean; // Флаг, указывающий, нужно ли отображать иконку ссылки
    linkLine?: boolean; // Флаг, указывающий, нужно ли отображать линию под ссылкой
    onClick: (event: Event) => void; // Функция обратного вызова для обработки клика по ссылке
    desc: string; // Текст, отображаемый на ссылке
    page?: string; // Необязательная страница, на которую ведет ссылка
    href?: string; // URL, на который ведет ссылка
}

export class Link extends Block { // Класс Link, наследующий от класса Block
    constructor(props: ILink) {
        super({ // Вызываем конструктор родительского класса с переданными свойствами
            ...props,
            events: { // Устанавливаем обработчики событий
                click: (event: Event) => {
                    // Если обработчик клика не задан, переходим по href или на главную страницу
                    if (!this.props.onClick) Router.getRouter().go(props.href || '/');
                    // Если обработчик клика задан, вызываем его
                    this.props.onClick && this.props.onClick(event);
                }
            }
        });
    }

    // Геттер для получения свойств компонента Link
    public get props() {
        return this._props as ILink; // Приводим _props к типу ILink
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        // Деструктурируем свойства с установкой значений по умолчанию
        const {
            desc = '', // Текст ссылки
            page = '', // Страница, на которую ведет ссылка
            linkIcon = false, // Флаг для отображения иконки
            linkLine = false, // Флаг для отображения линии
            type = '', // Тип ссылки
            id // Идентификатор ссылки
        } = this.props;

        // Формируем класс ссылки с учетом типа и флага линии
        const classLink = `link ${type ? `link-${type}` : ''} ${linkLine ? 'link-line' : ''}`;

        return (`
            <a class="${classLink}" ${page ? `page=${page}` : ''} id='${id ? id : ''}'> <!-- Создаем элемент ссылки -->
                ${desc} <!-- Отображаем текст ссылки -->
                ${linkIcon ? '<div class="link-icon"></div>' : ''} <!-- Отображаем иконку, если указано -->
            </a>
        `);
    }
}
