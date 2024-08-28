import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChatMessage } from "../../typesModels/typesModels.ts"; // Импортируем интерфейс для сообщения чата
import { getShortDate } from "../../utils/dateUtils.ts"; // Импортируем утилиту для форматирования даты
import { BASE_RESOURCES_URL } from "../../config.ts"; // Импортируем базовый URL для ресурсов

// Интерфейс для свойств компонента Message
export interface IMessage extends IProps {
    myMessage: boolean; // Флаг, указывающий, является ли сообщение отправленным пользователем
    userName: string; // Имя пользователя, отправившего сообщение
    message: IChatMessage; // Объект сообщения чата
}

export class Message extends Block { // Класс Message, наследующий от класса Block
    constructor(props: IMessage) {
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    public renderForList = this.render; // Создаем ссылку на метод render для использования в списках

    // Геттер для получения свойств компонента Message
    public get props() {
        return this._props as IMessage; // Приводим _props к типу IMessage
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const {
            message,
            myMessage,
            userName
        } = this.props; // Деструктурируем свойства сообщения, флаг и имя пользователя

        return (`
            <li class="message ${myMessage ? ' message-my' : ''}"> <!-- Контейнер для сообщения с классом, если это сообщение пользователя -->
               ${message.file ? ` <!-- Если сообщение содержит файл -->
                    <article class="message__file"> <!-- Контейнер для сообщения с файлом -->
                        ${!myMessage ? `<div class="message__user">${userName}</div>` : ''} <!-- Отображаем имя пользователя, если это не сообщение пользователя -->
                        <img src=${BASE_RESOURCES_URL + message.file.path} alt="included_file"/> <!-- Отображаем изображение файла -->
                        <div class="message__time">{{{ Badge text="${getShortDate(message.time)}" type="primary" }}}</div> <!-- Отображаем время сообщения в виде бейджа -->
                    </article>` : `<article class="message__text"> <!-- Если сообщение не содержит файл -->
                        ${!myMessage ? `<div class="message__user">${userName}</div>` : ''} <!-- Отображаем имя пользователя, если это не сообщение пользователя -->
                        <p>${message.content}</p> <!-- Отображаем текст сообщения -->
                        <div class="message__time">{{{ Badge text="${getShortDate(message.time)}" }}}</div> <!-- Отображаем время сообщения в виде бейджа -->
                    </article>`
        }
            </li>
        `);
    }
}
