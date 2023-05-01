import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../utils/app-config';
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    // public async getAll___(): Promise<MyModel[]> {
    //     const observable = this.http.get<MyModel[]>(appConfig.dataUrl);
    //     const data = await firstValueFrom(observable);
    //     return data;
    // }
    
}
