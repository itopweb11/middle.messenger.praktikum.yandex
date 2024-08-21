import {IProps, Block} from "../../helpers/Block.ts";
import {updateUserAvatar, updateUserProfile} from "../../services/user-settings.ts";
import {BASE_RESOURCES_URL} from "../../config.ts";
import modalController from "../../helpers/modal-controller.ts";
import {addActive, deleteActive, loadNewFileFromDrag} from "../../utils/load-file.utils.ts";
import {updateChatAvatar} from "../../services/chat.ts";

interface IModalAvatarProps extends IProps {
    oldAvatar?: string,
    newAvatar?: string,
    okClick?: () => void,
    cancelClick?: () => void,
    onAddFile?: (e: InputEvent) => void,
    file?: unknown;
    type: 'user' | 'chat'
}

export class ModalAvatar extends Block {
    constructor(props: IModalAvatarProps) {
        props.file = null;
        props.newAvatar = '';
        props.okClick = async () => {
            if(this.props.type==='chat') {
                //error
                /*const chat = window.store.getState().chats?.find((item: { id: string }) => item.id === window.store.getState().currentChat?.id);                if(chat){
                    chat.avatar=window.store.getState().currentChat?.avatar;
                    window.store.set({chats:window.store.getState().chats});
                }*/
            }
            modalController.closeModal();
        }
        props.cancelClick = () => {
            switch (this.props.type) {
                case "user": {
                    const user = window.store.getState().user;
                    if (user && this.props.oldAvatar) {
                        this.props.newAvatar = '';
                        updateUserProfile({...user, avatar: this.props.oldAvatar}).then(() => {
                            modalController.closeModal();
                        });
                    }
                    modalController.closeModal();
                    break;
                }
                case "chat": {
                    const chat = window.store.getState().currentChat;
                    if (chat && this.props.oldAvatar) {
                        this.props.newAvatar = '';
                        console.log('Вернуть на место старый аватар')
                        /* updateChatAvatar({...user, avatar: this.props.oldAvatar}).then(() => {
                             modalController.closeModal();
                         });*/
                        modalController.closeModal();
                    }
                    modalController.closeModal();
                    break;
                }
            }


        }

        const _onAddFile = <TEvent>(e: TEvent) => {
            deleteActive(e as Event);
            const formData = loadNewFileFromDrag<TEvent>(e);
            if (formData) {
                switch (this.props.type) {
                    case "user": {
                        updateUserAvatar(formData).then(user => {
                            this.props.newAvatar = user.avatar;
                            modalController.addModal((new ModalAvatar({
                                oldAvatar: window.store.getState().user?.avatar || '',
                                type: 'user'
                            })) as unknown as Block);
                        }).catch((error)=>console.warn(error));
                        break;
                    }
                    case "chat": {
                        const _chat = window.store.getState().currentChat;
                        if (!_chat) break;
                        updateChatAvatar(formData, _chat.id)
                            .then(chat => {
                                this.props.newAvatar = chat.avatar;
                                modalController.addModal((new ModalAvatar({
                                    oldAvatar: window.store.getState().currentChat?.avatar || '',
                                    type: 'chat'
                                })) as unknown as Block);
                            })
                            .catch((error)=>console.warn(error));
                        break;
                    }
                }

            }
        }
        super({
            ...props,
            events: {
                dragenter: (e: Event) => {
                    addActive(e);
                },
                dragover: (e: Event) => {
                    addActive(e);
                },
                dragleave: (e: Event) => {
                    deleteActive(e);
                },
                drop: _onAddFile<DragEvent>,
                change: _onAddFile<Event>,

            }
        })
    }


    public get props() {
        return this._props as IModalAvatarProps;
    }

    getChildren() {
        const {oldAvatar = '', newAvatar = ''} = this.props;
        let result: string;
        if (newAvatar) {
            result = `<img src='${BASE_RESOURCES_URL + newAvatar}' alt='image avatar' class='modal-avatar__image'/>`
        } else {
            result = oldAvatar ? `<img src='${BASE_RESOURCES_URL + oldAvatar}' alt='image avatar' class='modal-avatar__image'/>` : `<div class='modal-avatar__empty'></div>`
        }
        return (
            `<div class='modal-avatar' id='modal-avatar'>
                ${result}
               <input id='file-input' type='file' name='file' accept='.jpg, .png,.svg'
                class='modal-avatar__input' 
               >
               <label  for='file-input' class='modal-avatar__label'>Выберите файл</label>
               <span>или перетащите его сюда</span>
             </div>
            `
        )
    }

    protected render(): string {
        return (`
                 {{{  Modal 
                         caption="Change Avatar" 
                         okText='Save' 
                         cancelText='Cancel' 
                         okClick=okClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                 }}}
        `)
    }
}
