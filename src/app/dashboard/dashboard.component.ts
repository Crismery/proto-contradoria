import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  content?: string;
  navstyle = 'width: 0px;';

  private roles: string[]= [];
  isLoggedIn= false;
  showAdminBoard= false;
  username?: string;

  @ViewChild('myside') myside!: ElementRef;

  constructor(
    private router:Router,private userService: UserService, private storageService: StorageService, private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }


    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }




  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigateByUrl('/login')

        //window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openNav(): void{

    this.navstyle = 'width: 250px';

  }

  closeNav(): void{

    this.navstyle = 'width: 0px';

  }

}

