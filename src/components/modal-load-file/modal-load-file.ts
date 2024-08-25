import {IProps, Block} from "../../helpers/Block.ts";
import {BASE_RESOURCES_URL} from "../../config.ts";
import modalController from "../../helpers/modal-controller.ts";
import {addActive, deleteActive, loadNewFileFromDrag} from "../../utils/load-file.utils.ts";
import {uploadResource} from "../../services/resources.ts";
import {IFile} from "../../modalTypes/modalTypes.ts";
import { showModalAlert} from "../../utils/api.utils.ts";

interface IModalAvatarProps extends IProps {
    okClick?: () => void,
    cancelClick?: () => void,
    onAddFile?: (e: InputEvent) => void,
    file?: IFile|null;
    type: 'picture' | 'video'|'document'|'location'
}

export class ModalLoadFile extends Block {
    constructor(props: IModalAvatarProps) {
        props.file = null;
        props.okClick = async () => {
            if(!this.props.file)showModalAlert('Load File!')
            else{
                const chat=window.store.getState().currentChat;
                if(chat&&chat.connection){
                    chat.connection.sendFile(String(this.props.file.id));
                }
            }
            modalController.closeModal();
        }
        props.cancelClick = () => {
            modalController.closeModal();
        }

        const _onAddFile = <TEvent>(e: TEvent) => {
            deleteActive(e as Event);
            const formData = loadNewFileFromDrag<TEvent>(e,'resource');
            if (formData) {
                uploadResource(formData).then(file => {
                    this.props.file=file as IFile;
                    this.setProps(this.props)

                })
                    .catch((error)=>console.warn(error));

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
        const {file } = this.props;
        let result: string;
        if (file) {
            result = `<img src='${BASE_RESOURCES_URL + file.path}' alt='file' class='modal-load-file__image'/>`
        } else {
            result = ''
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
                         caption="Add File" 
                         okText='Send' 
                         cancelText='Cancel' 
                         okClick=okClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                 }}}
        `)
    }
}
