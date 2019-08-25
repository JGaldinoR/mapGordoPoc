import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mockDataUrl:string = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http :HttpClient,
  ) { }

  getUser() {
    //Master test
    return this.http.get<any>(this.mockDataUrl)
    .pipe(
      map((array)=> {
        console.log('Response: ', array);
        return array.map(object => ({
          codigo: object.id,
          nombre: object.name,
          usuario: object.username
        }));
      })
    );
  }
}
