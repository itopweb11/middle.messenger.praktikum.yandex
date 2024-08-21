/*
export interface IUser {
    login?: string;
    password?: string;
    display_name?: string;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    avatar?: string;
}

export interface IFile {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
}

export interface ILastMessage {
    user: IUser;
    time: string;
    content: string;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: ILastMessage;
}

export interface IChatMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string;
    content: number | string;
    file?: IFile;
    main?: boolean;
}
*/

import SocketIO from "../api/socket.ts";

export interface IUser {
    login?: string;
    password?: string;
    display_name?: string;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    avatar?: string;
    id?:string
}

export interface IAuthData {
    login: string;
    password: string;
}

export interface IPasswords {
    oldPassword: string,
    newPassword: string
}


export interface IFile {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
}

export interface IChatMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string|'message'|'file';
    content: number | string;
    file?: IFile;
    main?: boolean;
    is_read?:boolean;
}

export interface IChat {
    id: number;
    title: string;
    avatar?: string;
    token?: string;
    unread_count: number;
    created_by: number;
    last_message?: ILastMessage;
    users?:IUser[];
    connection?:SocketIO|null;
    messages?:IChatMessage[]|null;
}

export interface ILastMessage {
    user: IUser;
    time: string;
    content: string;
}

export type IChatUsersData = {
    users: number[];
    chatId: number;
}

export type IAppState = {
    error: string | null,
    user?: IUser | null,
    chats: IChat[]|null,
    currentChat: IChat|null,
}
