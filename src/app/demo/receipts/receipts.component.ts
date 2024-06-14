import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../../service/receipt.service";
import {receipt} from "../../model/receipt.model";
import {CardComponent} from "../../theme/shared/components/card/card.component";

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.scss'
})
export class ReceiptsComponent implements OnInit{
  receipts: Array<receipt>;
  searchInterval: any;
  searchWidth: number;
  searchWidthString: string;
  constructor(private receiptService: ReceiptService) {
  }

  ngOnInit():void{
this.getAllReceipts();
  }

  getAllReceipts(): void {
    this.receiptService.getAllReceipt().subscribe(
      (data: Array<receipt>) => {
        this.receipts = data;
        console.log('Receipts retrieved successfully', this.receipts);
      },
      (error) => {
        console.error('Error retrieving receipts', error);
      }
    );
  }

  searchByDate(dateR: Date): void {
    this.receiptService.getReceiptByDate(dateR).subscribe(
      (data: Array<receipt>) => {
        this.receipts = data;
        console.log('Receipts retrieved successfully for date:', dateR, this.receipts);
      },
      (error) => {
        console.error('Error retrieving receipts for date:', dateR, error);
      }
    );
  }

  performSearch(searchValue: string): void {
    const dateR = new Date(searchValue);
    if (!isNaN(dateR.getTime())) {
      this.searchByDate(dateR);
    } else {
      console.error('Invalid date format. Please use YYYY-MM-DD.');
    }
  }

  searchOff() {
    this.searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(this.searchInterval);
        // return false;
      }
      this.searchWidth = this.searchWidth - 30;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

}
