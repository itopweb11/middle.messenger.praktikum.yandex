import { IProps, Block } from "../../helpers/Block.ts"; // Импортируем интерфейс IProps и класс Block из основной библиотеки
import { IUser } from "../../modalTypes/modalTypes.ts"; // Импортируем интерфейс IUser
import { StoreEvents } from "../../helpers/store.ts"; // Импортируем события хранилища
import { UserPassword, UserProfile } from "../../services/userSettings.ts"; // Импортируем функции для обновления пароля и профиля пользователя
import Router from "../../helpers/router.ts"; // Импортируем маршрутизатор

// Интерфейс для свойств страницы профиля
export interface IPageProfile extends IProps {
    onChangeStateForm: (isEditPassword: boolean, isEditProfile: boolean) => void; // Функция для изменения состояния формы
    onChangeProfile: (event: Event) => void; // Функция для обновления профиля
    isEditProfile?: boolean; // Флаг, указывающий, находится ли пользователь в режиме редактирования профиля
    onChangePassword: (event: Event) => void; // Функция для изменения пароля
    onCancel: () => void; // Функция для отмены действий
    user?: IUser | null; // Текущий пользователь
    isEditPassword?: boolean; // Флаг, указывающий, находится ли пользователь в режиме редактирования пароля
}

// Класс PageProfile, который наследует от класса Block
export class PageProfile extends Block {
    constructor() {
        // Определяем свойства для страницы профиля
        const props: IPageProfile = {
            user: window.store.getState().user, // Получаем текущего пользователя из хранилища
            events: {
                submit: (event: Event) => { // Обработчик события submit
                    if (this.props.isEditPassword) { this.props.onChangeProfile(event) } // Если редактируется пароль, вызываем onChangeProfile
                    if (this.props.isEditProfile) { this.props.onChangeProfile(event) } // Если редактируется профиль, вызываем onChangeProfile
                }
            },
            onCancel: () => { // Функция для отмены действий
                if (this.props.isEditProfile || this.props.isEditPassword) { // Если редактируется профиль или пароль
                    this.props.onChangeStateForm(false, false); // Изменяем состояние формы на false
                    return;
                }
                Router.getRouter().back(); // Возвращаемся на предыдущую страницу
            },
            onChangeStateForm: (isEditPassword: boolean, isEditProfile: boolean) => { // Функция для изменения состояния формы
                this.props.isEditProfile = isEditProfile; // Устанавливаем флаг редактирования профиля
                this.props.isEditPassword = isEditPassword; // Устанавливаем флаг редактирования пароля
                this.setProps(this.props); // Обновляем свойства компонента
            },
            onChangePassword: async (event: Event) => { // Функция для изменения пароля
                event.preventDefault(); // Предотвращаем стандартное поведение формы
                const oldPassword = this.refs.form.getRefs()?.oldPassword.value(); // Получаем старый пароль
                const newPassword = this.refs.form.getRefs()?.newPassword.value(); // Получаем новый пароль
                const repeatPassword = this.refs.form.getRefs()?.repeatPassword.value(); // Получаем повторение нового пароля

                // Проверяем, совпадают ли новый пароль и его повторение
                if (newPassword !== repeatPassword) alert('Repeat new password correct!');
                if (oldPassword && newPassword && newPassword === repeatPassword) {
                    try {
                        await UserPassword({ oldPassword, newPassword }); // Обновляем пароль пользователя
                        this.props.onChangeStateForm(false, false); // Изменяем состояние формы на false
                    } catch (e) { console.log(e) }
                }
            },
            onChangeProfile: async (event: Event) => { // Функция для обновления профиля
                event.preventDefault(); // Предотвращаем стандартное поведение формы
                const login = this.refs.form.getRefs()?.login.value(); // Получаем логин
                const email = this.refs.form.getRefs()?.email.value(); // Получаем email
                const phone = this.refs.form.getRefs()?.phone.value(); // Получаем телефон
                const first_name = this.refs.form.getRefs()?.first_name.value(); // Получаем имя
                const second_name = this.refs.form.getRefs()?.second_name.value(); // Получаем фамилию
                const display_name = this.refs.form.getRefs()?.display_name.value(); // Получаем отображаемое имя

                // Создаем объект с данными пользователя
                const userData: IUser = { login, second_name, first_name, display_name, phone, email }
                if (login && first_name && second_name && phone && email) {
                    try {
                        await UserProfile(userData); // Обновляем профиль пользователя
                        this.props.onChangeStateForm(false, false); // Изменяем состояние формы на false
                    } catch (e) { console.log(e) }
                }
            }
        };

        // Подписываемся на события обновления хранилища
        window.store.on(StoreEvents.Updated, () => {
            this.props.user = window.store.getState().user; // Обновляем текущего пользователя из хранилища
            this.setProps(this.props); // Устанавливаем обновленные свойства
        });

        super(props); // Вызываем конструктор родительского класса с переданными свойствами
    }

