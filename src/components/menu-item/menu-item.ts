import {IProps, Block} from "../../helpers/Block.ts";


export interface IMenuItemProps extends IProps {
    caption: string,
    icon: 'media' | 'file' | 'location' | 'plus' | 'delete' | 'avatar';
    onClick: () => void;
    disabled?: boolean;
}

export class MenuItem extends Block {
    constructor(props: IMenuItemProps) {
        super({
            ...props,
            events: {
                click: () => {
                    if(this.props.disabled)return;
                    this.props.onClick();
                }
            }
        })
    }

    public renderForList = this.render;

    public get props() {
        return this._props as IMenuItemProps;
    }

    protected render(): string {
        const {caption = '', icon} = this.props;
        return (`
            <li class='menu-item ${this.props.disabled ? `disabled` : ``}'>
                <div class='menu-item__icon ${`menu-item__icon_` + icon}'></div>
                <p  class='menu-item__caption'>${caption}</p>               
            </li>
        `)
    }
}
