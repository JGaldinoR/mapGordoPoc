import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { map, mergeMap, filter, catchError} from 'rxjs/operators';
import { Observable, forkJoin, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mockDataUrl:string = 'https://jsonplaceholder.typicode.com/users';
  startWarsUrl: string = 'https://swapi.co/api/';

  constructor(
    private http :HttpClient,
  ) { }

  getStarWarsPerson() {
    return this.http.get<any>(this.startWarsUrl + 'people/1')
    .pipe(
      map(array => {
        console.log('Array: ', array);
        return array;
      })
    )
  }

  getPlanet() {
    let character = this.http.get('https://swapi.co/api/people/1');
    let characterHomeworld = this.http.get('https://swapi.co/api/planets/1');
    return forkJoin([character, characterHomeworld]);
    //forkJoin([character, characterHomeworld]).subscribe(results => {
  }

  getMergeMap() {
    let observableData: Observable<any>;
    return this.http.get(this.startWarsUrl + 'people/1').pipe(
      // first map all the observales make an array for API calls
      mergeMap(values => {
        console.log('Values: ', values);
        
        let apiArray:any = values.films.map((eachValue) => {
          console.log('EachValue: ', eachValue);
          
          return this.http.get(eachValue)
        })
        // now you have to make API calls
        return forkJoin(...apiArray).pipe(
          map(apiData => {
            console.log('Api Data: ', apiData);
            
            // values.films.forEach((eachOriginalValue, index) => {
            //   eachOriginalValue.data = apiData[index].name
            // });
            return apiData;
          }),
          
          catchError((e) => {
              console.log("error", e);
              return of(e)
          })
        )
        
      })
    );
    // return this.http.get(this.startWarsUrl + 'people/1')
    // .pipe(
    //   forkJoin(...element.homeworld).pipe(

    //   )
      //map(element => element.homeworld),
      // mergeMap((element) => {
      //   let apiArray = element
      // }
      //this.http.get(element.homeworld)),
      //filter(element => element)
       
      // mergeMap(character => {
      //   return forkJoin(
      //     [
      //     this.http.get(character.films[0]),
      //     this.http.get(character.films[1]),
      //     this.http.get(character.films[3])
      //     ])
        
      // })
      // mergeMap(character => 
      //   this.http.get(character.homeworld).pipe(
      //     map(data => {
      //       console.log('Character, ', character);
      //       console.log('Inside Data: ', data);
      //       return data;
            
      //     })
      //   )
      //   ),
      //   mergeMap(character => 
      //     this.http.get(character.films[0]).pipe(
      //       map(data => {
      //         console.log('Character, ', character);
      //         console.log('Inside Data: ', data);
      //         return data;
      //       })
      //     )
      //     )
    //)
    // this.homeworld = this.http.get('/api/people/1').pipe(
    //   mergeMap(character => this.http.get(character.homeworld))
  }

  getUser() {
    //This is a development change
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

  getAllUsers() {
    return this.http.get<any>(this.mockDataUrl)
    .pipe(
      map(element => element),
      
    )
  }
}
