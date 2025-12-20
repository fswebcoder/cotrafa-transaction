import { Component } from '@angular/core';
import { TransactionSmart } from '../transaction-smart/transaction-smart';

@Component({
  selector: 'cf-transaction-page',
  imports: [TransactionSmart],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.scss',
})
export class TransactionPage {

}
