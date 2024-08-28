import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import modalController from "../../helpers/modalController.ts"; // Импортируем контроллер модальных окон

// Интерфейс для свойств компонента ModalPrompt
interface IModalPrompt extends IProps {
    cancelClick?: () => void; // Функция для обработки клика по кнопке "Отмена" (необязательная)
    okInputClick?: (event: Event) => void; // Функция для обработки клика по кнопке "ОК" (необязательная)
    okText: string; // Текст кнопки "ОК"
    ref?: string; // Необязательная ссылка на компонент
    desc: string; // Заголовок модального окна
    labelText: string; // Текст метки для поля ввода
    okClick?: (result: string) => void; // Функция для обработки клика по кнопке "ОК" с результатом (необязательная)
}

export class ModalPrompt extends Block { // Класс ModalPrompt, наследующий от класса Block
    constructor(props: IModalPrompt) {
        // Функция для обработки клика по кнопке "ОК"
        props.okInputClick = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение события
            const input = this.refs.modal.getRefs().input.value(); // Получаем значение поля ввода
            if (!input) { return; } // Если поле ввода пустое, выходим
            this.props.okClick && this.props.okClick(input); // Вызываем функцию okClick, если она задана, передавая введенное значение
            modalController.closeModal(); // Закрываем модальное окно
        }

        // Функция для обработки клика по кнопке "Отмена"
        props.cancelClick = () => { modalController.closeModal(); }; // Закрываем модальное окно

        super({ ...props }); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента ModalPrompt
    public get props() {
        return this._props as IModalPrompt; // Приводим _props к типу IModalPrompt
    }

    // Метод для получения содержимого модального окна
    getChildren() {
        const { labelText = '' } = this.props; // Деструктурируем текст метки с установкой значения по умолчанию
        return (`{{{ InputShort label='${labelText}' type='text' name='input' validate=validate.nameChat ref='input' }}}`); // Возвращаем разметку для поля ввода
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        return (`
                 {{{ Modal 
                         desc='${this.props.desc}' 
                         okText='${this.props.okText}' 
                         cancelText='Отмена' 
                         okClick=okInputClick 
                         cancelClick=cancelClick
                         children="${this.getChildren()}"
                         ref='modal'
                 }}}
        `);
    }
}



