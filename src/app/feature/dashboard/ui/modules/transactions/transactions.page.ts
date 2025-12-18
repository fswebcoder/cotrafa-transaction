import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Transacciones</h1>
      <p>Realiza tus transferencias y pagos aquí.</p>
    </div>
  `
})
export class TransactionsPage {}
