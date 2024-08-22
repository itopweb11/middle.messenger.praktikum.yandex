export const validateLogin = (value: string) => {
    if (value.length === 0) return `Логин не может быть пустым`;
    if (value.length < 3) {
        return 'Логин должен содержать минимум 3 символа'
    }
    if (value.length > 20) {
        return 'Логин должен содержать максимум 20 символов.'
    }
    if (!value.match(/(?=.*[a-z])/)) {
        return 'Логин должен содержать буквы'
    }
    if (!value.match(/^[a-z0-9_-]{3,}$/)) {
        return 'Логин должен состоять из одного слова и может включать латинские символы в нижнем регистре, цифры, тире и подчеркивание.'
    }
    return '';
}

export const validatePassword = (value: string) => {
    if (value.length === 0) return `Пароль не может быть пустым`;
    if (value.length < 8) {
        return 'Пароль должен содержать минимум 8 символов.'
    }
    if (value.length > 40) {
        return 'Пароль должен содержать максимум 40 символов.'
    }
    if (!value.match(/(?=.*[A-Z])/)) {
        return 'Пароль должен содержать заглавные буквы.'
    }
    if (!value.match(/(?=.*[a-z])/)) {
        return 'Пароль должен содержать строчные буквы.'
    }
    if (!value.match(/(?=.*[0-9])/)) {
        return 'Пароль должен содержать число'
    }
    return '';
}

export const validateName = (value: string) => {
    if (value.length === 0) return `Имя не может быть пустым`;
    if (value.length < 2) {
        return 'Имя должно содержать минимум 2 символа.'
    }
    if (value.length > 140) {
        return 'Имя должно содержать максимум 140 символов.'
    }
    if (!value.match(/^[A-Z]+/)) {
        return 'Имя должно иметь первую заглавную букву.'
    }
    if (!value.match(/[a-z-]$/)) {
        return 'Имя должно содержать только буквы и тире.'
    }
    return '';
}

export const validateEmail = (value: string) => {
    if (value.length === 0) return `Электронная почта не может быть пустой`;

    if (!value.match(/^\S+@\S+\.\S+$/)) {
        return 'Неверный адрес электронной почты'
    }
    return '';
}

export const validatePhone = (value: string) => {
    if (value.length === 0) return `Телефон не может быть пустым`;

    if (!value.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)) {
        return 'Неверный номер телефона, например +123-456-789-1234'
    }
    return '';
}

export const validateMessage = (value: string) => {
    if (value.length === 0) return `Сообщение не может быть пустым`;
    return '';
}

export const validateNameChat = (value: string) => {
    if (value.length === 0) return `Имя чата не может быть пустым`;
    return '';
}

export const validateDisplayName = (value: string) => {
    if (value.length > 50) return `Отображаемое имя не может содержать более 50 букв.`;
    if(value.length===0)return ' ';
    return '';
}
