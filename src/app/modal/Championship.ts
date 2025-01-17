export interface Championship {
  name: string;
  departureTime: string;
  percentage: number;
  id?: number;
  latitude?: number;
  longitude?: number;
  pigeonTotal?: number;
  pigeonCount?: number;
  status?: boolean;
  started?: true;
  distance?: number;
  pigeons?: []
}
