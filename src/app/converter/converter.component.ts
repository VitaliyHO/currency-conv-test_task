import { Component, Input, OnInit } from '@angular/core';
import { CurrenciesService } from '../services/currencies.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit{

  currencies: any[] = [
    { name: 'USD' },
    { name: 'EUR' },
    { name: 'PLN' },
    { name: 'GBP' },
    { name: 'UAH' }
  ];

  firstCurName: string = 'USD';
  firstCurNumber: number = 1;
  firstCurRates: any = {};

  secondCurName: string = 'USD';
  secondCurNumber: number = 1;
  secondCurRates: any = {};


  constructor(private currenciesService: CurrenciesService) { }

  ngOnInit(): void {
    this.currenciesService.getUSD().subscribe(currencies => {
      this.firstCurRates = currencies.conversion_rates;
      this.secondCurRates = currencies.conversion_rates;
      
    })
  }

  firstCurrency(name: string) {
    this.currenciesService.getCurrency(name).subscribe(currencies => {
      this.firstCurName = name;
      this.firstCurRates = currencies.conversion_rates;
      const secondNumber = this.findCorrelation(this.firstCurRates, this.secondCurName);
      this.countFirstValue(this.firstCurNumber, secondNumber);

    })

  };

  secondCurrency(name: string) {
    this.currenciesService.getCurrency(name).subscribe(currencies => {
      this.secondCurName = name;
      this.secondCurRates = currencies.conversion_rates;
      const secondNumber = this.findCorrelation(this.secondCurRates, this.firstCurName);
      this.countSecondValue(this.secondCurNumber, secondNumber);

    })

  };

  onFirstInput(value: number) {
    this.firstCurNumber = value;
    const firstNum = this.firstCurNumber;
    const secondName = this.secondCurName;
    const secondNum = this.findCorrelation(this.firstCurRates, secondName)
    this.countFirstValue(firstNum, secondNum);
  };

  onSecondInput(value: number) {
    this.secondCurNumber = value;
    const firstNum = this.secondCurNumber;
    const secondName = this.firstCurName;
    const secondNum = this.findCorrelation(this.secondCurRates, secondName);
    this.countSecondValue(firstNum, secondNum);
  };

  findCorrelation(obj: object, name: string) {
    const currencyData: any = Object.entries(obj).find(el => el[0] === name);
    return currencyData[1];
  }

  countFirstValue(x: number, y: number) {
    return this.secondCurNumber = x * y;
  };

  countSecondValue(x: number, y: number) {
    this.firstCurNumber = x * y;
    return 
  }
}
