import {IProps,Block} from "../../helpers/Block.ts";
import {mockUser} from "../../testData/user-testData.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";

export interface IPasswordEdit extends IProps {
    onChange:(event:Event)=>void,
    user:IUser
}
export class PasswordEdit extends Block {

    constructor() {
        const props:IPasswordEdit={
            events:{},
            user:mockUser,
            onChange: (event: Event) => {

                event.preventDefault();
                const oldPassword = this.refs.form.getRefs()?.oldPassword.value();
                const newPassword = this.refs.form.getRefs()?.newPassword.value();
                const repeatPassword = this.refs.form.getRefs()?.repeatPassword.value();

                console.log({
                    oldPassword,
                    newPassword,
                    repeatPassword,
                })
            }
        }

        super(props);

    }

    getChildren() {
        return (
            `{{{ InputProfile label='Старый пароль' type='password' name='oldPassword' validate=validate.password ref='oldPassword' readOnlyMode=false  }}}
            {{{ InputProfile label='Новый пароль' type='password' name='newPassword' validate=validate.password ref='newPassword' readOnlyMode=false  }}}
            {{{ InputProfile label='Повторите новый пароль' type='password' name='repeatPassword' validate=validate.password ref='repeatPassword' readOnlyMode=false }}}
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
