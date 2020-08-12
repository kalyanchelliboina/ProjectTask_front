import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() {

    this.auth.getapi().
      subscribe(
        err => console.log(err),
        res => console.log(res)
      )

    this.auth.getUsers().
    subscribe(
      err => console.log(err),
      res => console.log(res)
    )  
  }



}
