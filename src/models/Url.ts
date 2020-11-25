import { url } from "inspector";

export class Url {
    originalUrl: string;
    urlHash: string;
    shortenedUrl: string;
    constructor(originalUrl: string, urlHash: string, shortenedUrl: string) {
        this.originalUrl = originalUrl;
        this.urlHash = urlHash;
        this.shortenedUrl = shortenedUrl;
    }
}