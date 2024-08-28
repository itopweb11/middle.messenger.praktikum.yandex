import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import modalController from "../../helpers/modalController.ts"; // Импортируем контроллер модальных окон
import { ModalAvatar } from "../index.ts"; // Импортируем компонент ModalAvatar для отображения модального окна
import { BASE_RESOURCES_URL } from "../../config.ts"; // Импортируем базовый URL для ресурсов

// Интерфейс для свойств компонента Avatar
interface IAvatar extends IProps {
    loadAvatar: boolean; // Флаг, указывающий, можно ли загрузить новый аватар
    ClickAvatar: () => void; // Функция обратного вызова для обработки клика по загрузке аватара
    size: 'sm' | 'md'; // Размер аватара (маленький или средний)
    imageUrl: string; // URL изображения аватара
}

export class Avatar extends Block { // Класс Avatar, наследующий от класса Block
    constructor(props: IAvatar) {
        super({
            ...props,
            events: { // Добавляем обработчики событий
                click: () => {
                    if (!props.loadAvatar) return; // Если загрузка аватара не разрешена, ничего не делаем
                    // Создаем и добавляем модальное окно для загрузки нового аватара
                    modalController.addModal((new ModalAvatar({
                        oldAvatar: window.store.getState().user?.avatar || '', // Получаем старый аватар пользователя
                        type: 'user' // Указываем тип модального окна
                    })) as unknown as Block);
                    modalController.openModal(); // Открываем модальное окно
                }
            }
        });
    }

    // Геттер для получения свойств компонента Avatar
    public get props() {
        return this._props as IAvatar; // Приводим _props к типу IAvatar
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { size = 'md', loadAvatar = false, imageUrl = '' } = this.props; // Деструктурируем свойства
        return (`
            <div class="avatar ${size}"> <!-- Обертка для аватара с классом по размеру -->
                ${imageUrl && imageUrl.trim() !== 'null' ? `
                    <img src='${BASE_RESOURCES_URL + imageUrl}' alt="image avatar" class="avatar__image"/>` : ``} <!-- Отображаем изображение аватара, если оно существует -->
                ${loadAvatar ? `
                    <div class="avatar__hover"> <!-- Элемент для отображения при наведении -->
                        <div class="avatar__hover__text">Поменять аватар</div> <!-- Текст для загрузки нового аватара -->
                    </div>` : ""}
            </div>
        `);
    }
}
