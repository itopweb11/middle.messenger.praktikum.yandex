import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента Error
interface IError extends IProps {
    errorText: string; // Текст ошибки, который будет отображаться
    pageGoBack: string; // Страница, на которую можно вернуться
    errorNumber: string; // Номер ошибки, который будет отображаться
}

export class Error extends Block { // Класс Error, наследующий от класса Block
    constructor(props: IError) {super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        // Деструктурируем свойства с установкой значений по умолчанию
        const {
            errorNumber = '',
            pageGoBack = '',
            errorText = '' } = this._props as IError;
        return (`
            <div class="error"> <!-- Контейнер для отображения ошибки -->
                <h1 class="error__number">${errorNumber}</h1> <!-- Заголовок с номером ошибки -->
                <h2 class="error__text">${errorText}</h2> <!-- Заголовок с текстом ошибки -->
                {{{ Link 
                page='${pageGoBack}' 
                desc='Go Back' 
                }}} <!-- Ссылка для возврата на предыдущую страницу -->
            </div>
        `);
    }
}
