export interface Rate {
  date: string;
  rates: {
    code: string;
    rate: number;
  }[];
}
