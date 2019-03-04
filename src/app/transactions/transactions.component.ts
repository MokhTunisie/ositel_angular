import {Component, OnInit} from '@angular/core';
import {TransactionApiService} from '../transaction-api.service';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})


export class TransactionsComponent implements OnInit {

// form variables
  months = [
    {num: '01', label: 'Janvier'},
    {num: '02', label: 'Fevrier'},
    {num: '03', label: 'Mars'},
    {num: '04', label: 'Avril'},
    {num: '05', label: 'Mai'},
    {num: '06', label: 'Juin'},
    {num: '07', label: 'Juiller'},
    {num: '08', label: 'Aout'},
    {num: '09', label: 'Septembre'},
    {num: '10', label: 'Octobre'},
    {num: '11', label: 'Novembre'},
    {num: '12', label: 'Decembr'}
  ];
  years = [];
  selectedYear = null;
  selectedMonth = null;

// pagination variables
  page = 1;
  perPage = 5;
  totalItems = 1;
  pages: number[] = [];

// api return variables
  monthlyTotal: object = {
    input : 0,
    output: 0
  };
  monthlyTreasury: object = {
    start : 0,
    end: 0
  };
  transactions: Transaction[] = [];

  constructor(private transactionApiService: TransactionApiService) {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedMonth = ('0' + (date.getMonth() + 1)).slice(-2);

    for (let i = this.selectedYear; (this.selectedYear - 50) <= i; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.paginate(this.page);
    this.initStats();
  }

  getMounthlyTransactions(event) {
    event.preventDefault();
    const target = event.target;
    this.selectedYear = target.querySelector('#year').value;
    this.selectedMonth = target.querySelector('#month').value;
    this.paginate(this.page);
    this.initStats();
  }

  initStats() {
    this.transactionApiService.monthlyTotal(this.selectedYear, this.selectedMonth).subscribe(data => {
      this.monthlyTotal = data;
    });

    this.transactionApiService.monthlyTreasury(this.selectedYear, this.selectedMonth).subscribe(data => {
      this.monthlyTreasury = data;
    });
  }

  paginate(page) {
    this.page = page;
    this.pages = [];
    this.transactionApiService.getMounthlyTransactions(this.selectedYear, this.selectedMonth, page).subscribe(data => {
      this.transactions = data['hydra:member'];
      this.totalItems = data['hydra:totalItems'];

      let inc = 1;
      if (this.totalItems > 0) {
        for (let i = 0; i <= this.totalItems; i += this.perPage) {
          this.pages.push(inc);
          inc++;
        }
      }
    });
  }

}
