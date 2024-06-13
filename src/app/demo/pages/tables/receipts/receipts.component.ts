import { Component, OnInit } from '@angular/core';
import { donation } from 'src/app/model/donation.model';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';
import { NgIf } from '@angular/common';
import { DonationService } from '../../../../service/donation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { receipt } from '../../../../model/receipt.model';
import { ReceiptService } from '../../../../service/receipt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [
    FormsModule,
    CardComponent,
    NgIf
  ],
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {
  donation: donation | null = null;
  quantity: number = 0;
  maxQuantity: number = 0;
  currentDate: Date = new Date();
  pickupDate: Date = new Date();
  unit: string;

  constructor(
    private donationService: DonationService,
    private route: ActivatedRoute,
    private receiptService: ReceiptService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const donationId = this.route.snapshot.paramMap.get('id');
    if (donationId) {
      this.donationService.getDonationById(+donationId).subscribe(
        (donation: donation) => {
          this.donation = donation;
          this.maxQuantity = donation.quantity;
          this.unit = donation.unit;
          this.pickupDate.setDate(this.currentDate.getDate() + 3); // Set pickup date to 3 days from now
        },
        (error) => {
          console.error('Error fetching donation details:', error);
        }
      );
    }
  }

  submitReceipt() {
    const donationId = this.route.snapshot.paramMap.get('id'); // Get donation ID from the URL
    if (donationId && this.quantity > 0 && this.quantity <= this.maxQuantity) {
      const newReceipt: { unit: string; quantity: number; dateReceived: Date; donation: donation } = {
        quantity: this.quantity,
        unit: this.unit,
        dateReceived: this.pickupDate,
        donation: this.donation!
      };

      this.receiptService.addReceipt(newReceipt, +donationId).subscribe(
        (receipt: receipt) => {
          console.log('Receipt added:', receipt);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'donation done successfully',
            showConfirmButton: false,
            timer: 3000
          }); // Redirect to a success page or wherever you need
        },
        (error) => {
          console.error('Error adding receipt:', error);
        }
      );
    } else {
      console.error('Invalid quantity selected');
    }
  }
}
