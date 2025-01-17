import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../api-config';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Championship } from '../modal/Championship';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ChampionshipService {
  private apiUrl = `${API_CONFIG.BASE_URL}/Api/Competition`;
  private apiUrl2 = `${API_CONFIG.BASE_URL}/Api/CompetitionPigeon`;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  getAllChampionships(): Observable<Championship[]> {
    return this.http.get<Championship[]>(`${this.apiUrl}`);
  }

  getAllPigeonsCompetition(): Observable<Championship[]> {
    return this.http.get<Championship[]>(`${this.apiUrl2}`);
  }

  addChampionship(data: Championship): Observable<Championship> {
    const formattedDate = this.datePipe.transform(data.departureTime, 'yy/MM/dd HH:mm:ss');

    if (formattedDate) {
      const requestData = {
        ...data,
        departureTime: formattedDate,
      };

      console.log('Formatted Date:', formattedDate);
      return this.http.post<Championship>(`${this.apiUrl}`, requestData);
    } else {
      throw new Error('Failed to format departureTime. Invalid date provided.');
    }
  }

  starteChampionship(id: number | undefined): Observable<Championship> {
    return this.http.get<Championship>(`${this.apiUrl2}/${id}/Start-competition`);

  }
  endChampionship(id: number | undefined): Observable<Championship> {
    return this.http.get<Championship>(`${this.apiUrl}/End-Competition/${id}`);

  }

  addPigeonToCompetition(payload: { competition: { id: string }; pigeon: { ringNumber: string } }) {
    return this.http.post(`${this.apiUrl2}/AddPigeonToCompetition`,payload);
  }


}
