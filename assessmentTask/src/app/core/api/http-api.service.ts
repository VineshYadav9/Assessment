/**
 * Created by Vinesh Yadav
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { config } from  '../../config';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.error);
  }

  public post(url, body, contentType?): Promise<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', contentType || "application/json");
    return this.http.post(config.REST_API_URL + url, body, {headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public get(url, accept?): Promise<any> {
    let headers = new HttpHeaders();
    headers.append('accept', accept || "application/json");
    return this.http.get( config.REST_API_URL +url, {headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public put(url, body, contentType?): Promise<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', contentType || "application/json");
    return this.http.put( config.REST_API_URL +url, body, {headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public delete(url): Promise<any> {
    return this.http.delete(config.REST_API_URL +url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
