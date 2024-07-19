import Handlebars from 'handlebars';
import {Link} from '../../components/link/link.ts';
import Chat from './chat.hbs?raw'

Handlebars.registerPartial('Link', Link);

const template = Handlebars.compile(Chat);

const chat = () => {
    const context = {
        text: 'Страница не найдена...'
    };
    return template(context);
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = chat();

export default chat;
