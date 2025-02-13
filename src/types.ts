export interface Dog {
  id: string; // Unique identifier for the dog
  img: string; // URL to an image of the dog
  name: string; // Name of the dog
  age: number; // Age of the dog (in years)
  zip_code: string; // ZIP code of the dog's location
  breed: string; // Breed of the dog
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Match {
  match: string;
}

export interface SearchDogsRequest {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}
