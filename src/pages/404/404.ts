import {Block} from "../../helpers/Block.ts";

export class Page404 extends Block {
    constructor() {
        super({events:{}});
    }

    protected render(): string {
        return (`
            <div class="container container-center">
                {{{ Error errorNumber="404" errorText="Не туда попали" page="pageChat" }}
            </div>`
        )
    }
}
