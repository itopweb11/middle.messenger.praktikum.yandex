import{IProps,Block} from "../../helpers/Block";

interface IInputProfile extends IProps{
    validate: (value: string) => string,
    name: string,
    errorText: string,
    value: string,
    type: 'text' | 'button',
    label: string,
    onBlur: () => void,
    readOnlyMode: boolean,
    error:boolean ,
}

export class InputProfile extends Block {
    constructor(props: IInputProfile) {
        props.errorText='';
        props.error=false;
        props.onBlur= () => this.validate();
        super({...props});
    }
    public get props(){return this._props as IInputProfile;}
    public value() {
        if (!this.validate()) {return '';}
        return this.refs?.input?.value()
    }

    private validate() {
        console.log(this)
        const value = this.refs?.input?.value();
        const error = this.props.validate(value);

        this.props.value = value;

        if (error) {
            this.setProps(this.props);
            this.props.error=true;
            this.props.errorText=error;
            return false;
        }
        this.setProps(this.props);
        this.props.error=false;
        this.props.errorText='';
        return true;
    }

    protected render(): string {
        const {
            type = '',
            name = '',
            value = '',
            label = "",
            error = false,
            errorText = '',
            readOnlyMode = false,
        } = this.props;

        return (`
            <div class="inputBig">
                <label class="inputBig__container">
                    <div class="inputBig__label"><span>${label}</span></div>
                    ${readOnlyMode ? `<span class="inputBig__text">${value}</span>` : ""}
                     {{{ Input 
                            ref='input' 
                            type="${type}" 
                            inputClass="inputBig__value ${error ? "input__value-error" : ""}
                            ${readOnlyMode ? "input__value-disabled" : ""}" 
                            value='${value}'
                            placeholder=" " 
                            name="${name}"
                            onBlur=onBlur
                     }}}
                </label>
                 ${error ? ` 
                    <div class="inputBig__error">
                        <div class="inputBig__text-error">${errorText}</div>
                    </div>` 
                    : ""
                }
            </div>
        `)
    }
}
