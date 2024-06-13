import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { UserService } from '../../../../service/user.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent implements OnInit {
  mail: string = '';
  pwd: string = '';
  showErrorMessage: boolean = false; // Variable to control the visibility of the error message

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  userExist(mail: string, pwd: string) {
    this.userService.UserExist(this.mail, this.pwd).subscribe(
      (exists: boolean) => {
        if (exists) {
          console.log('User exists');
          // Redirect to the bootstrap page
          this.router.navigate(['/tables/bootstrap']);
        } else {
          console.log('User does not exist');
          // Show error message
          this.showErrorMessage = true;
        }
      },
      (error) => {
        console.error('Error checking user existence:', error);
        // Show error message
        this.showErrorMessage = true;
      }
    );
  }
}
