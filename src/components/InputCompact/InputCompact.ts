import {IProps,Block} from "../../helpers/Block";

interface IInputProps extends IProps{
    onChange: (value: string) => void,
    onBlur: (value: string) => void,
    validate: (value: string) => string,
    type: 'text' | 'password',
    errorText: string,
    error:boolean ,
    name: string,
    ref:string
    value: string,
    label: string,
}

export class InputCompact extends Block {
    constructor(props:IInputProps) {props.errorText='';props.error=false;
        props.onBlur= () => this.validate();
        super({...props,});
    }

    public get props(){return this._props as IInputProps;}
    public value() {
        if (!this.validate()) {return '';}
        return this.refs?.[this.props.ref].value()
    }

    private validate() {
        const value =this.refs?.[this.props.ref].value();
        const error = this.props.validate(value);

        this.props.value=value;
        if (error) {this.props.error=true;
            this.props.errorText=error;
            this.setProps(this.props);
            return false;
        }
        this.props.error=false;
        this.props.errorText='';
        this.setProps(this.props);
        return true;
    }

    protected render(): string {
        const {
            type = '',
            ref = '',
            value = '',
            label = "",
            error=false,
            errorText=''} = this.props;

        return (`
            <div class="input">
                <label class="input__container">
                <div class="input__label">${label}</div>
                
                {{{ Input 
                    ref="${ref}"
                    type="${type}" 
                    inputClass="input__value  ${error ? "input__value-error" : ""}" 
                    value='${value}'
                    placeholder=" " 
                    name="${ref}"
                    onBlur=onBlur
                }}}
                    
                    ${error ? ` 
                        <div class="input__error">
                            <div class="input__text-error">${errorText}</div>
                        </div>` : ""
                    }
                </label>
            </div>
        `)
    }
}
