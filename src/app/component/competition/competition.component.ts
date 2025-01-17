import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ChampionshipService} from "../../service/championship.service";
import {Championship} from "../../modal/Championship";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent  implements OnInit {
  championships: Championship[] = [];
  newChampionship: Championship = {
    name: '',
    departureTime: '',
    percentage: 0
  };

  constructor(private championshipService: ChampionshipService , private route : ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
   this.loadData();
  }

  loadData(): void {
    this.championshipService.getAllChampionships().subscribe(championships => {
      this.championships = championships;
    });
  }

  addChampionship(): void {
    if (this.newChampionship.name && this.newChampionship.departureTime && this.newChampionship.percentage > 0) {
      console.log(this.newChampionship)
      this.championshipService.addChampionship(this.newChampionship).subscribe({
        next: (addedChampionship: Championship) => {
          this.championships.unshift(addedChampionship);
          this.newChampionship = { name: '', departureTime: '', percentage: 0 };
          (document.getElementById('my_modal_1') as any)?.close();
        },
        error: (error) => {
          if (error.status === 409 && error.error?.message) {
            alert(error.error.message);
          } else {
            alert('An unexpected error occurred.');
          }
        }
      });
    }
  }

  endChampionship(id: number | undefined) : void {
    this.championshipService.endChampionship(id).subscribe((data: any) => {
      console.log(data)
      this.loadData();
    })
 }

 StarteChampionship(id: number | undefined) : void {
    this.championshipService.starteChampionship(id).subscribe((data: any) => {
      console.log(data)
      this.loadData();
    })
 }

  moreInfo(id: number | undefined) : void {
    this.router.navigate(['/competition', id]);
  }
}
