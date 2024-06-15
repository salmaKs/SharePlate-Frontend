import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { gouvTun, role, typeDonor, user } from '../../../../model/user.model';
import { UserService } from '../../../../service/user.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [FormsModule, NgForOf, RouterLink],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export default class AuthSignupComponent implements OnInit {
  newUser: user = {
    nom: '',
    prenom: '',
    dateNaissance: null,
    mail: '',
    role: role.donor,
    typeDonor: typeDonor.person,
    tel: null,
    password: '',
    CIN: null,
    gouvTun: gouvTun.Ariana,
    receipts: [],
    donations: [],
  };
  gouvTunValues: string[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.gouvTunValues = this.getGovTunValues();
  }

  signUp(): void {
    // Check if the user already exists
    this.userService.userExistAll(this.newUser).subscribe(
      (userExists) => {
        if (!userExists) {
          // User does not exist, proceed with registration
          this.userService.addUser(this.newUser).subscribe(
            (response) => {
              console.log('User registered successfully!', response);
              this.router.navigate(['/auth/signin']);
            },
            (error) => {
              console.error('Error registering user:', error);
              // Handle error messages or show them to the user
            }
          );
        } else {
          // User already exists, display an error message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User already exists!',
          });
        }
      },
      (error) => {
        console.error('Error checking user existence:', error);
        // Handle error messages or show them to the user
      }
    );
  }

  getGovTunValues(): string[] {
    return Object.values(gouvTun).filter((value) => typeof value === 'string');
  }
}
