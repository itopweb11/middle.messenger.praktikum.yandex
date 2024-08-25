import {IProps, Block} from "../../helpers/Block.ts";
import {IChat} from "../../modalTypes/modalTypes.ts";
import {StoreEvents} from "../../helpers/store.ts";

interface IMessageListProps extends IProps {
    currentChat: IChat|null;
    openMenuMessage?: () => void;
    openMenuChat?: () => void;
    isOpenedMenuChat: boolean;
}

export class MessageListHeader extends Block {
    constructor(props: IMessageListProps) {
        props.isOpenedMenuChat = false;
        props.currentChat = window.store.getState().currentChat;
        props.openMenuChat = () => {
            this.props.isOpenedMenuChat = !this.props.isOpenedMenuChat;
            this.props.currentChat = window.store.getState().currentChat;
            this.setProps(this.props);
        }
        super(props);

        window.store.on(StoreEvents.Updated, () => {
            this.props.currentChat=window.store.getState().currentChat;
            this.setProps(this.props);
        });
    }

    public get props() {
        return this._props as IMessageListProps;
    }

    protected render(): string {
        const {isOpenedMenuChat,currentChat} = this.props;
        const countUsers=currentChat?.users?.length||1;
        if(!currentChat)return '';
        const {avatar,title} = currentChat;
        return (`
                <div class="message-list__header">
                    <div class="message-list__header__avatar">
                        {{{ Avatar imageUrl='${avatar||''}' size='sm' }}}
                        <div class="message-list__header__title">
                            <span>${title}</span>
                            <p>${countUsers+' members'}</p>
                        </div>
                    </div>
                    {{{ Button type="dots" onClick=openMenuChat}}}
                    {{{ MenuChat isOpenedMenu=${isOpenedMenuChat } closeMenu=openMenuChat}}}
                </div>

        `)
    }
}
