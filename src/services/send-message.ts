import {IChat} from "../modalTypes/modalTypes.ts";
import {BASE_SOCKET_CHAT} from "../config.ts";
import {IUser} from "../modalTypes/modalTypes.ts";
import SocketIO from "../api/socket.ts";
import {showAlert} from "../utils/api.utils.ts";

export const openConnectMessages = (chat: IChat, currentUser: IUser) => {
    if (!chat.id) return;
    if (!chat.users) return;
    if (chat.users.length < 2) return chat;
    if (chat.connection && chat.connection.getState() === 'OPEN') return;
    const socket = new SocketIO(BASE_SOCKET_CHAT, currentUser.id, String(chat.id), chat.token);
    socket.open(() => {
        getAllNewMessage(0, chat);
        setInterval(() => {
            socket.ping();
        }, 5000);

    })
    socket.message((event: MessageEvent) => {
        let message=null;
        try{
            message = JSON.parse(event.data);
        }
        catch (e){
            showAlert('Unknown message!')
        }
        if(!message)return;
        if (message.type === 'message' || Array.isArray(message)||message.type === 'file') {
            if (!chat.messages) chat.messages = [];
            if (Array.isArray(message)) {
                message.reverse();
                chat.messages =chat.messages.concat(message);
            } else chat.messages.push(message);
            if (chat.id === window.store.getState().currentChat?.id) window.store.set({currentChat:chat});
            else {
                //error
                /*const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id);
                if (foundedChat) {
                    foundedChat.unread_count += 1;
                    window.store.set({chats: window.store.getState().chats});
                }*/
            }
            const element = document.querySelector('.scroll-bottom');
            if (element)
                element.scrollIntoView({
                    behavior: 'auto',
                    block: 'end',
                });
        }
        if (event.data.type === 'user connected') {
            console.log('user connected', event.data)
        }
    })
    chat.connection = socket;
    return chat;

}

export const sendMessage = (message: string) => {
    const chat = window.store.getState().currentChat;
    const user =window.store.getState().user;
    if (!chat) throw Error('Select Chat!');
    if (chat.connection&&chat.connection.getState()==='OPEN') {
        chat.connection.sendMessage(message);
    }
    else if(user)openConnectMessages(chat,user)
}

export const getAllNewMessage = (limit: number, chat: IChat | null) => {
    {
        //const chat = window.store.getState().currentChat;
        if (!chat) throw Error('Select Chat!');
        if (chat.connection) {
            chat.connection.sendRequestForgetMessage(limit);
            chat.unread_count = 0;
            window.store.set({currentChat: {...chat}});
        }
    }
}
