import {IProps, Block} from "../../helpers/Block.ts";
import modalController from "../../helpers/modal-controller.ts";

interface IModalPromptProps extends IProps {
    caption: string,
    labelText: string,
    okText: string,
    okClick?: (result:string) => void,
    okInputClick?: (event:Event) => void,
    cancelClick?: () => void,
    ref?:string
}

export class ModalPrompt extends Block {
    constructor(props: IModalPromptProps) {
        props.okInputClick = (event:Event) => {
            event.preventDefault();
            const input = this.refs.modal.getRefs().input.value();
            if (!input) {
                return;
            }
            this.props.okClick&&this.props.okClick(input);
            modalController.closeModal();
        }
        props.cancelClick = () => {
            modalController.closeModal();
        }


        super({
            ...props
        })
    }


    public get props() {
        return this._props as IModalPromptProps;
    }

    getChildren() {
        const {labelText = ''} = this.props;
        return (
            `
                {{{ InputShort label='${labelText}' type='text' name='input' validate=validate.nameChat ref='input' }}}             
            `
        )
    }

    protected render(): string {
        return (`
                 {{{  Modal 
                         caption='${this.props.caption}' 
                         okText='${this.props.okText}' 
                         cancelText='Cancel' 
                         okClick=okInputClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                         ref='modal'
                 }}}
        `)
    }
}
