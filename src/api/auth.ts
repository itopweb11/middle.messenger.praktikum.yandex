import HTTPTransport from "../helpers/Http.ts";
import {IAuthData, IUser} from "../modalTypes/modalTypes.ts";

export class AuthApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string | null = null;

    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    public signUp(userData: IUser) {
      return this.httpTransport.post(this.baseUrl + '/signup', {data: userData});
    }

    public  signIn(userData: IAuthData) {
        return  this.httpTransport.post(this.baseUrl + '/signin', {data: userData});
    }
    public getAuthUser() {
        return  this.httpTransport.get(this.baseUrl + '/user');
    }
    public logOut() {
        return  this.httpTransport.post(this.baseUrl + '/logout');
    }
}

export default AuthApi
