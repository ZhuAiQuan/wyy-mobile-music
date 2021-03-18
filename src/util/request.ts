import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const timeout: number = 10 * 1000;

interface Config {
  baseURL: string;
  timeout: number;
  headers: Queue<any>;
}
interface Queue<T> {
  [propName: string]: T;
}

class HttpRequest {
  private baseUrl: string;
  private queue: Queue<boolean>;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  // 获取配置
  getInsideConfig(): Config {
    return {
      baseURL: this.baseUrl,
      timeout,
      headers: {
        //
      }
    };
  }
  // 销毁请求
  destroy(url: string): void {
    delete this.queue[url];
  }
  // 请求拦截
  interceptors(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use(
      (config: any) => {
        this.queue[url] = true;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        this.destroy(url);
        const data = res.data;
        return data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
  // 请求方法
  request(options: any) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

export default HttpRequest;
