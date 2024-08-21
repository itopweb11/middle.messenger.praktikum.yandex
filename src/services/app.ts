import {getUser} from "./auth.ts";
import Router from "../helpers/router.ts";
import {BASE_URLS} from "../config.ts";
import {IUser} from "../modalTypes/modalTypes.ts";
import {getChats, getChatToken, getChatUsers} from "./chat.ts";
import {IChat} from "../modalTypes/modalTypes.ts";
import {openConnectMessages} from "./send-message.ts";

const initialStateApp = async () => {
    const store = window.store.getState();
    let user = null;
    try {
        user = await getUser();
        if(user) {
            Router.getRouter().go(BASE_URLS['page-chat']);
        }
    } catch (error) {
        if (Router.getRouter().currentRoute !== BASE_URLS['page-sign-up']) Router.getRouter().go(BASE_URLS['page-login']);
        setStateUser(null);
        return;
    }
    store.user = user as IUser;
    await updateChats();

}
const updateChats = async () => {
    let chats: IChat[] = [];
    try {
        chats = await getChats();
    } catch (error) {
        setStateChats(chats)
    }
    setStateChats(chats)

}
const initChatUsers = async (chat: IChat | null) => {
    if (!chat) return;
    let users: IUser[] = [];
    try {
        users = await getChatUsers(String(chat.id));
    } catch (error) {
        setStateUsers(chat, [])
    }
    setStateUsers(chat, users)
}
const initChatToken = async (chat: IChat | null) => {
    if (!chat) return;
    let token = '';
    try {
        token = await getChatToken(String(chat.id));
    } catch (error) {
        setStateToken(chat, token)
    }
    setStateToken(chat, token)
}
const setStateUser = (user?: IUser | null) => {
    window.store.set({user: user});
}
const setStateChats = (chats: IChat[] | null) => {
    window.store.set({chats: chats});
}
const setStateUsers = (chat: IChat, users: IUser[]) => {
    chat.users = [...users];
}
const setStateToken = (chat: IChat, token: string) => {
    chat.token = token;
}
const setStateCurrentChat = async (chat: IChat | null) => {
    await initChatUsers(chat);
    await initChatToken(chat);
    const user = window.store.getState().user;
    if (chat && user) {
        //error
        /*const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id);
        if (foundedChat && chat.connection) {
            foundedChat.unread_count = 0;
        }*/
        openConnectMessages(chat, user);

    }
    window.store.set({currentChat: chat, chats: window.store.getState().chats});
}


export {
    initialStateApp,
    setStateUser,
    updateChats,
    setStateCurrentChat,
    setStateUsers,
    initChatToken,
    initChatUsers,
    setStateToken
}
