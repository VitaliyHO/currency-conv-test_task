import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CurrenciesService {
    API_KEY: string = '11637fa0822b25c1d9d7fb8c';

    constructor(private http: HttpClient) {
    }

    getUSD(): Observable<any> {
        return this.http.get(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/USD`)
    }

    getEUR(): Observable<any> {
        return this.http.get(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/EUR`)
    }
}