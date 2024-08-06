import {IProps,Block} from "../../helpers/Block";

interface IInputSearch extends IProps{
    name: string,
    errorText: string,
    error:boolean ,
    value: string,
}

export class InputSearch extends Block {
    constructor(props:IInputSearch) {props.errorText='';props.error=false;super(props);}
    public value() {return this.refs?.input?.value()}

    protected render(): string {
        const {
            name = '',
            value = ''
        } = this._props as IInputSearch;

        return (`
           <label class="inputSearch">
                <span class="inputSearch__label">
                Поиск
                </span>
                {{{ Input 
                    ref='input' 
                    type="text"
                    inputClass="inputSearch__value" 
                    value='${value}'
                    name="${name}"
                    placeholder=' '
                }}}
            </label>
        `)
    }
}
