import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Pigeon} from "../../modal/pigeon";
import {PigeonService} from "../../service/pigeon.service";


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pigeons: Pigeon[] = [];
  newPigeon : Pigeon = {
    ringNumber: '',
    gender: '',
    age: 0,
    color: '#000000'
  };

  constructor(private pigeonService : PigeonService) {
  }

  ngOnInit(): void {
  this.loadData();
  }

  loadData(): void {
    this.pigeonService.getAllPigeons().subscribe(pigeons => {
      this.pigeons = pigeons;
    });
  }


  addPigeon() {
    if (this.newPigeon.ringNumber && this.newPigeon.gender && this.newPigeon.age && this.newPigeon.color) {
      this.pigeonService.addPigeon(this.newPigeon).subscribe({
        next: (addedPigeon: Pigeon) => {
          this.pigeons.unshift(addedPigeon);
          this.newPigeon = { ringNumber: '', gender: '', age: 0, color: '#000000' };
          (document.getElementById('my_modal_1') as any)?.close();
        },
        error: (error) => {
          if (error.status === 409 && error.error?.message) {
            alert(error.error.message);
          } else {
            alert("An unexpected error occurred.");
          }
        }
      });
    }
  }





}
