export interface IColumns {
    id: string;
    name: string;
    width: string | number;
}

export interface Journey {
    id: number;
    time: string;
    journey: string;
    platform: string;
    favorite?: boolean;
    [key: string]: any; 
}