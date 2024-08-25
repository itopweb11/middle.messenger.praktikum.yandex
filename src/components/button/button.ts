import  {IProps,Block} from "../../helpers/Block";

interface IButtonProps extends IProps{
    type: 'arrow' | 'dots' | 'paperclip' | 'cancel' | 'number' | 'close',
    onClick: () => void
    isSubmit?: boolean,
    page: string,
    desc: string,
}

export class Button extends Block {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {click: props.onClick || (() => {})}
        })
        console.log('aaaaaaaaaaaaaaa')
    }

    protected render(): string {
        const {isSubmit = false, type = '', desc = '', page = ''} = this._props as IButtonProps;
        return (`
            <button type='${isSubmit ? 'submit' : `button`}' class="button ${type ? "button-" + type : ""}" 
            ${page ? `page="${page}"` : ''}> 
                ${desc}
            </button>
        `)
    }
}

