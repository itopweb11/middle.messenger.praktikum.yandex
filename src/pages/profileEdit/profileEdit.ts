import {IProps,Block} from "../../helpers/Block.ts";
import {mockUser} from "../../testData/user-testData.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";
import {IPageProfileProps} from "../Profile/Profile.ts";

export interface IProfileEdit extends IProps {
    onChange:(event:Event)=>void,
    user:IUser
}
export class ProfileEdit extends Block {
    constructor() {
        const props:IProfileEdit={
            events:{},
            user:mockUser,
            onChange: (event: Event) => {
                event.preventDefault();
                const login = this.refs.form.getRefs()?.login.value();
                const email = this.refs.form.getRefs()?.email.value();
                const phone = this.refs.form.getRefs()?.phone.value();
                const first_name = this.refs.form.getRefs()?.first_name.value();
                const second_name = this.refs.form.getRefs()?.second_name.value();
                const display_name = this.refs.form.getRefs()?.display_name.value();

                console.log({
                    login,
                    second_name,
                    first_name,
                    display_name,
                    phone,
                    email
                })
            }
        }
        super(props);
    }

    getChildren() {
        const {email,login,first_name,second_name,display_name,phone}=(this._props as IPageProfileProps).user;
        return (
            `{{{ InputProfile label='Почта' type='email' name='email' validate=validate.email ref='email' readOnlyMode=false value='${email}' }}}
            {{{ InputProfile label='Логин' type='text' name='login' validate=validate.login ref='login' readOnlyMode=false value='${login}'  }}}
            {{{ InputProfile label='Имя' type='first_name' name='first_name' validate=validate.name ref='first_name' readOnlyMode=false value='${first_name}'  }}}
            {{{ InputProfile label='Фамилия' name='second_name' validate=validate.name ref='second_name' readOnlyMode=false value='${second_name}'  }}}
            {{{ InputProfile label='Имя в чате in Chat' name='display_name' validate=validate.name ref='display_name' readOnlyMode=false  value='${display_name}' }}}
            {{{ InputProfile label='Телефон'  name='phone' validate=validate.phone ref='phone' readOnlyMode=false  value='${phone}' }}}
            `
        )
    }

    protected render(): string {
        return (`
            <form class="container">
            
                {{{ 
                FormProfile 
                user=user 
                withButton=true  
                children="${this.getChildren()}" 
                ref="form" 
                buttonPage='pageProfile' 
                clickButton=onChange 
                buttonText='Сохранить' 
                }}}
            </form>`)
    }
}
