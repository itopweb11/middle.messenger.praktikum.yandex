import { IProps, Block } from "../../helpers/block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { signUp } from "../../services/auth.ts"; // Импортируем функцию для регистрации пользователя
import { IUser } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс IUser
import { BASE_URLS } from "../../config.ts"; // Импортируем базовые URL-адреса из конфигурации
import Router from "../../helpers/router.ts"; // Импортируем маршрутизатор

// Интерфейс для свойств страницы регистрации
export interface IPageRegistrationProps extends IProps {
    onLogin: (event: Event) => void; // Функция для обработки события входа
}

// Класс PageRegistration, который наследует от класса Block
export class PageRegistration extends Block {
    constructor() {
        // Определяем функцию для обработки события входа
        const onLogin = (event: Event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            // Получаем значения полей ввода
            const login = this.refs.form.getRefs()?.login.value();
            const email = this.refs.form.getRefs()?.email.value();
            const phone = this.refs.form.getRefs()?.phone.value();
            const first_name = this.refs.form.getRefs()?.first_name.value();
            const second_name = this.refs.form.getRefs()?.second_name.value();
            const password = this.refs.form.getRefs()?.password.value();
            const password2 = this.refs.form.getRefs()?.password2.value();

            // Проверяем, совпадают ли введенные пароли
            if (password !== password2) {
                alert('Повторите правильный пароль!'); // Выводим сообщение об ошибке
                return; // Выходим из функции
            }

            // Создаем объект с данными пользователя
            const data = { first_name, second_name, login, email, password, phone } as IUser;

            // Проверяем, заполнены ли все поля
            if (Object.values(data).findIndex(value => value === '') === -1) {
                // Если все поля заполнены, вызываем функцию signUp для регистрации пользователя
                signUp(data).then(() => Router.getRouter().go(BASE_URLS['page-chat'])) // Переходим на страницу чата после успешной регистрации
                    .catch((error) => console.log('login', error)); // Обрабатываем ошибки регистрации
            }
        };

        // Определяем свойства для страницы регистрации
        const props: IPageRegistrationProps = {
            events: {
                submit: async (event: Event) => { await onLogin(event); } // Устанавливаем обработчик события submit
            },
            onLogin: onLogin // Передаем функцию onLogin в свойства
        };

        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Метод для получения содержимого формы регистрации
    getChildren() {
        return (
            `{{{ InputShort label='Почта' type='email' name='email' validate=validate.email ref='email' }}}
            {{{ InputShort label='Логин' type='text' name='login' validate=validate.login ref='login' }}}
            {{{ InputShort label='Имя' type='first_name' name='first_name' validate=validate.name ref='first_name' }}}
            {{{ InputShort label='Фамилия' name='second_name' validate=validate.name ref='second_name' }}}
            {{{ InputShort label='Телефон'  name='phone' validate=validate.phone ref='phone' }}}
            {{{ InputShort label='Пароль' type='password' name='password' validate=validate.password ref='password' }}}
            {{{ InputShort label='Пароль (ещё раз)' type='password' name='password2' validate=validate.password ref='password2' }}}`
        );
    }

    // Метод для рендеринга содержимого страницы
    protected render(): string {
        return (`
            <form class="container container-center">
                {{{ FormAuth 
                    desc="Регистрация"
                    captionForm="Зарегистрироваться"
                    captionCancel="Войти"
                    pageOk="allPages"
                    pageCancel="loginPage"
                    clickButton=onLogin
                    children="${this.getChildren()}"
                    ref="form"
                    cancelLink="${BASE_URLS['page-login']}"
                }}}
            </form>`)
    }
}