import {IProps,Block} from "../../helpers/Block";
import {IUser} from "../../modalTypes/modalTypes.ts";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../modalTypes/IValidateType.ts";

interface IFormProfile extends IProps{
    user:IUser,
    validate:IValidateType,
    clickButton: (event:Event) => void,
    withButton:boolean,
    buttonPage:string,
    children: string,
    buttonText:string,
    buttonCancelPage:string,

}
export class FormProfile extends Block {
    constructor(props:IFormProfile) {
        props.validate= ALL_VALIDATE_FIELDS;
        super(props);
    }

    protected render(): string {
        const {
            user,
            withButton=false,
            children='',
            buttonText='',
        }=this._props as IFormProfile;
        const {
            avatar,
            first_name,
            second_name
        }=user;

        return(`
        <div class="profile">
            <div class="profile__avatar">
                {{{ Avatar image=${avatar} AvatarLoading=true }}}
                <h2 class="profile__avatar__name">
                    ${first_name} ${second_name}
                </h2>
            </div>
            ${user ?
            `<div class = "profile__main" >
                ${children}
            </div>`:''
            }
             ${withButton ?
                `<div class="profile__button">
                    {{{ Button desc="${buttonText}" onClick=clickButton }}}
                    {{{Link desc="Выйти" page="pageChat" type='danger' }}}
                </div>`:            
                `<div class="profile__buttons">
                    {{{Link desc="Изменить данные" page="profileEdit" type='success' linkLine=true  }}}
                    {{{Link desc="Изменить пароль" page="passwordEdit" type='success' linkLine=true  }}}
                    {{{Link desc="Выйти" page="pageChat" type='danger' }}}
                </div>`}
            </div>
            
        `)
    }
}
