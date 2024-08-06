import {IProps,Block} from "../../helpers/Block";
import {IChatMessage} from "../../modalTypes/modalTypes.ts";
import {IUser} from "../../modalTypes/modalTypes.ts";
import { Message} from "../index.ts";
import {IMessageProps} from "../message/message.ts";
import {validateMessage} from "../../helpers/validates.utils.ts";

interface IMessagePanel extends IProps{
    blurMessage?:()=>void;
    currentUser:IUser;
    message?:string;
    messageList:IChatMessage[];
    сlickSend?:()=>void;
}

export class MessagePanel extends Block {
    constructor(props: IMessagePanel) {
        props.blurMessage= () => this.validate();
        props.сlickSend= () => {}
        super(props);
    }
    public get props(){return this._props as IMessagePanel;}
    public valueMessage() {
        if (!this.validate()) {return '';}
        return this.refs?.message.value()
    }
    private validate() {
        const value =this.refs?.message.value();
        const error = validateMessage(value);
        this.props.message=value;
        if (error) {
            this.setProps(this.props);
            return false;
        }
        this.setProps(this.props);
        return true;
    }
    getListMessages(list:IChatMessage[]):string{
        if(!list||list.length===0)return '';
        return list.map(message=>{
            const messageBlock=new Message({message:message,myMessages:message.main||false} as IMessageProps)
            return(`
            <div class="messagePanels__main__message">${messageBlock.renderForList()}</div>
            `)
        }).join('')
    }
    protected render(): string {
        const { messageList,currentUser,message='' } = this.props;
        const {avatar,display_name}=currentUser;
        return (`
           <div class="messagePanels">
                <div class="messagePanels__header">
                    <div class="messagePanels__header__avatar">
                        {{{ Avatar image=${avatar} AvatarSize='sm'}}}
                        <span>${display_name}</span>
                    </div>
                    {{{ Button type="mark"}}}
                </div>
                <ul class="messagePanels__main">
                    ${this.getListMessages(messageList)}                   
                </ul>
                <div class="messagePanels__footer">
                    {{{ Button type="clamp"}}}
                    {{{ Input ref="message"
                        type="text" 
                        inputClass="messagePanels__footer__input" 
                        value='${message}'
                        placeholder="Message" 
                        name="message"
                        onBlur=blurMessage
                    }}}
                    {{{ Button type="pointer" onClick=сlickSend}}}
                </div>
            </div>
        `)
    }
}
