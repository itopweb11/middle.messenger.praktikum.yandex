import {IProps,Block} from "../../helpers/Block";
import {IChat} from "../../modalTypes/modalTypes.ts";
import {ChatElem} from "../index.ts";
import {ChatElemProps} from "../chatElem/chatElem.ts";

interface ChatSidebarProps extends IProps {
   list:IChat[]
}

export class ChatSidebar extends Block {
    constructor(props: ChatSidebarProps) {
        super(props);
    }

   getChats(list:IChat[]):string{
        if(!list||list.length===0)return '';
        return list.map(chat=>{
            const chatBlock=new ChatElem({chat:chat} as ChatElemProps)
            return(`${chatBlock.renderForList()}`)
        }).join('')
    }
    protected render(): string {
        const {list } = this._props as ChatSidebarProps;

        return (`            
            <div class="chatSidebar">
                <nav class="chatSidebar__header">
                    {{{
                    Link desc="Профиль" 
                    page="pageProfile"  
                    linkIcon=true 
                    }}}
                </nav>
                <div class="chatSidebar__search">
                    {{{ 
                    InputSearch 
                    }}}
                </div>
                <ul class="chatSidebar__chats">
                    ${this.getChats(list)}
                </ul>
            </div>
        `)
    }
}

