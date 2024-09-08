import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { ALL_VALIDATE_FIELDS, IValidateType } from "../../modalTypes/modalTypes.ts"; // Импортируем константу с правилами валидации и интерфейс для валидации

// Интерфейс для свойств компонента Modal
interface IModal extends IProps {
    cancelText: string; // Текст кнопки "Отмена"
    cancelClick: () => void; // Функция обратного вызова для кнопки "Отмена"
    okClick: (event: Event) => void; // Функция обратного вызова для кнопки "ОК"
    children?: string; // Содержимое модального окна (необязательное)
    validate?: IValidateType; // Объект с правилами валидации (необязательный)
    desc: string; // Заголовок модального окна
    okText: string; // Текст кнопки "ОК"
}

export class Modal extends Block { // Класс Modal, наследующий от класса Block
    constructor(props: IModal) {
        // Устанавливаем правила валидации по умолчанию
        props.validate = ALL_VALIDATE_FIELDS;

        // Вызываем конструктор родительского класса с переданными свойствами
        super({
            ...props,
            events: { // Устанавливаем обработчики событий
                submit: (event: Event) => { // Обработчик события отправки формы
                    event.stopPropagation(); // Останавливаем всплытие события
                    event.preventDefault(); // Предотвращаем стандартное поведение формы
                    this.props.okClick(event); // Вызываем функцию обратного вызова для кнопки "ОК"
                }
            }
        });
    }

    // Геттер для получения свойств компонента Modal
    public get props() {
        return this._props as IModal; // Приводим _props к типу IModal
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const {
            desc = '',
            okText = '',
            cancelText = '',
            children = ''
        } = this.props; // Деструктурируем свойства с установкой значений по умолчанию

        return (`
                <form class="modal"> <!-- Контейнер для модального окна -->
                    <h2 class="modal__header">${desc}</h2> <!-- Заголовок модального окна -->
                    <div>${children}</div> <!-- Содержимое модального окна -->
                    <div class="modal__footer"> <!-- Контейнер для кнопок -->
                        {{{ Button 
                        desc="${okText}" 
                        onClick=okClick 
                        isSubmit=true
                        }}} <!-- Кнопка "ОК" -->
                        {{{ Button 
                        desc="${cancelText}" 
                        onClick=cancelClick 
                        type='link'
                        }}} <!-- Кнопка "Отмена" -->
                    </div>
                </form>
        `);
    }
}
