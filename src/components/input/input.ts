import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента Input
interface IInput extends IProps {
    ref: string; // Ссылка на элемент (для работы с DOM)
    name: string; // Имя поля ввода
    value: string; // Значение поля ввода
    type: 'text' | 'password'; // Тип поля ввода (текст или пароль)
    classes: string; // CSS-классы для стилизации поля ввода
    placeholder: string; // Текст-подсказка, отображаемый в поле ввода
    onBlur: () => void; // Функция обратного вызова, вызываемая при потере фокуса
}

export class Input extends Block { // Класс Input, наследующий от класса Block
    constructor(props: IInput) {
        // Устанавливаем обработчик события blur, который вызывает функцию onBlur или пустую функцию по умолчанию
        props.events = { blur: props.onBlur || (() => {}), };
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        // Деструктурируем свойства из _props
        const { classes, placeholder, ref, value, name, type } = this._props as IInput;
        return (`
            <input class="${classes}" placeholder="${placeholder || ''}" ref="${ref}" name="${name}" value="${value}" type="${type}"/> 
        `);
    }
}
