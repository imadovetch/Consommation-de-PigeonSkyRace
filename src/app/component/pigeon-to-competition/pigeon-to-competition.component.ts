import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionshipService } from '../../service/championship.service';
import { Championship } from '../../modal/Championship';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PigeonService } from "../../service/pigeon.service";
import { Pigeon } from "../../modal/pigeon";
import {CompetitionPigeon} from "../../modal/CompetitionPigeon";

@Component({
  selector: 'app-pigeon-to-competition',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './pigeon-to-competition.component.html',
  styleUrls: ['./pigeon-to-competition.component.css']
})
export class PigeonToCompetitionComponent implements OnInit {
  id: number | undefined;
  championships: Championship[] = [];
  PigeonsCompetition: any = [];
  pigeons: Pigeon[] = [];
  selectedChampionship: Championship | undefined;

  searchTerm: string = '';
  options: string[] = [];
  filteredOptions: string[] = [];
  showDropdown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private championshipService: ChampionshipService,
    private pigeonService: PigeonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : undefined;
      console.log('Received ID:', this.id);

      if (this.id !== undefined) {
        this.fetchCompetitionData(this.id);
      }
    });

    this.loadData();
    this.loadPigeons();
    this.loadPigeonsCompetition();
  }

  loadPigeons(): void {
    this.pigeonService.getAllPigeons(56331).subscribe(pigeons => {
      this.pigeons = pigeons;
      console.log(pigeons);
      this.options = this.pigeons.map(pigeon => pigeon.ringNumber);
      this.filteredOptions = [...this.options];
    });
  }

  loadPigeonsCompetition(): void {
    // @ts-ignore
    this.championshipService.getAllPigeonsCompetition().subscribe((pigeons: CompetitionPigeon[]) => {
      this.PigeonsCompetition = pigeons;
      this.filterPigeonsByCompetitionId();  // Filter after loading data
    });
  }
  filteredPigeons: CompetitionPigeon[] = [];

  filterPigeonsByCompetitionId(): void {
    this.filteredPigeons = this.PigeonsCompetition.filter((pigeon : any) => pigeon.competition.id === this.id);
    console.log('Filtered Pigeons:', this.filteredPigeons);
  }

  fetchCompetitionData(id: number): void {
    console.log('Fetching data for competition ID:', id);
    this.selectedChampionship = this.championships.find(champ => champ.id === id);

    if (!this.selectedChampionship) {
      console.error('Championship not found!');
    }
  }

  loadData(): void {
    this.championshipService.getAllChampionships().subscribe(championships => {
      this.championships = championships;
      console.log(championships)
      if (this.id !== undefined) {
        this.fetchCompetitionData(this.id);
      }
    });
  }

  filterOptions(): void {
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      String(option).toLowerCase().includes(searchLower)
    );
  }


  selectOption(option: string): void {
    if (this.id !== undefined) {
      const payload = {
        competition: { id: this.id.toString() },
        pigeon: { ringNumber: option }
      };

      this.championshipService.addPigeonToCompetition(payload).subscribe({
        next: (response) => {
          console.log('Pigeon added to competition successfully:', response);
       //   this.searchTerm = option;
          this.showDropdown = false;
          this.filteredOptions = [...this.options];
          this.loadPigeonsCompetition();

          this.options = this.options.filter(op => op !== option);
          this.filteredOptions = this.options;

          console.log('Updated options after removal:', this.options);
        },
        error: (err) => {
          console.error('Failed to add pigeon to competition:', err);
        }
      });
    } else {
      console.error('Competition ID is undefined!');
    }
  }


}
