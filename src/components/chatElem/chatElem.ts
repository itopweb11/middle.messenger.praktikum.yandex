import {IProps,Block} from "../../helpers/Block";
import {getShortDate} from "../../utils/date.utils.ts";

export interface ChatElemProps extends IProps {
    id: number;
    title: string;
    avatar: string|null;
    unread_count: string|null;
    last_message_content:string|null;
    last_message_time:string|null;

    onClick: (id:string) => void
}

export class ChatElem extends Block {
    constructor(props: ChatElemProps) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    e.stopPropagation();
                    props.onClick(String(this.props.id));
                }
            }
        })
    }

    public get props() {
        return this._props as ChatElemProps;
    }

    public renderForList=this.render;
    protected render(): string {
        const {id,
            title,
            avatar,
            unread_count,
            last_message_content,
            last_message_time} = this._props as ChatElemProps;
        return (`
            <li class="chatElem">
                <div class="chatElem__avatar">
                  {{{ Avatar imageUrl='${avatar||''}' isLoadAvatar=false size='sm' }}}
                </div>
                <div class="chatElem__info">
                    <div class="chatElem__desc__name" id='${id}'>
                        ${title}
                    </div>
                    ${last_message_time ? `<div class="chatElem__desc__time">
                        ${ getShortDate(last_message_time)}
                    </div>` : ``}
                </div>
                ${last_message_content ? ` <div class="chatElem__message">
                    <div class="chatElem__message__content">
                        <p> ${last_message_content}</p>
                    </div>
                    ${unread_count ? `{{{ Button type="number" caption='${unread_count}' }}}` : ''}
                </div>` : ` <div class="chatElem__message__content">
                        <p> no messages</p>
                    </div>`}
            </li>
        `)
    }
}
