import Handlebars from 'handlebars'
import {Input} from '../../components/input/input.ts'
import {Title} from '../../components/title/title.ts'
import {Button} from '../../components/button/button.ts'
import {Link} from '../../components/link/link.ts'

import RegistrationForm from './registration.hbs?raw'

enum RegistrationInputIds {
    first_name = "#first_name_input",
    surname = "#surname_input",
    login = "#login_input",
    email = "#email_input",
    phone = "#phone_input",
    password = "#password_input",
    re_password = "#re_password_input",
}

interface Registration {
    first_name: string,
    surname: string,
    login: string,
    email: string,
    phone: string,
    password: string,
    re_password: string,
}

const registrationForm: Registration = {
    first_name: "",
    surname: "",
    login: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
}

const inputRegistrationField = function (e: Event, field: keyof typeof registrationForm) {
    console.log(field, (e.target as HTMLInputElement)?.value)
    registrationForm[field] = (e.target as HTMLInputElement)?.value
}

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Title', Title);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);


const template = Handlebars.compile(RegistrationForm)

const registrationFormEl = (thisRegistration: Registration) => template(thisRegistration)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = registrationFormEl({...registrationForm})

const inputLogin = document.querySelector<HTMLDivElement>(RegistrationInputIds.login)
const inputPassword = document.querySelector<HTMLDivElement>(RegistrationInputIds.password)
const inputEmail = document.querySelector<HTMLDivElement>(RegistrationInputIds.email)
const inputFirstName = document.querySelector<HTMLDivElement>(RegistrationInputIds.first_name)
const inputSecondName = document.querySelector<HTMLDivElement>(RegistrationInputIds.surname)
const inputPhone = document.querySelector<HTMLDivElement>(RegistrationInputIds.phone)
const inputRePassword = document.querySelector<HTMLDivElement>(RegistrationInputIds.re_password)

inputLogin?.addEventListener('input', (e) => inputRegistrationField(e, 'login'))
inputPassword?.addEventListener('input', (e) => inputRegistrationField(e, 'password'))
inputEmail?.addEventListener('input', (e) => inputRegistrationField(e, 'email'))
inputFirstName?.addEventListener('input', (e) => inputRegistrationField(e, 'first_name'))
inputSecondName?.addEventListener('input', (e) => inputRegistrationField(e, 'surname'))
inputPhone?.addEventListener('input', (e) => inputRegistrationField(e, 'phone'))
inputRePassword?.addEventListener('input', (e) => inputRegistrationField(e, 're_password'))

export default registrationFormEl
