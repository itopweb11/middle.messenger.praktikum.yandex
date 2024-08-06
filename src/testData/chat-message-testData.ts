import {IChatMessage} from "../modalTypes/modalTypes.ts";


export const message1: IChatMessage = {
    id: 45645,
    user_id: 464,
    chat_id: 546,
    time: "2024-05-08",
    type: "text",
    content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
        '\n' +
        'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
}

export const message2: IChatMessage = {
    id: 434,
    user_id: 454,
    chat_id: 788,
    time: "2024-05-06",
    type: "file",
    content: 4645664,
    file: {
        id: 456,
        user_id: 555,
        path: `../img-icons/img/imgMessage.jpg`,
        filename: "file name",
        content_type: "image/jpeg",
        content_size: 54646456,
        upload_date: "2020-01-02T14:22:22.000Z"
    }
}

export const message3: IChatMessage = {
    id: 124563,
    user_id: 4646,
    chat_id: 464,
    time: "2023-04-07",
    type: "file",
    content: 'Круто!!!',
    main: true,
}

export const mockListMessages = [message1, message2, message3];

