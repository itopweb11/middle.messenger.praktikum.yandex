import {IChat} from "../modalTypes/modalTypes.ts";


export const chat1: IChat = {
    id: 125,
    title: "Андрей",
    avatar: `2.jpg`,
    unread_count: 0,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Andrei",
            second_name: "Andrei",
            avatar: `2.jpg`,
            email: "Andrei@email.com",
            login: "AndreiLogin",
            phone: "8(911)-342-78-76",
        },
        time: "12:30",
        content: "Изображение"
    }
}

export const chat2: IChat = {
    id: 124,
    title: "Илья",
    avatar: `1.jpeg`,
    unread_count: 15,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Ilya",
            second_name: "Ilya",
            avatar: `1.jpg`,
            email: "Ilya@email.com",
            login: "IlyaLogin",
            phone: "8(911)-977-08-99",
        },
        time: "22:17",
        content: "Друзья, у меня для вас особенный выпуск новостей!..."
    }
}


export const mockListChats = [chat1, chat2,]

