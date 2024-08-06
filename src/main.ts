import './style/main.scss';
import * as Components from './components';
import * as Pages from './pages';
import {registerComponent} from "./helpers/registerComponent.ts";
import {Block} from "./helpers/Block.ts";

const allComponents = {
    'Input': Components.Input,
    'FormAccess': Components.FormAccess,
    'Link': Components.Link,
    'Button': Components.Button,
    'Avatar': Components.Avatar,
    'ChatElem': Components.ChatElem,
    'Error': Components.Error,
    'FormProfile': Components.FormProfile,
    'InputShort': Components.InputShort,
    'Modal': Components.Modal,
    'InputSearch': Components.InputSearch,
    'Message': Components.Message,
    'MessageTime': Components.MessageTime,
    'InputProfile': Components.InputProfile,
    'ChatSidebar': Components.ChatSidebar,
    'MessagePanel': Components.MessagePanel,
}
const pages:{[index: string]:{component:unknown}} = {
    "pageRegistration": {component: Pages.PageRegistration},
    "loginPage": {component: Pages.LoginPage},
    "pageChat": {component: Pages.PageChat},
    "pageProfile": {component: Pages.PageProfile},
    "profileEdit": {component: Pages.ProfileEdit},
    "passwordEdit": {component: Pages.PasswordEdit},
    "page404": {component: Pages.Page404},
    "page500": {component: Pages.Page500},
};

Object.entries(allComponents).forEach(([name, component]) => {
    registerComponent(name, component);
});

const navigate = (page: string) => {
    const App = document.getElementById('app');
    const pageComponent = pages[page].component as unknown as typeof Block;
    const comp = new pageComponent({events:{}});
    const htmlElement = comp.getContent();
    if (!App?.firstElementChild) App?.append(document.createElement('div'));
    if(htmlElement)
        App?.firstElementChild?.replaceWith(htmlElement);
}
document.addEventListener('DOMContentLoaded', () => navigate('loginPage'));
document.addEventListener('click', (e: Event) => {
    if (!e) return;
    if(!e.target)return;
    const page =(<HTMLDivElement> e.target).getAttribute('page');
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
