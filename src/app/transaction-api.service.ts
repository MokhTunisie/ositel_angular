import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transaction} from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getMounthlyTransactions(year, month, page = '1') {
    const url = this.baseUrl + '/monthly-transactions';

    const params = new HttpParams().set('year', year).set('month', month).set('page', page);

    return this.httpClient.get<Transaction>(url, {
      params
    });
  }


  monthlyTotal(year, month) {
    const url = this.baseUrl + '/monthly-stats';

    const params = new HttpParams().set('year', year).set('month', month);

    return this.httpClient.get<object>(url, {
      params
    });
  }

  monthlyTreasury(year, month) {
    const url = this.baseUrl + '/monthly-treasury';

    const params = new HttpParams().set('year', year).set('month', month);

    return this.httpClient.get<object>(url, {
      params
    });
  }
}
