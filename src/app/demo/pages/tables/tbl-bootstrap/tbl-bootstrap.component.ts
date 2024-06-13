import {Component, OnInit} from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {DonationService} from "../../../../service/donation.service";
import {Observable} from "rxjs";
import {donation} from "../../../../model/donation.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
})
export default class TblBootstrapComponent implements OnInit{
  donations: donation[] = [];
  constructor(private donationService: DonationService, private router: Router,) {
  }

  ngOnInit():void {
    this.AllDonations();
  }
  AllDonations(){
    this.donationService.getAllDonations().subscribe(
      (donations: donation[]) => {
        this.donations = donations;
      },
      (error) => {
        console.error('Error fetching donations:', error);
      }
    );
  }
  viewDetails(donationId: number) {
    this.router.navigate(['/details', donationId]);
  }

  obtainDonation(donation: donation) {
    this.router.navigate(['/receipts', donation.id]);
  }
}
