import {responseHasError} from "../utils/api.utils.ts";
import ChatApi from "../api/chat.ts";
import {IChat, IChatUsersData} from "../modalTypes/modalTypes.ts";
import {setStateCurrentChat, updateChats} from "./app.ts";
import {IUser} from "../modalTypes/modalTypes.ts";


const chatApi = new ChatApi('/chats');
const getChats = async (): Promise<IChat[]> => {
    const result = await chatApi.getChats() ;
    responseHasError(result);
    return result.data as IChat[];
}
const createChat = async (title: string): Promise<IChat> => {
    const result = await chatApi.createChat(title);
    const error = responseHasError(result);
    if (error) throw Error(error);
     return result.data as IChat;
}

const addChatUser = async (data: IChatUsersData) => {
    const result = await chatApi.addChatUsers(data);
    const error = responseHasError(result);
    if (error) throw Error(error);
    await updateChats();
}
const deleteChatUsers = async (data: IChatUsersData) => {
    const result = await chatApi.deleteChatUsers(data) ;
    const error = responseHasError(result);
    if (error) throw Error(error);
    await updateChats();
}

const getChatUsers = async (idChat: string): Promise<IUser[]> => {
    const result = await chatApi.getChatUsers(idChat);
    const error = responseHasError(result);
    if (error) throw Error(error);
    return result.data as IUser[];
}
const getChatToken = async (idChat: string): Promise<string> => {
    const result = await chatApi.getChatToken(idChat) ;
    const error = responseHasError(result);
    if (error) throw Error(error);
    return (result.data as {token:string}).token;
}

const updateChatAvatar = async (newAvatar: FormData,chatId:number) => {
    const result = await chatApi.updateChatAvatar(newAvatar,chatId);
    const error = responseHasError(result);
    if (error) throw Error(error);
    await setStateCurrentChat(result.data as IChat);
    return result.data as IChat;
}

export {
    getChats,
    createChat,
    addChatUser,
    getChatUsers,
    deleteChatUsers,
    getChatToken,
    updateChatAvatar
}
