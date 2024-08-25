import {IProps, Block} from "../../helpers/Block.ts";
import {IChatMessage, IUser, IChat} from "../../modalTypes/modalTypes.ts";
import {validateMessage} from "../../utils/validates.utils.ts";
import {sendMessage} from "../../services/send-message.ts";
import {showAlert} from "../../utils/api.utils.ts";


interface IMessageListProps extends IProps {
    messageList: IChatMessage[];
    currentUser: IUser;
    currentChat: IChat|null;
    onBlurMessage?: () => void;
    message?: string;
    onClickSend?: () => void;
    openMenuMessage?: () => void;
    openMenuChat?: () => void;
    isOpenedMenuMessage: boolean;
    isOpenedMenuChat: boolean;
}

export class MessageListFooter extends Block {
    constructor(props: IMessageListProps) {
        props.isOpenedMenuMessage = false;
        //props.onBlurMessage = () => this.validate();
        props.onClickSend = () => {
            const error=validateMessage(this.valueMessage());
            if (!error) {

                sendMessage( this.valueMessage());
            }
            else showAlert(error);
        }
        props.openMenuMessage = () => {
            this.props.isOpenedMenuMessage = !this.props.isOpenedMenuMessage;
            this.setProps(this.props);
        }
        props.events={
            submit:(event: Event)=>{
                event.stopPropagation();
                event.preventDefault();
                console.log('submit')
                this.props.onClickSend&&this.props.onClickSend();
            }
        }
        super(props);
    }

    public get props() {
        return this._props as IMessageListProps;
    }

    public valueMessage() {
        return this.refs?.message.value();
    }

    protected render(): string {
        const { message = '',isOpenedMenuMessage} = this.props;

        return (`
                <form class="message-list__footer">
                    {{{ MenuMessage isOpenedMenu=${isOpenedMenuMessage } closeMenu=openMenuMessage}}}
                    {{{ Button type="paperclip" onClick=openMenuMessage}}}
                    {{{ Input 
                        ref="message"
                        type="text" 
                        classes="message-list__footer__input" 
                        value='${message}'
                        placeholder="Message" 
                        name="message"
                        onBlur=onBlurMessage
                    }}}
                    {{{ Button type="arrow"  isSubmit=true}}}
                </form>
        `)
    }
}
