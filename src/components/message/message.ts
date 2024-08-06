import {IProps,Block} from "../../helpers/Block";
import {IChatMessage} from "../../modalTypes/modalTypes.ts";

export interface IMessageProps extends IProps{
    myMessages:boolean
    message:IChatMessage;
}

export class Message extends Block {
    constructor(props: IMessageProps) {super(props);}
    public renderForList=this.render;
    public get props(){return this._props as IMessageProps;}
    protected render(): string {
        const { message,myMessages } = this.props;
        return (`
            <li class="message  ${myMessages?' message-my':''}">
               ${message.file?`
                    <article class="message__file">
                        <img src=${message.file.path} alt="included_file"/>
                        <div class="message__time">
                            {{{ MessageTime text="01.40" type="initial" }}}
                        </div>
                    </article>`:`<article class="message__text">
                        <p>${message.content}</p>
                        <div class="message__time">
                            {{{MessageTime text="01.40" }}}
                        </div>
                    </article>`
                }
            </li>
        `)
    }
}
