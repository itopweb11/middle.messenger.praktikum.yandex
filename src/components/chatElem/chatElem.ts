import {IProps,Block} from "../../helpers/Block";
import {IChat} from "../../modalTypes/modalTypes.ts";

export interface ChatElemProps extends IProps {
    chat:IChat,
}

export class ChatElem extends Block {
    constructor(props: ChatElemProps) {
        super(props);
    }

    public renderForList=this.render;
    protected render(): string {
        const { chat } = this._props as ChatElemProps;
        return (`
            <li class="chatElem">
                <div class="chatElem__avatar">
                  {{{ Avatar AvatarImg=${chat.avatar} AvatarLoading=false AvatarSize='sm' }}}
                </div>
                <div class="chatElem__info">
                    <div class="chatElem__desc">
                    <div class="chatElem__desc__name">
                        ${chat.title}
                    </div>
                    
                    
                    
                </div>
                <div class="chatElem__message">
                    <div class="chatElem__message__content">
                        
                    </div>
                    {{{ Button type="number" desc=${chat.unread_count}}}}
                </div>
                </div>
            </li>
        `)
    }
}


/*
<div class="chatElem__desc__time">
    ${chat.last_message.time}
</div>



<p> ${chat.last_message.content}</p>
* */