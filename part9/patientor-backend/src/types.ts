export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};
// export type Diagnose = Pick<DiagnoseEntry, 'code' | 'name'>[];
