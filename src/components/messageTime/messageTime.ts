import {IProps,Block} from "../../helpers/Block";

interface messageTimeProps extends IProps{
    type: 'initial' | 'prepared',
    text: string,
}

export class MessageTime extends Block {
    constructor(props: messageTimeProps) {
        super(props);
    }

    protected render(): string {
        const { type='', text=''} = this._props as messageTimeProps;
        return (`
            <div class="messageTime ${type?"messageTime-"+type:""}">
                <span>${text}</span>
            </div>
        `)
    }
}
