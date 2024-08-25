/*
import {IProps,Block} from "../../helpers/Block";

export interface ILoginPageProps extends IProps {
    onLogin:(event:Event)=>void
}
export class LoginPage extends Block {
    constructor() {
        const props:ILoginPageProps={
            events:{},
            onLogin: (event:Event) => {
                event.preventDefault();
                const login =  this.refs.formLogin.getRefs()?.login.value();
                const password =  this.refs.formLogin.getRefs()?.password.value();

                console.log({
                    login,
                    password
                })
            }
        }

        super(props);
    }

    protected render(): string {
        const children:string=`
        {{{ InputShort label='Логин' type='text' name='login' validate=validate.login ref='login' }}}
        {{{ InputShort label='Пароль' type='password' name='password' validate=validate.password ref='password' }}}`
        return(`
            <form class="container container-center">
                {{{ FormAccess
                desc="Вход"
                descOk="Авторизоваться"
                descCancel="Нет аккаунта?"
                pageOk="allPages"
                pageCancel="pageRegistration"
                clickButton=onLogin
                children="${children}"
                ref="formLogin" }}}
            </form>`)
    }
}


const socket = new WebSocket('wss://ws.postman-echo.com/raw')


socket.addEventListener('message', function(event) {
    console.log('Сообщение от сервера:', event.data)
})

// Дождитесь появления в консоли сообщения об установке соединения
if (socket.readyState === 1) {
    socket.send('Привет, сервер!')
}

*/


import { IProps, Block } from "../../helpers/Block.ts"; // Импорт интерфейса IProps и класса Block
import { BASE_URLS } from "../../config.ts"; // Импорт базовых URL из конфигурации
import { signIn } from "../../services/auth.ts"; // Импорт функции для аутентификации пользователя
import { IUser } from "../../modalTypes/modalTypes.ts"; // Импорт интерфейса для пользователя
import { StoreEvents } from "../../helpers/store.ts"; // Импорт событий хранилища

// Интерфейс для свойств страницы логина
export interface ILoginPageProps extends IProps {
    onLogin: (event: Event) => void; // Функция для обработки события входа
    currentUser?: IUser | null; // Текущий пользователь (может быть undefined или null)
}

// Класс страницы логина, наследующий от Block
export class LoginPage extends Block {
    constructor() {
        // Функция для обработки события входа
        const onLogin = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            const login = this.refs.formLogin.getRefs()?.login.value(); // Получаем значение поля логина
            const password = this.refs.formLogin.getRefs()?.password.value(); // Получаем значение поля пароля

            // Проверка наличия логина и пароля
            if (!login) {
                return; // Если логин не указан, выходим из функции
            }
            if (!password) {
                return; // Если пароль не указан, выходим из функции
            }
            // Вызов функции аутентификации
            signIn({ login, password }).catch((error) => console.warn('login', error)); // Обработка ошибок при входе
        };

        // Определение свойств страницы логина
        const props: ILoginPageProps = {
            events: {
                submit: (event: Event) => {
                    onLogin(event); // Обработка события отправки формы
                }
            },
            onLogin: onLogin, // Передача функции onLogin в свойства
            currentUser: undefined, // Изначально текущий пользователь не определен
        };

        // Подписка на обновления состояния хранилища
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user; // Обновление текущего пользователя из состояния
            this.setProps(this.props); // Установка обновленных свойств
        });

        // Вызов конструктора родительского класса с заданными свойствами
        super(props);
    }

    // Геттер для получения свойств страницы
    public get props() {
        return this._props as ILoginPageProps; // Возвращаем свойства как ILoginPageProps
    }

    // Метод для рендеринга страницы
    protected render(): string {
        const { currentUser } = this.props; // Деструктурируем текущего пользователя из свойств
        // Если текущий пользователь не определен, отображаем загрузчик
        if (currentUser === undefined)
            return `<div class="container container-center">
                 {{{Loader }}}
            </div>`;

        // Определение дочерних элементов формы
        const children: string = `
        {{{ InputShort label='Логин' type='text' name='login' validate=validate.login ref='login' }}}
        {{{ InputShort label='Пароль' type='password' name='password' validate=validate.password ref='password' }}}`;
        // Возвращаем HTML-код формы авторизации
        return (`
            <form class="container container-center">
                {{{ FormAccess 
                       desc="Вход" 
                       descOk="Авторизоваться" 
                       descCancel="Нет аккаунта?"                 
                       onClickOkButton=onLogin 
                       children="${children}" 
                       ref="formLogin" 
                       cancelLink="${BASE_URLS['page-sign-up']}"
                }}}
            </form>`);
    }
}

