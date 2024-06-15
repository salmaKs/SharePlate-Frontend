import {Component, OnInit} from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {DonationService} from "../../../../service/donation.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {donationType} from "../../../../model/donation.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss'],
})
export default class BasicElementsComponent implements OnInit {
  donationForm: FormGroup;
  donationTypes = Object.values(donationType);

  constructor(private fb: FormBuilder, private donationService: DonationService, private router: Router) {

  }

  ngOnInit(): void {
    this.donationForm = this.fb.group({
      donationType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      availability: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      description: [''],
      donor: this.fb.group({
        CIN: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        nom: ['', Validators.required]
      }),
      review: this.fb.array([])
    });
  }

  onSubmit(): void {
    if (this.donationForm.valid) {
      const donationData = this.donationForm.value;
      const donorCIN = donationData.donor.CIN;
      console.log(donorCIN);
      console.log(donationData);

      this.donationService.addDonation(donationData, donorCIN).subscribe(
        response => {
          console.log('Donation successfully added', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'donation done successfully',
            showConfirmButton: false,
            timer: 3000
          });
          this.donationForm.reset();
        },
        error => {
          console.error('Error adding donation', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
