import {IProps,Block} from "../../helpers/Block.ts";

export class PageChat extends Block {

    constructor() {
        const props: IProps = {
            events: {}
        }
        super(props);
    }

    protected render(): string {
        return (`
           <div class="chatPage">
                <div class="chatPage__left">
                    {{{ ChatSidebar }}}
                </div>
                <div class="chatPage__main">
                    {{{ MessagePanel }}}
                </div>
            </div>
        `)
    }
}
