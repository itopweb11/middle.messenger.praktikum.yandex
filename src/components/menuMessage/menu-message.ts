import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IChat } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для чата


// Интерфейс для свойств компонента MenuMessage
interface IMenuMessage extends IProps {
    addMedia: () => void; // Функция для добавления медиа (например, изображений)
    addFile: () => void; // Функция для добавления файлов
    addLocation: () => void; // Функция для добавления местоположения
    currentChat: IChat | null; // Текущий чат
    isOpenedMenu: boolean; // Флаг, указывающий, открыто ли меню
    closeMenu: () => void; // Функция для закрытия меню
}

export class MenuMessage extends Block { // Класс MenuMessage, наследующий от класса Block

    constructor(props: IMenuMessage) {
        // Получаем текущий чат из хранилища
        props.currentChat = window.store.getState().currentChat;



        // Функция для добавления файла
        props.addFile = () => {
            console.log('add file!'); // Логируем действие
            this.props.closeMenu(); // Закрываем меню
        }

        // Функция для добавления местоположения
        props.addLocation = () => {
            console.log('add location!'); // Логируем действие
            this.props.closeMenu(); // Закрываем меню
        }

        super({ ...props }); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента MenuMessage
    public get props() {
        return this._props as IMenuMessage; // Приводим _props к типу IMenuMessage
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { isOpenedMenu = false } = this.props; // Деструктурируем свойство isOpenedMenu с установкой значения по умолчанию
        return (`            
            <nav class='${`menu menu-message container-shadow ${isOpenedMenu ? 'opened' : 'hide'}`}'> <!-- Контейнер для меню с классами в зависимости от состояния -->
                <ul > <!-- Список пунктов меню -->
                    {{{ MenuItem 
                    desc='Фото или Видео' 
                    onClick=addMedia 
                    icon='media' 
                    }}} <!-- Пункт меню для добавления изображения -->
                    {{{ MenuItem 
                    desc='Файл' 
                    onClick=addFile 
                    icon='file' 
                    disabled=true 
                    }}} <!-- Пункт меню для добавления файла (отключен) -->
                    {{{ MenuItem 
                    desc='Локация' 
                    onClick=addLocation 
                    icon='location' 
                    disabled=true 
                    }}} <!-- Пункт меню для добавления местоположения (отключен) -->
                </ul>
            </nav>
        `);
    }
}
