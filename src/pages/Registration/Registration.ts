/*import {IProps,Block} from "../../helpers/Block.ts";
import {BASE_URLS} from "../../config.ts";


export interface IPageRegistrationProps extends IProps {
    onLogin:(event:Event)=>void,
}
export class PageRegistration extends Block {
    constructor() {
        const props:IPageRegistrationProps={
            events:{},
            onLogin:  (event: Event) => {
                event.preventDefault();
                const login = this.refs.form.getRefs()?.login.value();
                const email = this.refs.form.getRefs()?.email.value();
                const phone = this.refs.form.getRefs()?.phone.value();
                const first_name = this.refs.form.getRefs()?.first_name.value();
                const second_name = this.refs.form.getRefs()?.second_name.value();
                const password = this.refs.form.getRefs()?.password.value();
                const password2 = this.refs.form.getRefs()?.password2.value();

                console.log({
                    login,
                    password,
                    password2,
                    second_name,
                    first_name,
                    phone,
                    email,
                    props
                })
            }
        }

        super(props);

    }

    getChildren() {
        return (
            `{{{ InputShort label='Почта' type='email' name='email' validate=validate.email ref='email' }}}
            {{{ InputShort label='Логин' type='text' name='login' validate=validate.login ref='login' }}}
            {{{ InputShort label='Имя' type='first_name' name='first_name' validate=validate.name ref='first_name' }}}
            {{{ InputShort label='Фамилия' name='second_name' validate=validate.name ref='second_name' }}}
            {{{ InputShort label='Телефон'  name='phone' validate=validate.phone ref='phone' }}}
            {{{ InputShort label='Пароль' type='password' name='password' validate=validate.password ref='password' }}}
            {{{ InputShort label='Пароль (ещё раз)' type='password' name='password2' validate=validate.password ref='password2' }}}`
        )
    }

    protected render(): string {

        return (`
            <form class="container container-center">
                {{{ FormAccess 
                desc="Регистрация" 
                descOk="Зарегистрироваться" 
                descCancel="Войти" 
                pageOk="allPages" 
                pageCancel="loginPage" 
                clickButton=onLogin 
                children="${this.getChildren()}" 
                ref="form"
                cancelLink="${BASE_URLS['page-login']}" 
                }}}
            </form>`)
    }
}*/


import {IProps, Block} from "../../helpers/Block.ts";
import {signUp} from "../../services/auth.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";
import {BASE_URLS} from "../../config.ts";
import Router from "../../helpers/router.ts";

export interface IPageRegistrationProps extends IProps {
    onLogin: (event: Event) => void,
}

export class PageRegistration extends Block {
    constructor() {
        const onLogin = (event: Event) => {
            event.preventDefault();
            const login = this.refs.form.getRefs()?.login.value();
            const email = this.refs.form.getRefs()?.email.value();
            const phone = this.refs.form.getRefs()?.phone.value();
            const first_name = this.refs.form.getRefs()?.first_name.value();
            const second_name = this.refs.form.getRefs()?.second_name.value();
            const password = this.refs.form.getRefs()?.password.value();
            const password2 = this.refs.form.getRefs()?.password2.value();
            if (password !== password2) {
                alert('Повторите правильный пароль!');
                return;
            }
            const data = {
                first_name,
                second_name,
                login,
                email,
                password,
                phone
            } as IUser;
            if (Object.values(data).findIndex(value => value === '') === -1) {
                signUp(data)
                    .then(() => Router.getRouter().go(BASE_URLS['page-chat']))
                    .catch((error) => console.warn('Зарегистрироваться', error));

            }

        }
        const props: IPageRegistrationProps = {
            events: {
                submit: async (event: Event) => {
                    await onLogin(event);
                }
            },
            onLogin: onLogin
        }

        super(props);

    }

    getChildren() {
        return (
            `{{{ InputShort label='Почта' type='email' name='email' validate=validate.email ref='email' }}}
            {{{ InputShort label='Логин' type='text' name='login' validate=validate.login ref='login' }}}
            {{{ InputShort label='Имя' type='first_name' name='first_name' validate=validate.name ref='first_name' }}}
            {{{ InputShort label='Фамилия' name='second_name' validate=validate.name ref='second_name' }}}
            {{{ InputShort label='Телефон'  name='phone' validate=validate.phone ref='phone' }}}
            {{{ InputShort label='Пароль' type='password' name='password' validate=validate.password ref='password' }}}
            {{{ InputShort label='Пароль (ещё раз)' type='password' name='password2' validate=validate.password ref='password2' }}}`
        )
    }

    protected render(): string {

        return (`
            <form class="container container-center">
                {{{ FormAccess 
                desc="Регистрация" 
                descOk="Зарегистрироваться" 
                descCancel="Войти" 
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
