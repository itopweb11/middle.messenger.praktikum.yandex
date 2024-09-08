import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента Button
interface IButton extends IProps {
    type: 'arrowBack'
        | 'dots'
        | 'paperclip'
        | 'cancel'
        | 'number'
        | 'close'; // Тип кнопки
    page: string; // Страница, к которой относится кнопка
    isSubmit?: boolean; // Необязательный флаг, указывающий, является ли кнопка кнопкой отправки формы
    onClick: () => void; // Функция обратного вызова для обработки клика по кнопке
    desc: string; // Текст, отображаемый на кнопке
}

export class Button extends Block { // Класс Button, наследующий от класса Block
    constructor(props: IButton) {
        super({ // Вызываем конструктор родительского класса с переданными свойствами
            ...props,
            events: { // Добавляем обработчики событий
                click: props.onClick || (() => { }) // Устанавливаем обработчик события клика, если он предоставлен
            }
        });
    }

    // Метод для рендеринга содержимого кнопки
    protected render(): string {
        const { isSubmit = false, type = '', desc = '', page = '' } = this._props as IButton; // Деструктурируем свойства, устанавливая значения по умолчанию
        return (`
            <button type='${isSubmit ? 'submit' : 'button'}' class="button ${type ? "button-" + type : ""}" 
            ${page ? `page="${page}"` : ''}> 
                ${desc} <!-- Отображаем текст кнопки -->
            </button>
        `);
    }
}
