import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента Input
interface IInput extends IProps {
    type: 'text' | 'password'; // Тип поля ввода (текст или пароль)
    onChange: (value: string) => void; // Функция обратного вызова для обработки изменений значения
    validate: (value: string) => string; // Функция валидации, возвращающая текст ошибки, если есть
    onBlur: (value: string) => void; // Функция обратного вызова при потере фокуса
    ref: string; // Ссылка на элемент (для работы с DOM)
    name: string; // Имя поля ввода
    value: string; // Значение поля ввода
    label: string; // Метка для поля ввода
    errorText: string; // Текст ошибки, который будет отображаться
    error: boolean; // Флаг, указывающий, есть ли ошибка
}

export class InputShort extends Block { // Класс InputShort, наследующий от класса Block

    constructor(props: IInput) {
        // Устанавливаем значения по умолчанию для текста ошибки и флага ошибки
        props.errorText = ''; // Изначально текст ошибки пустой
        props.error = false; // Изначально ошибки нет

        // Устанавливаем обработчик события onBlur, который вызывает метод валидации
        props.onBlur = () => this.validate();
        super({ ...props }); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента InputShort
    public get props() {return this._props as IInput;} // Приводим _props к типу IInput


    // Метод для получения значения поля ввода
    public value() {
        if (!this.validate()) { // Если валидация не прошла, возвращаем пустую строку
            return '';
        }
        return this.refs?.[this.props.ref].value(); // Возвращаем значение поля ввода, если оно существует
    }

    // Метод для валидации значения поля ввода
    private validate() {
        const value = this.refs?.[this.props.ref].value(); // Получаем текущее значение поля ввода
        const error = this.props.validate(value); // Проверяем значение на наличие ошибок
        this.props.value = value; // Обновляем значение в свойствах
        if (error) { // Если есть ошибка
            this.props.error = true; // Устанавливаем флаг ошибки
            this.props.errorText = error; // Устанавливаем текст ошибки
            this.setProps(this.props); // Обновляем свойства компонента
            return false; // Возвращаем false, если валидация не прошла
        }
        this.props.error = false; // Убираем флаг ошибки
        this.props.errorText = ''; // Очищаем текст ошибки
        this.setProps(this.props); // Обновляем свойства компонента
        return true; // Возвращаем true, если валидация прошла
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        // Деструктурируем свойства с установкой значений по умолчанию
        const {
            type = '', // Тип поля ввода
            ref = '', // Ссылка на элемент поля ввода
            value = '', // Значение поля ввода
            label = "", // Метка для поля ввода
            error = false, // Флаг ошибки
            errorText = '' // Текст ошибки
        } = this.props;

        return (`
            <div class="input"> 
                <label class="input__container"> 
                <div class="input__label">${label}</div>
                {{{ Input ref="${ref}" type="${type}"
                    classes="input__value ${error ? "input__value-error" : ""}"
                    value='${value}'
                    placeholder=" "
                    name="${ref}"
                    onBlur=onBlur
                }}}
                ${error ? ` <div class="input__error"> <div class="input__text-error">${errorText}</div></div>` : ""}
                </label>
            </div>
        `);
    }
}
