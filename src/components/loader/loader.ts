import { Block } from "../../helpers/Block.ts"; // Импортируем класс Block из основной библиотеки

export class Loader extends Block { // Класс Loader, наследующий от класса Block
    // Метод для рендеринга содержимого компонента
    protected render(): string {
        return (`<span class="loader"></span>`); // Возвращаем HTML-разметку для индикатора загрузки
    }
}
