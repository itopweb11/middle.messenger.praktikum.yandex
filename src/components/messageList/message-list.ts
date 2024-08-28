import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChatMessage, IUser, IChat } from "../../typesModels/typesModels.ts"; // Импортируем интерфейс для сообщений чата
import { Message } from "../index.ts"; // Импортируем компонент Message
import { IMessage } from "../message/message.ts"; // Импортируем интерфейс IMessage
import { StoreEvents } from "../../helpers/store.ts"; // Импортируем события хранилища
import { getUserName } from "../../utils/userUtils.ts"; // Импортируем утилиту для получения имени пользователя

// Интерфейс для свойств компонента MessageList
interface IMessageList extends IProps {
    currentUser: IUser | null; // Текущий пользователь
    openMenuMessage?: () => void; // Функция для открытия меню сообщений (необязательная)
    openMenuChat?: () => void; // Функция для открытия меню чата (необязательная)
    isOpenedMenuChat: boolean; // Флаг, указывающий, открыто ли меню чата
    messageList: IChatMessage[]; // Список сообщений чата
    currentChat: IChat | null; // Текущий чат
}

export class MessageList extends Block { // Класс MessageList, наследующий от класса Block
    constructor(props: IMessageList) {
        // Получаем текущий чат и список сообщений из хранилища
        props.currentChat = window.store.getState().currentChat;
        props.messageList = window.store.getState().currentChat?.messages || [];
        super(props); // Вызываем конструктор родительского класса с переданными свойствами

        // Подписываемся на событие обновления хранилища
        window.store.on(StoreEvents.Updated, () => {
            // Обновляем свойства компонента при изменении состояния хранилища
            this.props.currentUser = window.store.getState().user || null; // Обновляем текущего пользователя
            this.props.messageList = window.store.getState().currentChat?.messages || []; // Обновляем список сообщений
            this.props.currentChat = window.store.getState().currentChat; // Обновляем текущий чат
            this.setProps(this.props); // Обновляем свойства компонента
        });
    }

    // Геттер для получения свойств компонента MessageList
    public get props() {
        return this._props as IMessageList; // Приводим _props к типу IMessageList
    }

    // Метод для получения списка сообщений
    getListMessages(list: IChatMessage[]): string {
        const users = this.props.currentChat?.users; // Получаем список пользователей текущего чата
        const mapUsers = new Map(); // Создаем карту для сопоставления идентификаторов пользователей с их именами

        // Заполняем карту именами пользователей
        if (users) {
            users.forEach(user => mapUsers.set(user.id, getUserName(user))); // Заполняем карту
        }

        // Если список сообщений пуст, возвращаем пустую строку
        if (!list || list.length === 0) return '';

        // Генерируем HTML-разметку для каждого сообщения
        return list.map(message => {
            const messageBlock = new Message({ // Создаем экземпляр компонента Message
                userName: mapUsers.size ? mapUsers.get(message.user_id) : '', // Получаем имя пользователя из карты
                message: message, // Передаем объект сообщения
                myMessage: String(message.user_id) === String(this.props.currentUser?.id) // Проверяем, является ли сообщение отправленным текущим пользователем
            } as IMessage);
            return (`<div class="message-list__main__message">${messageBlock.renderForList()}</div>`); // Возвращаем HTML-разметку для сообщения
        }).join(''); // Объединяем элементы списка в одну строку
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { messageList, currentChat, currentUser } = this.props; // Деструктурируем свойства

        // Если текущий чат не выбран, отображаем сообщение о необходимости выбора чата
        if (!currentChat)
            return (`<div class="message-list__empty">${currentUser ? `<p class="">Выберите чат чтобы отправить сообщение</p>` : ``}</div>`);

        const users = currentChat.users?.length || 0; // Получаем количество пользователей в текущем чате

        return (`
           <div class="message-list">{{{ MessageListHeader }}} <!-- Заголовок списка сообщений -->
              ${users > 1 ? // Если в чате более одного пользователя
            ` <ul class="message-list__main">${this.getListMessages(messageList)} <!-- Список сообщений -->
                    <li class="scroll-bottom"></li> <!-- Элемент для прокрутки внизу списка -->
                </ul>                    
                     {{{ MessageListFooter }}}
                ` :
            `<div class="message-list__empty"><p class="">Добавить пользователей в чат</p></div>` // Если пользователей нет, отображаем сообщение
        }
            </div>
        `);
    }
}
