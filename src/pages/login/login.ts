import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { BASE_URLS } from "../../config.ts"; // Импортируем базовые URL-адреса из конфигурации
import { signIn } from "../../services/auth.ts"; // Импортируем функцию для аутентификации пользователя
import { IUser } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс IUser
import { StoreEvents } from "../../helpers/store.ts"; // Импортируем события хранилища

// Интерфейс для свойств страницы входа
export interface ILoginPage extends IProps {
    onLogin: (event: Event) => void; // Функция для обработки события входа
    currentUser?: IUser | null; // Текущий пользователь (необязательное поле)
}

// Класс LoginPage, который наследует от класса Block
export class LoginPage extends Block {
    constructor() {
        // Определяем функцию для обработки события входа
        const onLogin = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            const login = this.refs.formLogin.getRefs()?.login.value(); // Получаем значение поля логина
            const password = this.refs.formLogin.getRefs()?.password.value(); // Получаем значение поля пароля

            // Проверяем, заполнены ли поля логина и пароля
            if (!login) { return; }
            if (!password) { return; }

            // Вызываем функцию signIn для аутентификации пользователя
            signIn({ login, password }).catch((error) => console.log('login', error)); // Обрабатываем ошибки входа
        };

        // Определяем свойства для страницы входа
        const props: ILoginPage = {
            events: { submit: (event: Event) => { onLogin(event); } }, // Устанавливаем обработчик события submit
            onLogin: onLogin, // Передаем функцию onLogin в свойства
            currentUser: undefined, // Изначально текущий пользователь не определен
        };

        // Подписываемся на события обновления хранилища
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user; // Обновляем текущего пользователя из хранилища
            this.setProps(this.props); // Устанавливаем обновленные свойства
        });
        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента
    public get props() {
        return this._props as ILoginPage; // Приводим _props к типу ILoginPage
    }

    // Метод для рендеринга содержимого страницы
    protected render(): string {
        const { currentUser } = this.props; // Деструктурируем текущего пользователя из свойств

        // Если текущий пользователь не определен, отображаем загрузчик
        if (currentUser === undefined)
            return ` <div class="container container-center">{{{Loader }}}</div>`;

        // Определяем содержимое для дочерних компонентов
        const children: string = `
        {{{ InputShort label='Логин' type='text' name='login' validate=validate.login ref='login' }}}
        {{{ InputShort label='Пароль' type='password' name='password' validate=validate.password ref='password' }}}`;

        // Возвращаем HTML-разметку для формы входа
        return (`
            <form class="container container-center">
                {{{ FormAuth 
                        desc="Вход" 
                        captionForm="Авторизоваться" 
                        captionCancel="Нет аккаунта?"                
                        clickButton=onLogin 
                        children="${children}" 
                        ref="formLogin" 
                        cancelLink="${BASE_URLS['page-sign-up']}"
                }}}
            </form>`);
    }
}

