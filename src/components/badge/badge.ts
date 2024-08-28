import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки

// Интерфейс для свойств компонента Badge
interface IBadge extends IProps {
    type: 'primary' | 'ready'; // Тип бейджа (первичный или готовый)
    text: string; // Текст бейджа
}

export class Badge extends Block { // Класс Badge, наследующий от класса Block
    constructor(props: IBadge) {
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const { type = '', text = '' } = this._props as IBadge; // Деструктурируем свойства, устанавливая значения по умолчанию
        return (`
            <div class="badge ${type ? "badge-" + type : ""}"> <!-- Обертка для бейджа с классом по типу -->
                <span>${text}</span> <!-- Отображаем текст бейджа -->
            </div>
        `);
    }
}
