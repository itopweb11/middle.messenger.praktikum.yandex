import {IProps,Block} from "../../helpers/Block.ts";
import {mockUser} from "../../testData/user-testData.ts";
import {mockListChats} from "../../testData/chat-testData.ts";
import {mockListMessages} from "../../testData/chat-message-testData.ts";
import {IChat} from "../../modalTypes/modalTypes.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";
import {IChatMessage} from "../../modalTypes/modalTypes.ts";

export interface IPageChatProps extends IProps {
    messageList:IChatMessage[],
    chatSidebar:IChat[],
    currentUser:IUser,
}
export class PageChat extends Block {

    constructor() {
        const props:IPageChatProps={
            currentUser:mockUser,
            chatSidebar:mockListChats,
            messageList:mockListMessages,
            events:{}
        }
        super(props);
    }

    protected render(): string {
        return (`
           <div class="chatPage">
                <div class="chatPage__left">
                    {{{ ChatSidebar list=chatSidebar }}}
                </div>
                <div class="chatPage__main">
                    {{{ MessagePanel messageList=messageList currentUser=currentUser }}}
                </div>
            </div>
        `)
    }
}
