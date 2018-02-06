import { HttpClient, HttpHandler, HttpInterceptor, HttpXhrBackend, ɵinterceptingHandler } from '@angular/common/http';
import { FORM_IGNORED_PROPERTIES_METADATA_KEY, GENESIS_METADATA_KEY } from '@genesis/$core/decorator/metadata/metadata';
import { omit } from 'lodash';

const httpVerbs = [ 'post', 'put', 'patch' ];

/**
 * Proxifies an instance of httpClient
 *
 * @param {HttpXhrBackend} xhr http handler
 * @param {HttpInterceptor[]} interceptors interceptors registered in HTTP_INTERCEPTORS
 * @returns {any} proxy of http client
 */
export const httpProxy = (xhr: HttpXhrBackend, interceptors: HttpInterceptor[]) => {
  /* WTF https://github.com/angular/angular/blob/5.1.x/packages/common/http/public_api.ts */
  // we registers http interceptors in a custom handler and user it on the new http client because, angular can't register
  // them automatically
  const handler: HttpHandler = ɵinterceptingHandler(xhr, interceptors);
  const client = new HttpClient(handler);
  return new Proxy(client, {
    get(target: HttpClient, key: string) {
      return (...args) => {
        // pre process all outgoing requests
        const processedArgs = preProcess(target, key, args);
        // then execute the real http client
        return client[ key ](...processedArgs);
      };
    }
  });
};

/**
 * Applies all pre processing process
 *
 * @param {HttpClient} target http client proxy instance
 * @param {string} key property called
 * @param {any[]} args args passed to the function if the property called is one
 * @returns {any[]} processed args
 */
function preProcess(target: HttpClient, key: string, args: any[]): any[] {
  const processedArgs: any[] = [ ...args ];
  // only process put, post, patch methods
  if (httpVerbs.includes(key) && args.length > 1) {
    // arg [0] is the endpoint called, arg [1] is the body, arg[2] are the options if present
    processedArgs[ 1 ] = handleBody(args[ 1 ]);
  }
  // returns the processed args
  return processedArgs;
}

/**
 * Handles the body of put, post, patch requests.
 * Removes all 'ignored' properties from the final object which will be send to backend
 * @param body body parameter
 * @returns {Object} transformed body
 */
function handleBody(body: any): Object {
  let result;
  // gets application custom metadata
  const metadata = body.constructor.prototype[ GENESIS_METADATA_KEY ];
  if (metadata) {
    // clean the body
    result = omit(body, metadata[ FORM_IGNORED_PROPERTIES_METADATA_KEY ]);
  }
  // then returns it
  return result;
}
