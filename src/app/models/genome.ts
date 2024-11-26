export class Genome {
    CHROM: string;
    POS: string;
    ID: string | null;
    REF: string;
    ALT: string;
    QUAL: string;
    FILTER: string;
    INFO: string;
    OUTPUTS: { [key: string]: string };
  
    constructor(data: any) {
      this.CHROM = data.CHROM || '';
      this.POS = data.POS || '';
      this.ID = data.ID || null;
      this.REF = data.REF || '';
      this.ALT = data.ALT || '';
      this.QUAL = data.QUAL || '';
      this.FILTER = data.FILTER || '';
      this.INFO = data.INFO || '';
      this.OUTPUTS = {};
  
      // Asignar los outputs dinámicamente si existen
      this.assignOutputs(data);
    }
  
    private assignOutputs(data: any): void {
      for (let key in data) {
        if (key.startsWith('output_CH')) {
          this.OUTPUTS[key] = data[key];
        }
      }
    }
  }
  