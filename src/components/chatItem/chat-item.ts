import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { getShortDate } from "../../utils/dateUtils.ts"; // Импортируем функцию для форматирования даты

// Интерфейс для свойств компонента ChatItem
export interface IChatItem extends IProps {
    id: number; // Уникальный идентификатор чата
    title: string; // Заголовок чата
    avatar: string | null; // URL аватара чата или null
    lastMessageContent: string | null; // Содержимое последнего сообщения или null
    lastMessageTime: string | null; // Время последнего сообщения или null
    unreadCount: string | null; // Количество непрочитанных сообщений или null
    onClick: (id: string) => void; // Функция обратного вызова для обработки клика по чату
}

export class ChatItem extends Block { // Класс ChatItem, наследующий от класса Block
    constructor(props: IChatItem) {
        super({ // Вызываем конструктор родительского класса с переданными свойствами
            ...props,
            events: { // Добавляем обработчики событий
                click: (e: Event) => { // Обработчик клика
                    e.stopPropagation(); // Останавливаем всплытие события
                    props.onClick(String(this.props.id)); // Вызываем функцию обратного вызова с id чата
                }
            }
        });
    }

    // Геттер для получения свойств компонента ChatItem
    public get props() {
        return this._props as IChatItem; // Приводим _props к типу IChatItem
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        // Деструктурируем свойства из _props
        const { id, title, avatar, unreadCount, lastMessageContent, lastMessageTime } = this._props as IChatItem;

        return (`
            <li class="chatItem"> <!-- Элемент списка для чата -->
                <div class="chatItem__avatar"> <!-- Контейнер для аватара -->
                  {{{ Avatar imageUrl='${avatar || ''}' loadAvatar=false size='sm' }}} <!-- Компонент аватара с переданным URL -->
                </div>
                <div class="chatItem__desc">
                    <div class="chatItem__caption"> <!-- Контейнер для заголовка и времени последнего сообщения -->
                    <div class="chatItem__caption__name" id='${id}'> <!-- Заголовок чата с уникальным id -->
                        ${title} <!-- Отображаем заголовок чата -->
                    </div>
                    ${lastMessageTime ? `<div class="chatItem__caption__time"> <!-- Если есть время последнего сообщения -->
                        ${getShortDate(lastMessageTime)} <!-- Форматируем и отображаем время последнего сообщения -->
                    </div>` : ``}
                </div>
                 ${lastMessageContent ? ` <!-- Если есть содержимое последнего сообщения -->
                    <div class="chatItem__message"> <!-- Контейнер для последнего сообщения -->
                        <div class="chatItem__message__content"> <!-- Контейнер для текста сообщения -->
                            <p> ${lastMessageContent}</p> <!-- Отображаем содержимое последнего сообщения -->
                        </div>
                        ${unreadCount ? `{{{ Button type="number" desc='${unreadCount}' }}}` : ''} <!-- Если есть непрочитанные сообщения, отображаем кнопку с их количеством -->
                    </div>` : ` <div class="chatItem__message__content"> <!-- Если нет сообщений -->
                        <p> нет сообщений</p> <!-- Отображаем сообщение о том, что нет сообщений -->
                    </div>`}
                </div>
            </li>
        `);
    }
}
