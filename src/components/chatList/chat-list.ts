import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChat, IUser} from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для чата
import modalController from "../../helpers/modalController.ts"; // Импортируем контроллер модальных окон
import ModalPrompt from "../modalPrompt"; // Импортируем компонент модального окна-подсказки
import { createChat } from "../../services/chat.ts"; // Импортируем функцию для создания чата
import { renovateChats, stateCurrentChat } from "../../services/app.ts"; // Импортируем функции для обновления списка чатов и установки текущего чата
import { StoreEvents } from "../../helpers/store.ts"; // Импортируем события хранилища

// Интерфейс для свойств компонента ChatList
interface IChatList extends IProps {
    showModalAddChat: () => void; // Функция для отображения модального окна добавления чата
    list: IChat[]; // Список чатов
    setCurrentChat: (chat: string) => void; // Функция для установки текущего чата
    currentUser: IUser | null; // Текущий пользователь
}

export class ChatList extends Block { // Класс ChatList, наследующий от класса Block
    constructor(props: IChatList) {
        // Инициализируем свойства
        props.currentUser = window.store.getState().user || null; // Получаем текущего пользователя из хранилища
        props.list = window.store.getState().chats || []; // Получаем список чатов из хранилища

        // Функция для отображения модального окна добавления чата
        props.showModalAddChat = () => {
            modalController.addModal((new ModalPrompt({ // Создаем и добавляем модальное окно-подсказку
                desc: 'Добавить чат', // Заголовок модального окна
                labelText: 'Название Чат', // Текст метки поля ввода
                okText: 'Добавить чат', // Текст кнопки подтверждения
                ref: "modal", // Ссылка на модальное окно
                okClick: (result: string) => { // Функция обратного вызова для кнопки подтверждения
                    createChat(result) // Создаем новый чат с введенным названием
                        .then(async () => await renovateChats()) // Обновляем список чатов
                        .catch((error) => console.log(error)); // Обрабатываем ошибки
                },
            })) as unknown as Block);
            modalController.openModal(); // Открываем модальное окно
        }

        // Функция для установки текущего чата
        props.setCurrentChat = (id: string) => {
            const chat = this.props.list.find(item => item.id === Number(id)) || null; // Находим чат по идентификатору
            stateCurrentChat(chat).then(() => { // Устанавливаем текущий чат
                this.setProps(this.props); // Обновляем свойства компонента
            });
        }

        super({ // Вызываем конструктор родительского класса с переданными свойствами
            ...props
        });

        // Подписываемся на событие обновления хранилища
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user || null; // Обновляем текущего пользователя
            this.props.list = window.store.getState().chats || []; // Обновляем список чатов
            this.setProps(this.props); // Обновляем свойства компонента
        });
    }

    // Геттер для получения свойств компонента ChatList
    public get props() {
        return this._props as IChatList; // Приводим _props к типу IChatList
    }

    // Метод для генерации списка чатов
    getChats(list: IChat[]): string {
        if (!list || list.length === 0) return `<li class="chatList__chats-empty">{{{Button desc="Add chat" type='link' onClick=showModalAddChat }}}</li>`; // Если список чатов пуст, отображаем кнопку для добавления чата
        return list.map(chat => { // Перебираем список чатов
            return (`  {{{ChatItem onClick=setCurrentChat 
                    id='${chat.id}' 
                    title='${chat.title}' 
                    avatar='${chat.avatar || ''}' 
                    unreadCount='${chat.unreadCount > 0 ? String(chat.unreadCount) : ''}' 
                    lastMessageContent='${chat.last_message ? chat.last_message.content : 'нет сообщений'}'
                    lastMessageTime='${chat.last_message ? chat.last_message.time : ''}' }}} `); // Передаем время последнего сообщения
        }).join(''); // Объединяем элементы списка в одну строку
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { list, currentUser } = this.props; // Деструктурируем свойства
        if (!currentUser) return ` 
            <div class="container container-center">
                 {{{Loader }}}
            </div>`;

        return (`            
            <div class="chatList"> 
            <div class="chatList__inputSearch">
                 {{{Link 
                 desc="Профиль" 
                 href="/settings"  
                 linkIcon=true 
                 }}} 
                 {{{InputSearch}}}
            </div>
                <nav class="chatList__header"> 
                ${currentUser && 
                    `{{{ Avatar imageUrl='${currentUser.avatar || ''}' size='sm' }}}`
                } 
                {{{Button 
                desc="Добавить новый чат" 
                type='link' 
                onClick=showModalAddChat 
                }}} 
                </nav>
                <ul class="chatList__chats"> 
                    ${this.getChats(list)}                  
                </ul>
                <div class="chatList__footer"></div>
            </div>
        `);
    }
}
