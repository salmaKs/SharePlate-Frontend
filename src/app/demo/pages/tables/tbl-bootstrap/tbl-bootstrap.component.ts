import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DonationService } from "../../../../service/donation.service";
import { Observable } from "rxjs";
import { donation, donationType } from "../../../../model/donation.model";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
})
export default class TblBootstrapComponent implements OnInit {
  donations: donation[] = [];
  filteredDonations: donation[];
  cin: string;
  protected searchDonationType: donationType;
  showDeleteButton: boolean = false;


  constructor(private donationService: DonationService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDonations();
  }

  getAllDonations() {
    this.donationService.getAllDonations().subscribe(
      (donations: donation[]) => {
        this.donations = donations;
        this.filteredDonations = donations;
      },
      (error) => {
        console.error('Error fetching donations:', error);
      }
    );
  }
  getDonationsByCIN(): void {
    if (this.cin) {
      this.showDeleteButton = true; // Set the flag to true when CIN is provided
      this.donationService.getAllDonationByCin(parseInt(this.cin)).subscribe(
        (data: donation[]) => {
          this.filteredDonations = data;
        },
        (error) => {
          console.error('Error fetching donations by CIN:', error);
        }
      );
    } else {
      // Handle case where CIN is not provided
      console.error('CIN is required.');
    }
  }

  deleteDonation(id: number): void {
    this.donationService.deleteDonation(id).subscribe(
      () => {
        // Success: Remove the deleted donation from the filteredDonations array
        this.filteredDonations = this.filteredDonations.filter(d => d.id !== id);
      },
      (error) => {
        console.error('Error deleting donation:', error);
      }
    );
  }


  viewDetails(donationId: number) {
    this.router.navigate(['/details', donationId]);
  }

  obtainDonation(donation: donation) {
    this.router.navigate(['/receipts', donation.id]);
  }


  search(): void {
    if (this.searchDonationType) {
      this.donationService.getDonationByType(this.searchDonationType).subscribe(
        (data: donation[]) => {
          this.filteredDonations = data;
        },
        (error) => {
          console.error('Error searching donations by type', error);
        }
      );
    } else {
      // If search query is empty, show all donations
      this.filteredDonations = this.donations;
    }
  }
}
