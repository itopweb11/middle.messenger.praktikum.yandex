import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { ALL_VALIDATE_FIELDS, IValidateType } from "../../modalTypes/modalTypes.ts"; // Импортируем константу ALL_VALIDATE_FIELDS и интерфейс IValidateType

// Интерфейс для свойств компонента FormAuth
interface IFormAuth extends IProps {
    captionForm: string; // Текст кнопки "ОК"
    captionCancel: string; // Текст кнопки "Отмена"
    validate: IValidateType; // Объект с правилами валидации
    cancelLink: string; // Ссылка для кнопки "Отмена"
    desc: string; // Заголовок формы
    children: string; // Содержимое формы (поля ввода)
    clickButton: (event: Event) => void; // Функция обратного вызова для кнопки "ОК"
    onClickCancelButton: (event: Event) => void; // Функция обратного вызова для кнопки "Отмена"
}

export class FormAuth extends Block { // Класс FormAuth, наследующий от класса Block
    constructor(props: IFormAuth) {
        // Устанавливаем правила валидации по умолчанию
        props.validate = ALL_VALIDATE_FIELDS;
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        // Деструктурируем свойства с установкой значений по умолчанию
        const {
            desc = 'Login',
            children = '',
            captionForm,
            captionCancel,
            cancelLink } = this._props as IFormAuth;
        return (`
            <div class="containerForm container-shadow"> <!-- Контейнер для формы с тенью -->
            <h2 class="containerForm__header">${desc}</h2> <!-- Заголовок формы -->
            <div>${children}  </div>
            <div class="containerForm__buttons"> <!-- Контейнер для кнопок -->
                {{{ Button 
                desc="${captionForm}"  
                onClick=clickButton 
                isSubmit=true
                }}}
                {{{ Link 
                desc="${captionCancel}" 
                href="${cancelLink}" 
                }}}
            </div>
        </div>
        `);
    }
}
