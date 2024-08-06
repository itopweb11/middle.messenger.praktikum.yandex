import {IProps,Block} from "../../helpers/Block";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../modalTypes/IValidateType.ts";

interface IFormAccessProps extends IProps {
    desc: string,
    clickButton: (event:Event) => void,
    validate:IValidateType,
    clickRepealButton: (event:Event) => void,
    descOk: string,
    descCancel: string,
    children: string,
    onClickOk:(event:Event) => void,
    pageOk:string,
    pageCancel:string,
}
export class FormAccess extends Block {
    constructor(props:IFormAccessProps) {
        props.validate= ALL_VALIDATE_FIELDS;
        super(props);
    }

    protected render(): string {
        const {
            desc='Login',
            children='',
            clickRepealButton,
            descOk,
            descCancel,
            pageCancel
        }=this._props as IFormAccessProps;
        return(`
            <div class="container-form container-box-shadow">
            <h2 class="container-form__header">
                ${desc}
            </h2>
            <div>
                ${children}
            </div>
            <div class="container-form__buttons">
            
                {{{ 
                Button desc="${descOk}"  
                onClick=clickButton 
                }}}
                
                {{{ 
                Link desc="${descCancel}" 
                page="${pageCancel}" 
                onClick=${clickRepealButton} 
                }}}
                
                {{{
                Link desc="Чат"  
                type='success' 
                page="pageChat" 
                }}}
                
            </div>
        </div>
        `)
    }
}
