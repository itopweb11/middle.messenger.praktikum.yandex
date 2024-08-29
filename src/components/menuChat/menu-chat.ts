import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChat } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для чата
import modalController from "../../helpers/modalController.ts"; // Импортируем контроллер модальных окон
import { ModalAvatar, ModalChatUsers } from "../index.ts"; // Импортируем компоненты модальных окон для аватара и пользователей чата

// Интерфейс для свойств компонента MenuChat
interface IMenuChat extends IProps {
    addUser: () => void; // Функция для добавления пользователя в чат
    deleteUser: () => void; // Функция для удаления пользователя из чата
    changeAvatarChat: () => void; // Функция для изменения аватара чата
    closeMenu: () => void; // Функция для закрытия меню
    currentChat: IChat | null; // Текущий чат
    isOpenedMenu: boolean; // Флаг, указывающий, открыто ли меню
}

export class MenuChat extends Block { // Класс MenuChat, наследующий от класса Block
    constructor(props: IMenuChat) {
        // Получаем текущий чат из хранилища
        props.currentChat = window.store.getState().currentChat;

        // Функция для добавления пользователя в чат
        props.addUser = () => {
            // Создаем и добавляем модальное окно для добавления пользователей
            modalController.addModal((new ModalChatUsers({
                users: [], // Список пользователей
                type: 'add', // Тип модального окна
                ref: "modal", // Ссылка на модальное окно
                okClick: (result: string) => { console.log(result); }, // Функция обратного вызова для кнопки "ОК"
            })) as unknown as Block);
            modalController.openModal(); // Открываем модальное окно
            this.props.closeMenu(); // Закрываем меню
        }

        // Функция для удаления пользователя из чата
        props.deleteUser = () => {
            // Создаем и добавляем модальное окно для удаления пользователей
            modalController.addModal((new ModalChatUsers({
                users: window.store.getState().currentChat?.users || [], // Список пользователей
                type: 'delete', // Тип модального окна
                ref: "modal", // Ссылка на модальное окно
                okClick: (result: string) => { console.log(result); }, // Функция обратного вызова для кнопки "ОК"
            })) as unknown as Block);
            modalController.openModal(); // Открываем модальное окно
            this.props.closeMenu(); // Закрываем меню
        }

        // Функция для изменения аватара чата
        props.changeAvatarChat = () => {
            // Создаем и добавляем модальное окно для изменения аватара чата
            modalController.addModal((new ModalAvatar({
                oldAvatar: window.store.getState().currentChat?.avatar || '', // Старый аватар чата
                type: 'Chat' // Тип модального окна
            })) as unknown as Block);
            modalController.openModal(); // Открываем модальное окно
            this.props.closeMenu(); // Закрываем меню
        }

        super({ // Вызываем конструктор родительского класса с переданными свойствами
            ...props
        });
    }

    // Геттер для получения свойств компонента MenuChat
    public get props() {
        return this._props as IMenuChat; // Приводим _props к типу IMenuChat
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { isOpenedMenu = false } = this.props; // Деструктурируем свойство isOpenedMenu
        return (`            
            <nav class='${`menu menu-chat container-shadow ${isOpenedMenu ? 'opened' : 'hide'}`}'>
                <ul > 
                    {{{ MenuItem 
                    desc='Добавить пользователя' 
                    onClick=addUser 
                    icon='plus' 
                    }}}
                    {{{ MenuItem 
                    desc='Удалить пользователя'
                    onClick=deleteUser
                    icon='delete'
                    }}}
                    <!--{{{ MenuItem
                    desc='Изменить аватар чата'
                    onClick=changeAvatarChat
                    icon='avatar'
                    }}}-->
                </ul>
            </nav>
        `);
    }
}
