// WooCommerce TypeScript Definitions

declare module "@woocommerce/woocommerce-rest-api" {
  interface WooCommerceRestApiOptions {
    url: string;
    consumerKey: string;
    consumerSecret: string;
    wpAPIPrefix?: string;
    version?: string;
    encoding?: string;
    queryStringAuth?: boolean;
    port?: string;
    timeout?: number;
    axiosConfig?: Record<string, any>;
  }

  type RequestParams = Record<string, any>;

  export default class WooCommerceRestApi {
    constructor(opt: WooCommerceRestApiOptions);
    get(endpoint: string, params?: RequestParams): Promise<any>;
    post(endpoint: string, data: any, params?: RequestParams): Promise<any>;
    put(endpoint: string, data: any, params?: RequestParams): Promise<any>;
    delete(endpoint: string, params?: RequestParams): Promise<any>;
    options(endpoint: string, params?: RequestParams): Promise<any>;
  }

  export class OptionsException extends Error {
    constructor(message: string);
  }
}
