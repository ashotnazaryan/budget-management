export interface Rate {
  date: string;
  rates: {
    code: string;
    value: number;
  }[];
}
