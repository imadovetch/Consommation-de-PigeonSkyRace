import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../service/profile.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private profileservice : ProfileService) {
  }

  ngOnInit(): void {
    this.profileservice.getUser().subscribe(user => {console.log(user)})
  }



}
