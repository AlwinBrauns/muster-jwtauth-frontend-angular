import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtHeaderInterceptor} from "./jwt-header.interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtHeaderInterceptor,
    multi: true
  }
]
