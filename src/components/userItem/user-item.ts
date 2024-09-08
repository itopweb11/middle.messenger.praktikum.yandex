import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IUser } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для пользователя
import { getUserName } from "../../utils/userUtils.ts"; // Импортируем утилиту для получения имени пользователя

// Интерфейс для свойств компонента UserItem
export interface IUserItem extends IProps {
    onClick?: () => void; // Необязательная функция для обработки клика по элементу
    icon: 'plus' | 'delete'; // Иконка, отображаемая на элементе (добавить или удалить)
    user: IUser; // Объект пользователя
}

export class UserItem extends Block { // Класс UserItem, наследующий от класса Block
    constructor(props: IUserItem) {
        super({ ...props }); // Вызываем конструктор родительского класса с переданными свойствами
    }

    public renderForList = this.render; // Создаем ссылку на метод render для использования в списках

    // Геттер для получения свойств компонента UserItem
    public get props() {
        return this._props as IUserItem; // Приводим _props к типу IUserItem
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const {
            icon = '',
            user
        } = this.props; // Деструктурируем свойства и устанавливаем значение по умолчанию для иконки
        return (`
            <div class='user-item'> <!-- Контейнер для элемента пользователя -->
                <p class='user-item__name'>
                    ${getUserName(user, true)}
                    </p>  <!-- Отображаем имя пользователя -->
                <div class='user-item__icon ${`user-item__icon_` + icon}' id='${user.id || ''}'></div> <!-- Контейнер для иконки с идентификатором пользователя -->
            </div>
        `);
    }
}



