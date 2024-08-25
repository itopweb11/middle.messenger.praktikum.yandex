import {IProps,Block} from "../../helpers/Block";
import {IChatMessage} from "../../modalTypes/modalTypes.ts";
import {BASE_RESOURCES_URL} from "../../config.ts";
import {getShortDate} from "../../utils/date.utils.ts";

export interface IMessageProps extends IProps{
    myMessages:boolean
    userName:string;
    message:IChatMessage;
}

export class Message extends Block {
    constructor(props: IMessageProps) {super(props);}
    public renderForList=this.render;
    public get props(){return this._props as IMessageProps;}
    protected render(): string {
        const { message,myMessages,userName } = this.props;
        return (`
            <li class="message  ${myMessages?' message-my':''}">
               ${message.file?`
                    <article class="message__file">
                        ${!myMessages?` <div class="message__user">
                            ${userName}
                        </div>`:''}
                        <img src=${BASE_RESOURCES_URL+ message.file.path} alt="included_file"/>
                        <div class="message__time">
                            {{{ Badge text="${getShortDate(message.time)}" type="primary" }}}
                        </div>
                    </article>`:`<article class="message__text">
                        ${!myMessages?` <div class="message__user">
                            ${userName}
                        </div>`:''}
                       
                        <p>${message.content}</p>
                        <div class="message__time">
                            {{{Badge text="${getShortDate(message.time)}" }}}
                        </div>
                    </article>`
        }
            </li>
        `)
    }
}
