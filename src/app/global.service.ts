import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { 

  }

  getstate():Observable<any>{
    return this.http.get('https://nga-states-lga.onrender.com/fetch')
  }

  getLGAbyStateCode(state:string):Observable<any>{
    // return this.http.get(`https://nigeria-states-towns-lgas.onrender.com/api/${code}/lgas`)
    return this.http.get(`https://nga-states-lga.onrender.com/?state=${state}`)
  }

  saveData(key:string, value:string){
    localStorage.setItem(key, JSON.stringify(value)), FormData
  }

  getData(key:string){
    return JSON.parse(localStorage.getItem(key) !)
  }

  // update() {
  //   const value = JSON.parse(localStorage.getItem('formEntries') || '')
  //   let  selectedIndex = value.findIndex((a:recordsModel) => a.id === this.existingId)
  //   if(selectedIndex > -1) {
  //     value[selectedIndex] = this.myForm.value
  //   }
  // }
}
