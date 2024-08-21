import UserSettingsApi from "../api/user-settings.ts";
import {IPasswords, IUser} from "../modalTypes/modalTypes.ts";
import {responseHasError} from "../utils/api.utils.ts";
import {setStateUser} from "./app.ts";
import Router from "../helpers/router.ts";


const userApi=new UserSettingsApi('/user');

const  updateUserProfile=async (newUserData: IUser) => {
    const result= await userApi.changeUserProfile(newUserData);
    const error=responseHasError(result);
    if(error) throw Error(error);
    if(!error)setStateUser(result.data as IUser);

}
const  updateUserPassword=async (newUserPasswords: IPasswords) => {
    const result= await userApi.changeUserPassword(newUserPasswords);
    const error=responseHasError(result);
    if(error) throw Error(error);
    Router.getRouter().back();
}

const  updateUserAvatar=async (newAvatar:FormData) => {
    const result= await userApi.changeUserAvatar(newAvatar);
    const error=responseHasError(result);
    if(error) throw Error(error);
    setStateUser(result.data as IUser);
    return result.data as IUser;
}

const  searchUsersByLogin=async (login:string) => {
    const result= await userApi.searchUser(login);
    const error=responseHasError(result);
    if(error) throw Error(error);
    return result.data as IUser[];
}

export {
    updateUserProfile,
    updateUserPassword,
    updateUserAvatar,
    searchUsersByLogin
}
