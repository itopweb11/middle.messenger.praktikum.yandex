import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChat } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для чата
import { StoreEvents } from "../../helpers/store.ts"; // Импортируем события хранилища

// Интерфейс для свойств компонента MessageListHeader
interface IMessageList extends IProps {
    openMenuChat?: () => void; // Функция для открытия меню чата (необязательная)
    isOpenedMenuChat: boolean; // Флаг, указывающий, открыто ли меню чата
    openMenuMessage?: () => void; // Функция для открытия меню сообщений (необязательная)
    currentChat: IChat | null; // Текущий чат
}

export class MessageListHeader extends Block { // Класс MessageListHeader, наследующий от класса Block
    constructor(props: IMessageList) {
        // Устанавливаем начальное значение флага isOpenedMenuChat
        props.isOpenedMenuChat = false;

        // Получаем текущий чат из хранилища
        props.currentChat = window.store.getState().currentChat;

        // Функция для открытия/закрытия меню чата
        props.openMenuChat = () => {
            this.props.isOpenedMenuChat = !this.props.isOpenedMenuChat; // Инвертируем значение флага
            this.props.currentChat = window.store.getState().currentChat; // Обновляем текущий чат
            this.setProps(this.props); // Обновляем свойства компонента
        }

        super(props); // Вызываем конструктор родительского класса с переданными свойствами

        // Подписываемся на событие обновления хранилища
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentChat = window.store.getState().currentChat; // Обновляем текущий чат
            this.setProps(this.props); // Обновляем свойства компонента
        });
    }

    // Геттер для получения свойств компонента MessageListHeader
    public get props() {
        return this._props as IMessageList; // Приводим _props к типу IMessageList
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { isOpenedMenuChat, currentChat } = this.props; // Деструктурируем свойства

        // Если текущий чат не выбран, возвращаем пустую строку
        if (!currentChat) return '';

        const { avatar, title } = currentChat; // Деструктурируем аватар и заголовок текущего чата

        return (`
                <div class="message-list__header"> <!-- Контейнер для заголовка списка сообщений -->
                    <div class="message-list__header__avatar"> <!-- Контейнер для аватара и заголовка чата -->
                        {{{ Avatar imageUrl='${avatar || ''}' size='sm' }}} <!-- Компонент аватара -->
                        <div class="message-list__header__title"> <!-- Контейнер для заголовка чата -->
                            <span>${title}</span> <!-- Заголовок чата -->
                        </div>
                    </div>
                    {{{ Button type="dots" onClick=openMenuChat}}} <!-- Кнопка для открытия меню чата -->
                    {{{ MenuChat isOpenedMenu=${isOpenedMenuChat} closeMenu=openMenuChat}}} <!-- Компонент меню чата -->
                </div>
        `);
    }
}
