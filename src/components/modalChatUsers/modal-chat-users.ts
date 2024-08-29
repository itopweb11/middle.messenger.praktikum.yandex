import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import modalController from "../../helpers/modalController.ts"; // Импортируем контроллер модальных окон
import { searchUsers } from "../../services/userSettings.ts"; // Импортируем функцию для поиска пользователей по логину
import { IUser } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для пользователя
import { UserItem } from "../index.ts"; // Импортируем компонент UserItem
import { addChatUser, deleteChatUsers } from "../../services/chat.ts"; // Импортируем функции для добавления и удаления пользователей из чата
import { stateCurrentChat } from "../../services/app.ts"; // Импортируем функцию для обновления состояния текущего чата

// Интерфейс для свойств компонента ModalChatUsers
interface IModalChatUsers extends IProps {
    ref?: string; // Необязательная ссылка на компонент
    cancelClick?: () => void; // Функция для обработки клика по кнопке "Отмена" (необязательная)
    type: 'add' | 'delete'; // Тип модального окна (для добавления или удаления пользователей)
    users: IUser[] | null; // Список пользователей
    okClick?: (result: string) => void; // Функция для обработки клика по кнопке "ОК" (необязательная)
    okInputClick?: (event: Event) => void; // Функция для обработки клика по кнопке "Найти пользователей" (необязательная)
}

export class ModalChatUsers extends Block { // Класс ModalChatUsers, наследующий от класса Block
    constructor(props: IModalChatUsers) {
        // Функция для обработки клика по кнопке "Найти пользователей"
        props.okInputClick = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение события
            event.stopPropagation(); // Останавливаем всплытие события
            if (this.props.type === 'add') { // Если тип - добавление
                const input = this.refs.modal.getRefs().input.value(); // Получаем значение поля ввода
                if (!input) return; // Если поле ввода пустое, выходим
                searchUsers(input).then((users) => { // Ищем пользователей по логину
                    if (!users || users.length === 0) alert('Пользователь не найден'); // Если пользователи не найдены, выводим сообщение
                    this.props.users = users; // Обновляем список пользователей
                    this.setProps(this.props); // Обновляем свойства компонента
                }).catch(error => console.log(error)); // Обрабатываем ошибки
            } else modalController.closeModal(); // Если тип - удаление, закрываем модальное окно
        }

        // Функция для обработки клика по кнопке "Отмена"
        props.cancelClick = () => {
            modalController.closeModal(); // Закрываем модальное окно
        }

        // Вызываем конструктор родительского класса с переданными свойствами и устанавливаем обработчик события клика
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    e.stopPropagation(); // Останавливаем всплытие события
                    const id = (e.target as HTMLElement).id; // Получаем идентификатор элемента, по которому кликнули
                    const chat = window.store.getState().currentChat; // Получаем текущий чат
                    if (chat && id && props.type === 'add') { // Если чат есть, есть идентификатор и тип - добавление
                        addChatUser({ // Добавляем пользователя в чат
                            users: [Number(id)], chatId: chat.id
                        }).then(() => {
                            stateCurrentChat(chat).then(() => modalController.closeModal()); // Обновляем состояние чата и закрываем модальное окно
                        }).catch((error) => console.log(error)); // Обрабатываем ошибки
                    }
                    if (props.type === 'delete' && chat) { // Если тип - удаление и чат есть
                        deleteChatUsers({ // Удаляем пользователя из чата
                            users: [Number(id)], chatId: chat.id
                        }).then(() => {
                            stateCurrentChat(chat).then(() => modalController.closeModal()); // Обновляем состояние чата и закрываем модальное окно
                        }).catch((error) => console.log(error)); // Обрабатываем ошибки
                    }
                }
            }
        })
    }

    // Геттер для получения свойств компонента ModalChatUsers
    public get props() {
        return this._props as IModalChatUsers; // Приводим _props к типу IModalChatUsers
    }

    // Метод для получения содержимого модального окна
    getChildren() {
        const { users, type } = this.props; // Деструктурируем пользователей и тип
        const result = users && users.length > 1 ? users.reduce((sum, user) => { // Создаем список пользователей
            const item = new UserItem({ user: user, icon: type === 'add' ? 'plus' : 'delete' }); // Создаем компонент UserItem
            return sum + item.renderForList(); // Добавляем HTML-разметку компонента в результат
        }, '') : ''; // Если пользователей нет или их меньше 2, возвращаем пустую строку
        return (`
                ${type === 'add' ? `{{{ InputShort label='Логин' type='text' name='input' validate=validate.login ref='input' }}} ` : ''} <!-- Поле ввода логина, если тип - добавление -->
                <div class='modalUsers'>${result}</div> <!-- Контейнер для списка пользователей -->                        
        `);
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        return (`
                 {{{ Modal desc='${this.props.type === 'add' ? 'Добавить пользователя' : 'Удалить пользователя'}' 
                         okText='${this.props.type === 'add' ? 'Добавить' : 'ок'}' 
                         cancelText='${this.props.type === 'add' ? 'Отмена' : ''}'
                         cancelClick=cancelClick
                         okClick=okInputClick 
                         children="${this.getChildren()}"
                         ref='modal' 
                 }}}
        `);
    }
}
