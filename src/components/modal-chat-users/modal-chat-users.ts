import {IProps, Block} from "../../helpers/Block.ts";
import modalController from "../../helpers/modal-controller.ts";
import {searchUsersByLogin} from "../../services/user-settings.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";
import {UserItem} from "../index.ts";
import {addChatUser, deleteChatUsers} from "../../services/chat.ts";
import {setStateCurrentChat} from "../../services/app.ts";
import {showModalAlert} from "../../utils/api.utils.ts";

interface IModalChatUsersProps extends IProps {
    okClick?: (result: string) => void,
    okInputClick?: (event: Event) => void,
    cancelClick?: () => void,
    ref?: string,
    type: 'add' | 'delete',
    users: IUser[] | null
}

export class ModalChatUsers extends Block {
    constructor(props: IModalChatUsersProps) {
        props.okInputClick = (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            if (this.props.type === 'add') {
                const input = this.refs.modal.getRefs().input.value();
                if (!input) {
                    return;
                }
                searchUsersByLogin(input).then((users) => {
                    if (!users || users.length === 0) {
                        showModalAlert('Not Found users')
                    }
                    this.props.users = users;
                    this.setProps(this.props)
                }).catch(error => console.warn(error))
            } else modalController.closeModal();

        }
        props.cancelClick = () => {
            modalController.closeModal();
        }


        super({
            ...props,
            events: {
                click: (e: Event) => {
                    e.stopPropagation();
                    const id = (e.target as HTMLElement).id;
                    const chat = window.store.getState().currentChat;
                    if (chat && id && props.type === 'add') {
                        addChatUser({
                            users: [Number(id)],
                            chatId: chat.id
                        }).then(() => {
                            setStateCurrentChat(chat).then(() => modalController.closeModal());
                        })
                            .catch((error) => console.warn(error));
                    }
                    if (props.type === 'delete' && chat) {
                        deleteChatUsers({
                            users: [Number(id)],
                            chatId: chat.id
                        }).then(() => {
                            setStateCurrentChat(chat).then(() => modalController.closeModal());
                        }).catch((error) => console.warn(error));
                    }
                }
            }
        })
    }


    public get props() {
        return this._props as IModalChatUsersProps;
    }

    getChildren() {
        const {users, type} = this.props;
        const result = users && users.length > 1 ? users.reduce((sum, user) => {
            const item = new UserItem({user: user, icon: type === 'add' ? 'plus' : 'delete'});
            return sum + item.renderForList();
        }, '') : '';
        return (
            `
                ${type === 'add' ?
                `{{{ InputShort label='Login' type='text' name='input' validate=validate.login ref='input' }}} ` : ''}
                 
                <div class='modal-users'>${result}</div>                        
            `
        )
    }

    protected render(): string {
        return (`
                 {{{  Modal 
                         caption='${this.props.type === 'add' ? 'Add User' : 'Delete User'}' 
                         okText='${this.props.type === 'add' ? 'Find users' : 'OK'}'
                         cancelText='${this.props.type === 'add' ? 'Cancel' : ''}'
                         okClick=okInputClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                         ref='modal'
                 }}}
        `)
    }
}
