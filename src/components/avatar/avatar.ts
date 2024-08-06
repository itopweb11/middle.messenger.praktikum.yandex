import  {IProps,Block} from "../../helpers/Block";

interface IAvatarProps extends IProps{
    AvatarLoading: boolean,
    AvatarLoadingClick: () => void,
    AvatarSize: 'sm' | 'md',
    AvatarImg: string
}

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super(props);
        this._props.events = {
            click: props.AvatarLoadingClick || (() => {
            })
        }
    }

    protected render(): string {
        const {
            AvatarSize = 'md',
            AvatarLoading = false,
            AvatarImg = ''
        } = this._props as IAvatarProps;
        return (`
            <div class="avatar ${AvatarSize}">
                ${AvatarImg ? `
                    <img src='${AvatarImg}' alt="аватар" class="avatar__img"/>` : ``}
                ${AvatarLoading ? `
                    <div class="avatar__hover">
                        <div class="avatar__hover__text">Поменять аватар</div>
                    </div>` : ""}
            </div>`)
    }
}
