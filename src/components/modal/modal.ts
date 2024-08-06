import {IProps,Block} from "../../helpers/Block";

interface IModalProps extends IProps {
    modalCancelText: string,
    desc: string,
    modalText: string,
    modalCancelClick: () => void,
    modalClick: () => void,
}

export class Modal extends Block {
    constructor(props: IModalProps) {super(props);}
    public get props(){return this._props as IModalProps;}
    protected render(): string {
        const {  desc='',modalText='',modalCancelText=''} = this.props;
        return (`
            <form class="modal-background">
                <div class="modal container-box-shadow ">
                    <h2 class="modal__header">${desc}</h2>
                    <div class="modal__footer">
                         {{{ Button desc="${modalText}" onClick=modalClick }}}
                        {{{ Button desc="${modalCancelText}" onClick=modalCancelClick }}}
                    </div>
                </div>
            </form>
        `)
    }
}
