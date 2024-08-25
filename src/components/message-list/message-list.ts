import {IProps, Block} from "../../helpers/Block.ts";
import {IChatMessage} from "../../modalTypes/modalTypes.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";
import {Message} from "../index.ts";
import {IMessageProps} from "../message/message.ts";
import {IChat} from "../../modalTypes/modalTypes.ts";
import {StoreEvents} from "../../helpers/store.ts";
import {getUserName} from "../../utils/user.utils.ts";

interface IMessageListProps extends IProps {
    messageList: IChatMessage[];
    currentUser: IUser|null;
    currentChat: IChat | null;
    openMenuMessage?: () => void;
    openMenuChat?: () => void;
    isOpenedMenuChat: boolean;
}

export class MessageList extends Block {
    constructor(props: IMessageListProps) {
        props.currentChat = window.store.getState().currentChat;
        props.messageList = window.store.getState().currentChat?.messages || [];
        super(props);
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user||null;
            this.props.messageList = window.store.getState().currentChat?.messages || [];
            this.props.currentChat = window.store.getState().currentChat;
            this.setProps(this.props);
        });
    }

    public get props() {
        return this._props as IMessageListProps;
    }

    getListMessages(list: IChatMessage[]): string {
        const users = this.props.currentChat?.users;
        const mapUsers = new Map();
        if (users) {
            users.forEach(user => mapUsers.set(user.id, getUserName(user)));
        }

        if (!list || list.length === 0) return '';
        return list.map(message => {

            const messageBlock = new Message({
                userName: mapUsers.size ? mapUsers.get(message.user_id) : '',
                message: message,
                myMessages: String(message.user_id) === String(this.props.currentUser?.id)
            } as IMessageProps)
            return (`
            <div class="message-list__main__message">
                ${messageBlock.renderForList()}
                </div>
            `)
        }).join('')
    }

    protected render(): string {
        const {messageList, currentChat, currentUser} = this.props;
        if (!currentChat)
            return (`<div class="message-list__empty">
                        ${currentUser?`<p class="">Select a chat to write a message</p>`:``}
                    </div>`)
        const users = currentChat.users?.length || 0;
        return (`
           <div class="message-list">
              {{{ MessageListHeader }}}
              ${users > 1 ?
            ` <ul class="message-list__main">
                    ${this.getListMessages(messageList)}        
                    <li class="scroll-bottom"></li>           
                    </ul>                    
                     {{{MessageListFooter }}}
                ` :
            `<div class="message-list__empty">
                     <p class="">Add users to chat</p>
                </div>`
        }
               
            </div>
        `)
    }
}
