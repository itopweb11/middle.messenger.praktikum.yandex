import Handlebars from 'handlebars'
import {Input} from '../../components/input/input.ts'
import {Title} from '../../components/title/title.ts'
import {Button} from '../../components/button/button.ts'
import {Link} from '../../components/link/link.ts'

import AuthorizationForm from './authorization.hbs?raw'

enum AuthorizationInputIds {
    login = "#login_input",
    password = "#password_input",
}

interface Authorization {
    login: string,
    password: string,
}

const authorizationForm: Authorization = {
    login: "",
    password: "",
}

const inputAuthorizationField = function (e: Event, field: keyof typeof authorizationForm) {
    console.log(field, (e.target as HTMLInputElement)?.value)
    authorizationForm[field] = (e.target as HTMLInputElement)?.value
}

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Title', Title);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);


const template = Handlebars.compile(AuthorizationForm)

const authorizationFormEL = (thisAuthorization: Authorization) => template(thisAuthorization)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = authorizationFormEL({...authorizationForm})

const inputLogin = document.querySelector<HTMLDivElement>(AuthorizationInputIds.login)
const inputPassword = document.querySelector<HTMLDivElement>(AuthorizationInputIds.password)

inputLogin?.addEventListener('input', (e) => inputAuthorizationField(e, 'login'))
inputPassword?.addEventListener('input', (e) => inputAuthorizationField(e, 'password'))

export default authorizationFormEL
