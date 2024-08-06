import Handlebars from 'handlebars';
import Block from "./Block";
import {HelperOptions} from "handlebars";

export function registerComponent(name: string, Component: typeof Block) {
    if (name in Handlebars.helpers) {throw `Компонент ${name} уже зарегистрирован!`;}

    Handlebars.registerHelper(name, function (this: unknown, {hash, data, fn}: HelperOptions) {
        const component = new Component(hash);
        const dataAttribute = `data-id="${component.id}"`;

        if ('ref' in hash) {(data.root.__refs = data.root.__refs || {})[hash.ref] = component;}

        (data.root.__children = data.root.__children || []).push({
            component,
            embed(fragment: DocumentFragment) {
                const stub = fragment.querySelector(`[${dataAttribute}]`);
                if (!stub) {return;}

                const element=component.getContent();
                element?.append(...Array.from(stub.childNodes));
                stub.replaceWith(element!);
            }
        });
        const contents = fn ? fn(this) : '';
        return `<div ${dataAttribute}>${contents}</div>`;
    });
}
