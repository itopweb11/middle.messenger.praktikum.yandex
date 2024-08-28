import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Класс PageChat, который наследует от класса Block
export class PageChat extends Block {
    // Конструктор класса
    constructor() {
        const props: IProps = { events: {} }; // Создаем объект свойств с пустым объектом событий
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для рендеринга содержимого страницы
    protected render(): string {
        return (`
           <div class="chatPage"> <!-- Контейнер для страницы чата -->
                <div class="chatPage__left">{{{ ChatList }}}</div> <!-- Левая часть страницы для списка чатов -->
                <div class="chatPage__main">{{{ MessageList }}}</div> <!-- Основная часть страницы для списка сообщений -->
            </div>
        `);
    }
}

