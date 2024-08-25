import {Block} from "../../helpers/Block.ts";

export class Loader extends Block {
    protected render(): string {
        return (`
            <span class="loader"></span>
        `)
    }
}
