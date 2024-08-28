import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента InputWide
interface IInputWide extends IProps {
    validate: (value: string) => string; // Функция валидации, возвращающая текст ошибки, если есть
    readOnly: boolean; // Флаг, указывающий, доступно ли поле для редактирования
    noLine: boolean; // Флаг, указывающий, нужно ли отображать линию под полем
    onBlur: () => void; // Функция обратного вызова при потере фокуса
    errorText: string; // Текст ошибки, который будет отображаться
    error: boolean; // Флаг, указывающий, есть ли ошибка
    type: 'text' | 'button'; // Тип поля ввода (текст или кнопка)
    name: string; // Имя поля ввода
    value: string; // Значение поля ввода
    label: string; // Метка для поля ввода
}

export class InputWide extends Block { // Класс InputWide, наследующий от класса Block
    constructor(props: IInputWide) {
        // Устанавливаем значения по умолчанию для текста ошибки и флага ошибки
        props.errorText = ''; // Изначально текст ошибки пустой
        props.error = false; // Изначально ошибки нет

        // Устанавливаем обработчик события onBlur, который вызывает метод валидации
        props.onBlur = () => this.validate();
        super({ ...props }); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента InputWide
    public get props() {
        return this._props as IInputWide; // Приводим _props к типу IInputWide
    }

    // Метод для получения значения поля ввода
    public value() {
        if (!this.validate()) { // Если валидация не прошла, возвращаем пустую строку
            return '';
        }
        return this.refs?.input?.value(); // Возвращаем значение поля ввода, если оно существует
    }

    // Метод для валидации значения поля ввода
    private validate() {
        const value = this.refs?.input?.value(); // Получаем текущее значение поля ввода
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
        const { type = '', name = '', value = '', label = "", error = false, errorText = '', readOnly = false, noLine = false } = this.props;

        return (`
            <div class="inputWide">
                <label class="inputWide__container ${noLine ? `inputWide__container-noline` : ""}"> 
                    <div class="inputWide__label"><span>${label}</span></div> 
                    ${readOnly ? `<span class="inputWide__text">${value}</span>` : ""} 
                    {{{ Input  ref='input'  type="${type}"  
                        classes="inputWide__value ${error ? "input__value-error" : ""} ${readOnly ? "input__value-disabled" : ""}"
                        value='${value}' 
                        placeholder=" " 
                        name="${name}" 
                        onBlur=onBlur 
                    }}}
                </label>
                ${error ? ` <div class="inputWide__error"><div class="inputWide__text-error">${errorText}</div></div>` : ""}
            </div>
        `);
    }
}

