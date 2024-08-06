import {IProps,Block} from "../../helpers/Block.ts";
import {mockUser} from "../../testData/user-testData.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";

export interface IPageProfileProps extends IProps {
    user:IUser
}
export class PageProfile extends Block {
    constructor() {
        const props:IPageProfileProps= {
            events: {},
            user: mockUser,
        }
        super(props);
    }

    getChildren() {
        const {email,login,first_name,second_name,display_name,phone}=(this._props as IPageProfileProps).user;
        return (
            `{{{ InputProfile label='Почта' type='email' name='email' validate=validate.email ref='email' readOnlyMode=true value='${email}' }}}
            {{{ InputProfile label='Логин' type='text' name='login' validate=validate.login ref='login' readOnlyMode=true value='${login}'  }}}
            {{{ InputProfile label='Имя' type='first_name' name='first_name' validate=validate.name ref='first_name' readOnlyMode=true value='${first_name}'  }}}
            {{{ InputProfile label='Фамилия' name='second_name' validate=validate.name ref='second_name' readOnlyMode=true value='${second_name}'  }}}
            {{{ InputProfile label='Имя в чате' name='display_name' validate=validate.name ref='display_name' readOnlyMode=true  value='${display_name}' }}}
            {{{ InputProfile label='Телефон'  name='phone' validate=validate.phone ref='phone' readOnlyMode=true  value='${phone}' }}}
            `
        )
    }

    protected render(): string {
        return (`
            <form class="container">
                {{{ 
                FormProfile 
                user=user 
                withButton=false  
                children="${this.getChildren()}" 
                ref="form" 
                buttonPage='pageChat' 
                }}}
            </form>`)
    }
}
