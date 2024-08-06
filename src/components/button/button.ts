import  {IProps,Block} from "../../helpers/Block";

interface IButtonProps extends IProps{
    type: 'pointer' |'cancel' | 'mark' | 'number' | 'clamp',
    onClick: () => void
    page: string,
    desc: string,
}

export class Button extends Block {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {click: props.onClick || (() => {})}
        })
    }

    protected render(): string {
        const { type='', desc='', page='' } = this._props as IButtonProps;
        return (`
            <button class="button ${type?"button-"+type:""}" ${page ? `page="${page}"` : ''}> 
                ${desc}
            </button>
        `)
    }
}

