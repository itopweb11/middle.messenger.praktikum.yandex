// Импортируем интерфейс IUser для работы с данными пользователя
import { IUser } from "../typesModels/typesModels.ts";

// Функция для получения имени пользователя
export const getUserName = (user: IUser, fullName?: boolean) => {
    // Формируем полное имя из имени и фамилии
    const _fullName = `${user.first_name} ${user.second_name}`;

    // Если параметр fullName истинный, возвращаем полное имя
    if (fullName) return _fullName;
    // В противном случае возвращаем отображаемое имя или полное имя, если отображаемое имя отсутствует
    else return user.display_name || _fullName;
}