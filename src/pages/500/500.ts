import {Block} from "../../helpers/Block.ts";

export class Page500 extends Block {
    constructor() {
        super({events:{}});
    }

    protected render(): string {
        return (`
            <div class="container container-center">
                {{{ Error errorNumber="500" errorText="Мы уже фиксим" page="pageChat" }}}
            </div>`)
    }
}
