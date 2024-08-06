import{IProps,Block} from "../../helpers/Block";

interface IErrorProps extends IProps{
    errorNumber: string,
    revert: string,
    errorText: string,
}

export class Error extends Block {
    constructor(props: IErrorProps) {
        super(props);
    }
    protected render(): string {
        const {
            errorNumber='',
            revert='',
            errorText=''
        } = this._props as IErrorProps;
        return (`
            <div class="error">
                <h1 class="error__number">${errorNumber}</h1>
                <h2 class="error__text">
                   ${errorText}
                </h2>
                {{{ 
                Link page='${revert}' 
                desc='Назад к чатам'  
                }}}
            </div>
        `)
    }
}
