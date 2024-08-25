import  {IProps,Block} from "../../helpers/Block";
import modalController from "../../helpers/modal-controller.ts";
import { ModalAvatar} from "../index.ts";
import {BASE_RESOURCES_URL} from "../../config.ts";

interface IAvatarProps extends IProps{
    AvatarLoading: boolean,
    AvatarLoadingClick: () => void,
    AvatarSize: 'sm' | 'md',
    AvatarImg: string
}

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super({
            ...props,
            events: {
                click: () => {
                    if(!props.AvatarLoading)return;
                    modalController.addModal((new ModalAvatar({
                        oldAvatar:window.store.getState().user?.avatar||'',
                        type:'user'
                    })) as unknown as Block);
                    modalController.openModal();
                }
            }
        })
    }

    public get props(){
        return this._props as IAvatarProps;
    }

    protected render(): string {
        const {
            AvatarSize = 'md',
            AvatarLoading = false,
            AvatarImg = ''
        } = this.props;
        return (`
            <div class="avatar ${AvatarSize}">
                ${AvatarImg&&AvatarImg.trim()!=='null'? `
                    <img src='${BASE_RESOURCES_URL+AvatarImg}' alt="image avatar" class="avatar__image"/>` : ``}
                ${AvatarLoading ? `
                    <div class="avatar__hover">
                        <div class="avatar__hover__text">Load New Avatar</div>                        
                    </div>` : ""}
            </div>
        `)
    }
}
