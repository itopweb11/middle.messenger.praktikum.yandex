import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IUser, ALL_VALIDATE_FIELDS, IValidateType } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс для пользователя
import { logOut } from "../../services/auth.ts"; // Импортируем функцию для выхода из системы

// Интерфейс для свойств компонента FormProfile
interface IFormProfile extends IProps {
    onLogOut: (event: Event) => void; // Функция обратного вызова для выхода из системы
    onCancel: (event: Event) => void; // Функция обратного вызова для отмены действий
    children: string; // Содержимое формы
    buttonText: string; // Текст кнопки
    onClickLink: (event: Event) => void; // Функция обратного вызова для обработки кликов по ссылкам
    validate: IValidateType; // Объект с правилами валидации
    user?: IUser | null; // Текущий пользователь или null
    withButton: boolean; // Флаг, указывающий, нужно ли отображать кнопку
    clickButton: (event: Event) => void; // Функция обратного вызова для кнопки "ОК"
    onChangeStateForm: (isEditPassword: boolean, isEditProfile: boolean) => void; // Функция для изменения состояния формы
}

export class FormProfile extends Block { // Класс FormProfile, наследующий от класса Block

    constructor(props: IFormProfile) {
        // Устанавливаем правила валидации по умолчанию
        props.validate = ALL_VALIDATE_FIELDS;

        // Функция для выхода из системы
        props.onLogOut = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение события
            logOut().catch((error) => console.log(error)); // Вызываем функцию выхода и обрабатываем ошибки
        };

        // Функция для обработки кликов по ссылкам
        props.onClickLink = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение события
            event.stopPropagation(); // Останавливаем всплытие события
            const id = (event.target as Element).id; // Получаем идентификатор целевого элемента
            // Изменяем состояние формы в зависимости от нажатой ссылки
            if (id === 'edit_password') this.props.onChangeStateForm(true, false); // Если нажата ссылка для изменения пароля
            if (id === 'edit_profile') this.props.onChangeStateForm(false, true); // Если нажата ссылка для изменения профиля
        };

        // Получаем текущего пользователя из хранилища
        props.user = window.store.getState().user;
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента FormProfile
    public get props() {
        return this._props as IFormProfile; // Приводим _props к типу IFormProfile
    }

    // Метод для рендеринга содержимого компонента
    protected render(): string {
        const {
            user,
            withButton = false, // Устанавливаем значение по умолчанию
            children = '', // Устанавливаем значение по умолчанию
            buttonText = '' // Устанавливаем значение по умолчанию
        } = this.props;

        if (!user) return ''; // Если пользователя нет, ничего не рендерим

        const {
            avatar = '', // URL аватара
            first_name, // Имя пользователя
            second_name // Фамилия пользователя
        } = user;

        return (`
            <div class="profile"> <!-- Контейнер для профиля -->
                <div class="profile__avatar"> <!-- Контейнер для аватара -->
                    {{{ Avatar imageUrl='${avatar || ''}' loadAvatar=true }}} <!-- Компонент аватара -->
                    <h2 class="profile__avatar__name">${first_name} ${second_name}</h2> <!-- Имя и фамилия пользователя -->
                </div>
                ${user ? `<div class="profile__main">${children}</div>` : ''} <!-- Основное содержимое формы -->
                ${withButton ?
            `<div class="profile__button">{{{ Button desc="${buttonText}" onClick=clickButton isSubmit=true}}}</div>` : // Если с кнопкой, отображаем кнопку "ОК"
            `<div class="profile__buttons"> <!-- Контейнер для кнопок -->
                        {{{Link desc="Изменить данные" href='' type='success' linkLine=true onClick=onClickLink id='edit_profile'}}} <!-- Ссылка для изменения данных пользователя -->
                        {{{Link desc="Изменить пароль" href='' type='success' linkLine=true onClick=onClickLink id='edit_password'}}} <!-- Ссылка для изменения пароля -->
                        {{{Button desc="Выйти" onClick=onLogOut type='link' }}} <!-- Кнопка выхода из системы -->
                    </div>`
        }
                <div class="block-cancel">{{{ Button type="cancel" onClick=onCancel }}}</div> <!-- Кнопка для отмены -->
            </div>
        `);
    }
}
