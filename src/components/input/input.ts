import {IProps,Block} from "../../helpers/Block.ts";


interface IInputProps extends IProps {
    type: 'text' | 'password',
    placeholder: string,
    ref:string,
    inputClass: string,
    name:string,
    onBlur:()=>void,
    value:string
}

export class Input extends Block {
    constructor(props: IInputProps) {
        props.events={blur: props.onBlur || (() => {})};
        super(props)
    }

    protected render(): string {
        const {
            ref,
            placeholder,
            type,
            value,
            name,
            inputClass
        } = this._props as IInputProps;
        return (`
            <input
                class="${inputClass}"
                placeholder="${placeholder || ''}"
                ref="${ref}"
                name="${name}"
                value="${value}"
                type="${type}" 
            />
        `)
    }
}

