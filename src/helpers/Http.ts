import {queryStringify} from "../utils/string.utils.ts";
import {BASE_API_URL} from "../config.ts";

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type IOptionsRequest = {
    method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
    headers?: Record<string, string>;
    data?: object;
    timeout?: number;
    params?: object;
}

export type IResult={
    status:number;
    data:object
}

type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<IResult>

/*function queryStringify(data: object) {
    let result = '?';
    result = result + Object.entries(data).map(([key, value]) => {
        return `${key}=${Array.isArray(value) ? value.join(',') : String(value)}`
    }).join("&")
    return result;
}*/

class HTTPTransport {
    private readonly baseUrl:string=''
    constructor(base_url?:string) {
        this.baseUrl=base_url||BASE_API_URL;
    }

    get: HTTPMethod = (url, options = {}):Promise<IResult> => {
        return this.request(this.baseUrl+url+queryStringify(options.params as NonNullable<unknown> || {}) || '', {
            ...options,
            method: METHODS.GET
        }, options.timeout)as Promise<IResult> ;
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(this.baseUrl+url, {...options, method: METHODS.PUT}, options.timeout) as Promise<IResult>;
    };
    post: HTTPMethod = (url, options = {}) => {
        return this.request(this.baseUrl+url, {...options, method: METHODS.POST}, options.timeout) as Promise<IResult>;
    };
    delete: HTTPMethod = (url, options = {}) => {
        return this.request(this.baseUrl+url, {...options, method: METHODS.DELETE}, options.timeout) as Promise<IResult>;
    };

    request = (url: string, options: IOptionsRequest = {method: METHODS.GET}, timeout = 5000) => {
        const {method, data,headers} = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.timeout = timeout;
            xhr.open(method || METHODS.GET, url);

            if (headers) {
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }


            xhr.onload = function () {
                if(xhr.getResponseHeader('content-type')?.includes('application/json'))
                {
                    const resultData ={status: xhr.status, data:JSON.parse( xhr.responseText)};
                    resolve(resultData);
                }
                else resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            }
            else if( data instanceof FormData){
                xhr.send(data);
            }
            else {
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send(JSON.stringify(data));
            }
        });

    };
}

export default HTTPTransport;
