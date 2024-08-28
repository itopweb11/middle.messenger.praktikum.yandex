import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента InputSearch
interface IInputSearchProps extends IProps {
    errorText: string; // Текст ошибки, который будет отображаться
    error: boolean; // Флаг, указывающий, есть ли ошибка
    name: string; // Имя поля ввода
    value: string; // Значение поля ввода
}

export class InputSearch extends Block { // Класс InputSearch, наследующий от класса Block
    constructor(props: IInputSearchProps) {
        // Устанавливаем значения по умолчанию для текста ошибки и флага ошибки
        props.errorText = ''; // Изначально текст ошибки пустой
        props.error = false; // Изначально ошибки нет
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для получения значения поля ввода
    public value() {
        return this.refs?.input?.value(); // Возвращаем значение поля ввода, если оно существует
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { name = '', value = '' } = this._props as IInputSearchProps; // Деструктурируем свойства с установкой значений по умолчанию

        return (`
           <label class="inputSearch"> <!-- Контейнер для поля ввода с меткой -->
                <span class="inputSearch__label"> <!-- Метка для поля ввода -->
                Search...
                </span>
                {{{ Input ref='input' type="text" classes="inputSearch__value" value='${value}' name="${name}" placeholder=' ' }}} <!-- Компонент поля ввода -->
            </label>
        `);
    }
}
