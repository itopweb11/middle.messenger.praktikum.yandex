import Block from "./block.ts"; // Импортируем класс Block, который будет использоваться для создания модальных окон

class DialogController {
    private static __instance: DialogController; // Статическая переменная для хранения единственного экземпляра класса (Singleton)
    private dialog: HTMLDialogElement | null = null; // Переменная для хранения элемента диалогового окна
    private _opened: boolean = false; // Флаг, указывающий, открыто ли диалоговое окно

    constructor() {
        // Проверяем, существует ли уже экземпляр класса
        if (DialogController.__instance) {return DialogController.__instance} // Если экземпляр существует, возвращаем его
        DialogController.__instance = this; // Устанавливаем текущий экземпляр как единственный
        this.dialog = document.getElementById('dialog') as HTMLDialogElement; // Получаем элемент диалогового окна по ID
        this._opened = false; // Изначально диалоговое окно закрыто
    }

    // Статический метод для получения единственного экземпляра класса
    public static getInstance() {return this.__instance} // Возвращаем экземпляр класса

    // Геттер для проверки, открыто ли диалоговое окно
    public get opened() {return this._opened} // Возвращаем значение флага _opened


    // Метод для добавления модального окна
    public addModal(modal: Block) {
        const htmlElement = modal.getContent(); // Получаем HTML-содержимое модального окна
        // Если в диалоговом окне нет дочерних элементов, создаем новый div
        if (!this.dialog?.firstElementChild) this.dialog?.append(document.createElement('div'));
        // Если содержимое модального окна существует, заменяем старый элемент новым
        if (htmlElement) this.dialog?.firstElementChild?.replaceWith(htmlElement);
    }

    // Метод для открытия диалогового окна
    public openModal() {this._opened = true; // Устанавливаем флаг _opened в true
        this.dialog?.showModal(); // Открываем диалоговое окно
    }

    // Метод для закрытия диалогового окна
    public closeModal() {this._opened = false; // Устанавливаем флаг _opened в false
        this.dialog?.close(); // Закрываем диалоговое окно
    }
}

// Создаем единственный экземпляр класса DialogController
const modalController = new DialogController();
export default modalController; // Экспортируем экземпляр класса по умолчанию
