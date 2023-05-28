import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../services/currencies.service';
import { currencies } from '../data/curencies';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  // currencies: any = {};
  USD: number = 0;
  EUR: number = 0;
  loading = false;
  successfulLoading = false;

  constructor(private currenciesService: CurrenciesService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.currenciesService.getUSD().subscribe(currencies => {
      // this.currencies = currencies.conversion_rates;
      this.USD = currencies.conversion_rates.UAH;
      this.loading = false;
      this.successfulLoading = true;
      // console.log(this.currencies, '|||||||||||||CUR|||||||||||||');
    })
    this.currenciesService.getEUR().subscribe(currencies => {
      this.EUR = currencies.conversion_rates.UAH;
      this.loading = false;
      this.successfulLoading = true;
      console.log(this.EUR, '|||||||||||||CUR|||||||||||||');
    })
    // throw new Error('Method not implemented.');
  }

}
