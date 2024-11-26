// Interfaz para representar un gnomo (variante genética)
export interface Gnome {
    _id: string;
    CHROM: string;
    POS: string;
    ID: string | null;
    REF: string;
    ALT: string;
    QUAL: string;
    FILTER: string;
    INFO: string;
    // Índices de salida para diferentes canales/muestras

    OUTPUTS:{[key: `output_CH${number}`]: string};
  }