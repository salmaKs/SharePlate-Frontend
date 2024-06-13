import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../../theme/shared/components/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import { donation } from 'src/app/model/donation.model';
import {DonationService} from "../../../../service/donation.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  donation: donation | null = null;

  constructor(private donationService: DonationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const donationId = this.route.snapshot.paramMap.get('id');
    if (donationId) {
      this.donationService.getDonationById(+donationId).subscribe(
        (donation: donation) => {
          this.donation = donation;
        },
        (error) => {
          console.error('Error fetching donation details:', error);
        }
      );
    }
  }


}