    // Геттер для получения свойств компонента
    public get props() {
        return this._props as IPageProfile; // Приводим _props к типу IPageProfile
    }

    // Метод для получения содержимого формы редактирования пароля
    getChildrenPassword() {
        return (
            `{{{ InputWide label='Старый пароль' type='password' name='oldPassword' validate=validate.password ref='oldPassword' readOnly=false  }}}
            {{{ InputWide label='Новый пароль' type='password' name='newPassword' validate=validate.password ref='newPassword' readOnly=false  }}}
            {{{ InputWide label='Повторите новый пароль' type='password' name='repeatPassword' validate=validate.password ref='repeatPassword' readOnly=false }}}
            `
        );
    }

    // Метод для получения содержимого формы редактирования профиля
    getChildrenEditProfile() {
        const {
            user,
            isEditProfile = false
        } = this.props;
        if (!user) return ''
        const {
            email,
            login,
            first_name,
            second_name,
            display_name,
            phone
        } = user;
        return (
            `{{{ InputWide label='Почта' type='email' name='email' validate=validate.email ref='email' readOnly=${!isEditProfile} value='${email}' }}}
            {{{ InputWide label='Логин' type='text' name='login' validate=validate.login ref='login' readOnly=${!isEditProfile} value='${login}'  }}}
            {{{ InputWide label='Имя' type='first_name' name='first_name' validate=validate.name ref='first_name' readOnly=${!isEditProfile} value='${first_name}'  }}}
            {{{ InputWide label='Фамилия' name='second_name' validate=validate.name ref='second_name' readOnly=${!isEditProfile} value='${second_name}'  }}}
            {{{ InputWide label='Имя в чате' name='display_name' validate=validate.displayName ref='display_name' readOnly=${!isEditProfile}  value='${display_name || ''}' }}}
            {{{ InputWide label='Телефон'  name='phone' validate=validate.phone ref='phone' readOnly=${!isEditProfile}  value='${phone}' }}}
            `
        );
    }

    // Метод для рендеринга содержимого страницы
    protected render(): string {
        const {
            user,
            isEditProfile = false,
            isEditPassword = false
        } = this.props;
        if (!user) return (` <div class="container container-center">{{{Loader }}}</div>`);
        return (`
            <form class="container">
                {{{ FormProfile user=user 
                    withButton=${isEditProfile || isEditPassword}  
                    children="${isEditPassword ? this.getChildrenPassword() : this.getChildrenEditProfile()}"
                    ref="form"
                    onChangeStateForm=onChangeStateForm
                    onCancel=onCancel
                    ${isEditProfile ? `clickButton=onChangeProfile buttonText='Сохранить' ` :
            isEditPassword ? `clickButton=onChangePassword buttonText='Сохранить'` : ''
        }     
                }}}
            </form>`);
    }
}