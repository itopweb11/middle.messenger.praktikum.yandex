import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChatMessage, IUser, IChat } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для сообщений чата
import { validateMessage } from "../../utils/validatesUtils.ts"; // Импортируем функцию валидации сообщения
import { sendMessage } from "../../services/sendMessage.ts"; // Импортируем функцию для отправки сообщения

// Интерфейс для свойств компонента MessageListFooter
interface IMessageList extends IProps {
    onClickSend?: () => void; // Функция для отправки сообщения
    openMenuChat?: () => void; // Функция для открытия меню чата (необязательная)
    isOpenedMenuChat: boolean; // Флаг, указывающий, открыто ли меню чата
    messageList: IChatMessage[]; // Список сообщений чата
    currentUser: IUser; // Текущий пользователь
    isOpenedMenuMessage: boolean; // Флаг, указывающий, открыто ли меню сообщений
    currentChat: IChat | null; // Текущий чат
    openMenuMessage?: () => void; // Функция для открытия меню сообщений (необязательная)
    onBlurMessage?: () => void; // Функция, вызываемая при потере фокуса поля ввода сообщения (необязательная)
    message?: string; // Текст сообщения
}

export class MessageListFooter extends Block { // Класс MessageListFooter, наследующий от класса Block
    constructor(props: IMessageList) {
        // Устанавливаем начальное значение флага isOpenedMenuMessage
        props.isOpenedMenuMessage = false;

        // Функция для отправки сообщения
        props.onClickSend = () => {
            // Валидируем сообщение
            const error = validateMessage(this.valueMessage());
            // Если ошибок нет, отправляем сообщение
            if (!error) {
                sendMessage(this.valueMessage());
            } else {
                alert(error); // Иначе выводим сообщение об ошибке
            }
        }

        // Функция для открытия/закрытия меню сообщений
        props.openMenuMessage = () => {
            this.props.isOpenedMenuMessage = !this.props.isOpenedMenuMessage; // Инвертируем значение флага
            this.setProps(this.props); // Обновляем свойства компонента
        }

        // Устанавливаем обработчик события submit для формы
        props.events = {
            submit: (event: Event) => {
                event.stopPropagation(); // Останавливаем всплытие события
                event.preventDefault(); // Предотвращаем стандартное поведение формы
                console.log('submit');
                this.props.onClickSend && this.props.onClickSend(); // Вызываем функцию отправки сообщения
            }
        }

        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента MessageListFooter
    public get props() {
        return this._props as IMessageList; // Приводим _props к типу IMessageList
    }

    // Метод для получения текста сообщения
    public valueMessage() {
        return this.refs?.message.value(); // Возвращаем значение поля ввода сообщения
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const {
            message = '', // Значение поля ввода сообщения по умолчанию
            isOpenedMenuMessage // Флаг, указывающий, открыто ли меню сообщений
        } = this.props;

        return (`
                <form class="message-list__footer"> <!-- Контейнер для футера списка сообщений -->
                    {{{ MenuMessage 
                    isOpenedMenu=${isOpenedMenuMessage} 
                    closeMenu=openMenuMessage
                    }}} <!-- Компонент меню сообщений -->
                    {{{ Button 
                    type="paperclip" 
                    onClick=openMenuMessage
                    }}} <!-- Кнопка для открытия меню сообщений -->
                    {{{ Input 
                    ref="message" 
                    type="text" 
                    classes="message-list__footer__input" 
                    value='${message}' 
                    placeholder="Сообщение" 
                    name="message" 
                    onBlur=onBlurMessage 
                    }}} <!-- Поле ввода сообщения -->
                    {{{ Button 
                    type="arrowBack" 
                    isSubmit=true
                    }}} <!-- Кнопка для отправки сообщения -->
                </form>
        `);
    }
}


