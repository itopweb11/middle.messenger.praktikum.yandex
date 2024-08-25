/*
import {IProps,Block} from "../../helpers/Block";

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
*/


import {IProps,Block} from "../../helpers/Block.ts";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../modalTypes/modalTypes.ts";

interface IFormAuthProps extends IProps {
    desc: string,
    children: string,
    onClickOkButton: (event:Event) => void,
    onClickCancelButton: (event:Event) => void,
    descOk: string,
    descCancel: string,
    validate:IValidateType,
    cancelLink:string
}
export class FormAccess extends Block {
    constructor(props:IFormAuthProps) {
        props.validate= ALL_VALIDATE_FIELDS;
        super(props);
    }

    protected render(): string {
        const {desc='Login',children='',descOk,descCancel,cancelLink}=this._props as IFormAuthProps;
        return(`
            <div class="container-form container-box-shadow">
            <h2 class="container-form__header">
                ${desc}
            </h2>
            <div>
                ${children}
            </div>
            <div class="container-form__buttons">
                {{{ Button desc="${descOk}"  onClick=onClickOkButton isSubmit=true}}}
                {{{ Link desc="${descCancel}" href="${cancelLink}" }}}
            </div>
        </div>
        `)
    }
}

