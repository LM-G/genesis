import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

enum RequestType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

const VOID_BODY_TOKEN = 'VOID_BODY';

@Injectable()
export class GenesisHttp {
  constructor(private http: HttpClient) {
  }

  /**
   * GET request
   */
  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(endPoint, options);
  }

  /**
   * POST request
   */
  public post<T>(endPoint: string, body: any, options?: IRequestOptions): Observable<T> {
    this.preProcess();
    return this.http.post<T>(endPoint, body, options);
  }

  /**
   * PUT request
   */
  public put<T>(endPoint: string, body: any, options?: IRequestOptions): Observable<T> {
    this.preProcess();
    return this.http.put<T>(endPoint, body, options);
  }

  /**
   * PATCH request
   */
  public patch<T>(endPoint: string, body: any, options?: IRequestOptions): Observable<T> {
    this.preProcess();
    return this.http.patch<T>(endPoint, body, options);
  }

  /**
   * DELETE request
   */
  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(endPoint, options);
  }

  private preProcess() {

  }
}