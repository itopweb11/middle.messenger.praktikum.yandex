import { Block } from "../../helpers/Block.ts"; // Импортируем класс Block из основной библиотеки

// Класс Page500, который наследует от класса Block
export class Page500 extends Block {
    // Конструктор класса
    constructor() {super({ events: {} })} // Вызываем конструктор родительского класса с пустыми событиями

    // Метод для рендеринга содержимого страницы
    protected render(): string {
        return (`
            <div class="container container-center"> <!-- Контейнер для страницы с классами для центрирования -->
                {{{ 
                Error errorNumber="500"  <!-- Компонент для отображения ошибки -->
                errorText="Мы уже фиксим"  <!-- Текст ошибки -->
                page="pageChat"  <!-- Указываем, на какой странице произошла ошибка -->
                }}}
            </div>`);
    }
}

