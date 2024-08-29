import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { UserAvatar, UserProfile } from "../../services/userSettings.ts"; // Импортируем функции для обновления аватара пользователя и профиля
import { BASE_RESOURCES_URL } from "../../config.ts"; // Импортируем базовый URL для ресурсов
import modalController from "../../helpers/modalController.ts"; // Импортируем контроллер модальных окон
import { addActive, deleteActive, loadFileFrom } from "../../utils/loadFileUtils.ts"; // Импортируем утилиты для работы с файлами
import { updateChatAvatar } from "../../services/chat.ts"; // Импортируем функцию для обновления аватара чата

// Интерфейс для свойств компонента ModalAvatar
interface IModalAvatar extends IProps {
    onAddFile?: (e: InputEvent) => void; // Функция для обработки добавления файла (необязательная)
    cancelClick?: () => void; // Функция для обработки клика по кнопке "Отмена" (необязательная)
    type: 'user' | 'Chat'; // Тип модального окна (для пользователя или чата)
    newAvatar?: string; // Новый аватар (необязательный)
    oldAvatar?: string; // Старый аватар (необязательный)
    file?: unknown; // Файл (необязательный)
    okClick?: () => void; // Функция для обработки клика по кнопке "ОК" (необязательная)
}

export class ModalAvatar extends Block { // Класс ModalAvatar, наследующий от класса Block
    constructor(props: IModalAvatar) {
        props.file = null; // Изначально файл равен null
        props.newAvatar = ''; // Изначально новый аватар пустой

        // Функция для обработки клика по кнопке "ОК"
        props.okClick = async () => {
            if (this.props.type === 'Chat') { // Если тип - чат
                const chat = window.store.getState().chats?.find(item => item.id === window.store.getState().currentChat?.id); // Находим текущий чат
                if (chat) {
                    chat.avatar = window.store.getState().currentChat?.avatar; // Обновляем аватар чата
                    window.store.set({ chats: window.store.getState().chats }); // Обновляем хранилище
                }
            }
            modalController.closeModal(); // Закрываем модальное окно
        }

        // Функция для обработки клика по кнопке "Отмена"
        props.cancelClick = () => {
            switch (this.props.type) {
                case "user": {
                    const user = window.store.getState().user; // Получаем текущего пользователя
                    if (user && this.props.oldAvatar) {this.props.newAvatar = ''; // Очищаем новый аватар
                        // Обновляем профиль пользователя с использованием старого аватара
                        UserProfile({ ...user, avatar: this.props.oldAvatar }).then(() => {
                            modalController.closeModal(); // Закрываем модальное окно после обновления
                        });
                    }
                    modalController.closeModal(); // Закрываем модальное окно
                    break;
                }
                case "Chat": {
                    const chat = window.store.getState().currentChat; // Получаем текущий чат
                    if (chat && this.props.oldAvatar) {this.props.newAvatar = ''; // Очищаем новый аватар
                        modalController.closeModal(); // Закрываем модальное окно
                    }
                    modalController.closeModal(); // Закрываем модальное окно
                    break;
                }
            }
        }

        // Функция для обработки добавления файла
        const _onAddFile = <TEvent>(e: TEvent) => {
            deleteActive(e as Event); // Удаляем активное состояние при добавлении файла
            const formData = loadFileFrom<TEvent>(e); // Загружаем новый файл из перетаскивания
            if (formData) { // Если файл загружен
                switch (this.props.type) {
                    case "user": { // Если тип - пользователь
                        UserAvatar(formData).then(user => { // Обновляем аватар пользователя
                            this.props.newAvatar = user.avatar; // Устанавливаем новый аватар
                            modalController.addModal((new ModalAvatar({ // Создаем новое модальное окно для аватара
                                oldAvatar: window.store.getState().user?.avatar || '',
                                type: 'user'
                            })) as unknown as Block);
                        }).catch((error) => console.log(error)); // Обрабатываем ошибки
                        break;
                    }
                    case "Chat": { // Если тип - чат
                        const _chat = window.store.getState().currentChat; // Получаем текущий чат
                        if (!_chat) break; // Если чата нет, выходим
                        updateChatAvatar(formData, _chat.id) // Обновляем аватар чата
                            .then(chat => {
                                this.props.newAvatar = chat.avatar; // Устанавливаем новый аватар
                                modalController.addModal((new ModalAvatar({ // Создаем новое модальное окно для аватара
                                    oldAvatar: window.store.getState().currentChat?.avatar || '',
                                    type: 'Chat'
                                })) as unknown as Block);
                            })
                            .catch((error) => console.log(error)); // Обрабатываем ошибки
                        break;
                    }
                }
            }
        }

        // Вызываем конструктор родительского класса с переданными свойствами и устанавливаем обработчики событий
        super({
            ...props,
            events: {
                dragenter: (e: Event) => { addActive(e); }, // Обработчик события dragenter
                dragover: (e: Event) => { addActive(e); }, // Обработчик события dragover
                dragleave: (e: Event) => { deleteActive(e); }, // Обработчик события dragleave
                drop: _onAddFile<DragEvent>, // Обработчик события drop
                change: _onAddFile<Event>, // Обработчик события change
            }
        });
    }

    // Геттер для получения свойств компонента ModalAvatar
    public get props() {
        return this._props as IModalAvatar; // Приводим _props к типу IModalAvatar
    }

    // Метод для получения содержимого модального окна
    getChildren() {
        const { oldAvatar = '', newAvatar = '' } = this.props; // Деструктурируем старый и новый аватар
        let result: string; // Переменная для хранения результата
        if (newAvatar) { // Если новый аватар установлен
            result = `<img src='${BASE_RESOURCES_URL + newAvatar}' alt='image avatar' class='modal-avatar__image'/>`; // Создаем элемент img для нового аватара
        } else {
            result = oldAvatar ? `<img src='${BASE_RESOURCES_URL + oldAvatar}' alt='image avatar' class='modal-avatar__image'/>` : `<div class='modal-avatar__empty'></div>`; // Если старый аватар есть, создаем элемент img, иначе создаем пустой контейнер
        }
        return (`
            <div class='modal-avatar' id='modal-avatar'>${result} <!-- Контейнер для аватара -->
               <input id='file-input' type='file' name='file' accept='.jpg, .png,.svg' class='modal-avatar__input'> <!-- Поле для загрузки файла -->
               <label for='file-input' class='modal-avatar__label'>Выберите файл</label> <!-- Метка для поля загрузки файла -->
               <span>или перетащите его сюда</span> <!-- Подсказка для пользователя -->
             </div>
        `);
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        return (`{{{ Modal desc="Изменить аватар" okText='сохранить' cancelText='Отмена' okClick=okClick cancelClick=cancelClick children="${this.getChildren()}" }}}`); // Создаем модальное окно с заголовком и кнопками
    }
}
