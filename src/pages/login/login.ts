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
                {{{ FormAccess desc="Вход" descOk="Авторизоваться" descCancel="Нет аккаунта?" pageOk="allPages" pageCancel="pageRegistration" clickButton=onLogin children="${children}" ref="formLogin" }}}
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

