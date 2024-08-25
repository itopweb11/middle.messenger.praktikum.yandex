import {IProps,Block} from "../../helpers/Block";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../modalTypes/modalTypes.ts";

interface IModalProps extends IProps {
    modalCancelText: string,
    desc: string,
    modalText: string,
    modalCancelClick: () => void,
    modalClick: (event: Event) => void,
    children?: string,
    validate?: IValidateType,
}

export class Modal extends Block {
    constructor(props: IModalProps) {
        props.validate= ALL_VALIDATE_FIELDS;
        super({
            ...props,
            events:{
                submit:(event: Event)=>{
                    event.stopPropagation();
                    event.preventDefault();
                    this.props.modalClick(event);
                }
            }
        })
        }
    public get props(){return this._props as IModalProps;}
    protected render(): string {
        const {  desc='',modalText='',modalCancelText='',children=''} = this.props;
        return (`
                <form class="modal " >
                    <h2 class="modal__header">
                        ${desc}
                    </h2>
                     <div>
                        ${children}
                    </div>
                    <div class="modal__footer">
                        {{{ Button caption="${modalText}" onClick=okClick isSubmit=true}}}
                        {{{ Button caption="${modalCancelText}" onClick=cancelClick type='link'}}}
                    </div>
                </form>
        `)
    }
}
