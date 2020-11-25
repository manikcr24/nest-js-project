import { Injectable } from '@nestjs/common';
import { Url } from './models/Url';
const short = require('short-uuid');

@Injectable()
export class AppService {
  urls: Url[] = []
  urlHashMap: Map<string, string> = new Map();
  mainUrl: string = 'https://configurable-shortened-url-domain/'
  constructor() {}

  addUrl(url: string): Url[] {
    if(this.urlHashMap.get(url) != null) 
      return this.urls;
    let originalUrl: string = url;
    let urlHash : string = short.generate();
    let shortenedUrl: string = this.mainUrl+urlHash;
    
    this.urlHashMap.set(url, urlHash);
    this.urls.push(new Url(originalUrl, urlHash, shortenedUrl));
    return this.urls;
  }

  getUrl(hash: string): Url {
    let url: Url = new Url("No Url Exist With Given Hash", hash, "Invalid Hash");
    for(let ind=0;ind<this.urls.length;ind++) {
      if(this.urls[ind].urlHash == hash) {
        url = this.urls[ind];
        break;
      }
    }
    return url;
  }

  getUrls(): Url[] {
    return this.urls;
  }

  deleteUrl(hash: string): Url[] {
    let index = 0;
    let found: boolean = false;
    for(let ind = 0;ind<this.urls.length; ind++) {
      if(this.urls[ind].urlHash == hash) {
        index = ind;
        found = true;
        break;
      }
    } 
    if(!found) return this.urls;
    return this.urls.splice(index, 1);
  }

  setUrl(hash: string, newUrl: string): Url[] {
    
    this.urls.forEach(url => {
      if(url.urlHash == hash) {
        url.originalUrl = newUrl;
      }
    })
    return this.urls;
  }
}
