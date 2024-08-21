import {IUser} from "../modalTypes/modalTypes.ts";

export const getUserName=(user:IUser,fullName?:boolean)=>{
    const _fullName=`${user.first_name} ${user.second_name}`;
    if(fullName)return _fullName;
    else return user.display_name||_fullName;
}
