import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from '../models/business';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient){}

  addBusiness(business: Business) {
    console.log(business)
    return this.http
      .post(`${this.uri}/add`, business)
      .pipe(
        map( (business: any) => {
          if (business) {
            console.log('business Created with success');
          }
        })
      );
  }
  
  getAll() {
    return this.http.get<Array<Business>>(`${this.uri}`);
  }

  getById(id: String | any) {
    return this.http.get<Business>(`${this.uri}/edit/${id}`);
  }

  editBusiness(id: String, business: Business) {
    console.log(business)
    return this.http
      .post(`${this.uri}/update/${id}`, business)
      .pipe(
        map( (business: any) => {
          if (business) {
            console.log('business update with success');
          }
        })
      );
  }

  deleteBusiness(id: String) {
    return this.http
      .get(`${this.uri}/delete/${id}`);
  }

}
