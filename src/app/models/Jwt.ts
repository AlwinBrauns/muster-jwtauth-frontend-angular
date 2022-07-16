import {HttpHeaders} from "@angular/common/http";

export namespace Jwt {
  export const API_URL: string = "http://localhost:8080/api/"
  export function getHeader(): any {
    return {
      headers:
        new HttpHeaders()
          .set("Authorization", "Bearer " + JSON.parse(<string>localStorage.getItem('user'))?.token)
    }
  }
}
