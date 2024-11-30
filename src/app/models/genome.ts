export class Genome {
  CHROM: string;
  POS: string;
  ID: string | null;
  REF: string;
  ALT: string;
  QUAL: string;
  FILTER: string;
  INFO: string;
  FORMAT: string;
  outputs: { [key: string]: any };
  [key: string]: any;

  constructor(data: any) {
    this.CHROM = data.CHROM || '';
    this.POS = data.POS || '';
    this.ID = data.ID || null;
    this.REF = data.REF || '';
    this.ALT = data.ALT || '';
    this.QUAL = data.QUAL || '';
    this.FILTER = data.FILTER || '';
    this.INFO = data.INFO || '';
    this.FORMAT = data.FORMAT || '';
    this.outputs = {};

    // Asignar los outputs dinámicamente si existen
    this.assignOutputs(data);
  }

  private assignOutputs(data: any): void {
    for (let key in data.outputs) {
      if (key.startsWith('output_')) {
        this.outputs[key] = data.outputs[key];
      }
    }
  }
}