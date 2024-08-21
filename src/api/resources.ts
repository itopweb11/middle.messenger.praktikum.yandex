import HTTPTransport from "../helpers/Http.ts";

export class ResourcesApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string = '/resources';

    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

   public uploadResource(file: FormData) {
        return this.httpTransport.post(this.baseUrl, {data: file});
    }
}

export default ResourcesApi
