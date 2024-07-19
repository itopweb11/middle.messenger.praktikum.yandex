import Handlebars from 'handlebars'
import {Input} from '../../components/input/input.ts'
import {Title} from '../../components/title/title.ts'
import {Button} from '../../components/button/button.ts'
import {Link} from '../../components/link/link.ts'

import ProfileForm from './profile.hbs?raw'

interface Profile {
    login: string,
    email: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
}

export const profile: Profile = {
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    email: 'pochta@yandex.ru',
    phone: '+7 (909) 967 30 30',
}

export enum InputUserFileId {
    login = '#login_input',
    first_name = '#first_name_input',
    second_name = '#second_name_input',
    display_name = '#display_name_input',
    email = '#email_input',
    phone = '#phone_input',
}


const profileFiled = function (e: Event, field: keyof typeof profile) {
    console.log(field, (e.target as HTMLInputElement)?.value)
    profile[field] = (e.target as HTMLInputElement)?.value
}

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Title', Title);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);


const template = Handlebars.compile(ProfileForm)

const profileForm = (profile: Profile) => template(profile)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = profileForm({...profile})

const inputLogin = document.querySelector<HTMLDivElement>(InputUserFileId.login)
const inputEmail = document.querySelector<HTMLDivElement>(InputUserFileId.email)
const inputFirstName = document.querySelector<HTMLDivElement>(InputUserFileId.first_name)
const inputSecondName = document.querySelector<HTMLDivElement>(InputUserFileId.second_name)
const inputDisplayName = document.querySelector<HTMLDivElement>(InputUserFileId.display_name)
const inputPhone = document.querySelector<HTMLDivElement>(InputUserFileId.phone)

inputLogin?.addEventListener('input', (e) => profileFiled(e, 'login'))
inputEmail?.addEventListener('input', (e) => profileFiled(e, 'email'))
inputFirstName?.addEventListener('input', (e) => profileFiled(e, 'first_name'))
inputSecondName?.addEventListener('input', (e) => profileFiled(e, 'second_name'))
inputDisplayName?.addEventListener('input', (e) => profileFiled(e, 'display_name'))
inputPhone?.addEventListener('input', (e) => profileFiled(e, 'phone'))

export default profileForm
