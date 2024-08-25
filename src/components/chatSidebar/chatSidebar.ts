import {IProps,Block} from "../../helpers/Block";
import {IChat, IUser} from "../../modalTypes/modalTypes.ts";
import modalController from "../../helpers/modal-controller.ts";
import {createChat} from "../../services/chat.ts";
import {setStateCurrentChat, updateChats} from "../../services/app.ts";
import ModalPrompt from "../modal-prompt";
import {StoreEvents} from "../../helpers/store.ts";

interface ChatSidebarProps extends IProps {
    list: IChat[],
    currentUser: IUser | null,
    showModalAddChat: () => void,
    setCurrentChat: (chat: string) => void
}

export class ChatSidebar extends Block {
    constructor(props: ChatSidebarProps) {
        props.currentUser = window.store.getState().user||null;
        props.list = window.store.getState().chats || [];
        props.showModalAddChat = () => {
            modalController.addModal((new ModalPrompt({
                caption: 'Add Chat',
                labelText: 'Title Chat',
                okText: 'Add Chat',
                ref: "modal",
                okClick: (result: string) => {
                    createChat(result)
                        .then(async () => await updateChats())
                        .catch((error) => console.warn(error));
                },
            })) as unknown as Block);
            modalController.openModal();
        }
        props.setCurrentChat = (id: string) => {
            const chat = this.props.list.find(item => item.id === Number(id)) || null;
            setStateCurrentChat(chat).then(() => {
                this.setProps(this.props)
            })
        }


        super({
            ...props
        })

        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user||null;
            this.props.list = window.store.getState().chats || [];
            this.setProps(this.props);
        });
    }

    public get props() {
        return this._props as ChatSidebarProps;
    }

   getChats(list:IChat[]):string{
       if (!list || list.length === 0) return `<li class="chat-list__chats-empty">{{{Button caption="Add chat" type='link' onClick=showModalAddChat }}}</li>`;
       return list.map(chat => {
           return (`  {{{ChatItem 
                    onClick=setCurrentChat 
                    id='${chat.id} '
                    title='${chat.title} '
                    avatar='${chat.avatar} '
                    unread_count='${chat.unread_count > 0 ? String(chat.unread_count) : ''}'
                    last_message_content='${chat.last_message ? chat.last_message.content : 'no messages'} '
                    last_message_time='${chat.last_message ? chat.last_message.time : ''}' }}} `)
       }).join('')
    }
    protected render(): string {
        const {list, currentUser} = this.props;
        if (!currentUser) return `
            <div class="container container-center">
                 {{{Loader }}}
            </div>`

        return (`            
            <div class="chatSidebar">
                <nav class="chatSidebar__header">
                   ${currentUser && `{{{ Avatar imageUrl='${currentUser.avatar || ''}' size='sm' }}}`}
                {{{Button caption="New Chat" type='link' onClick=showModalAddChat }}}
                 {{{Link caption="Profile" href="/settings"  linkIcon=true }}}
                </nav>
                <!--<div class="chatSidebar__search">
                    {{{ 
                    InputSearch 
                    }}}
                </div>-->
                <ul class="chatSidebar__chats">
                    ${this.getChats(list)}
                </ul>
            </div>
        `)
    }
}

