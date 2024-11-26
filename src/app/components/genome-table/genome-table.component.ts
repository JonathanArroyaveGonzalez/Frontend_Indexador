import { Component, OnInit } from '@angular/core';
import { GenomeService } from 'src/app/services/genome.service';
import { Genome } from 'src/app/models/genome';

@Component({
  selector: 'app-genome-table',
  templateUrl: './genome-table.component.html',
  styleUrls: ['./genome-table.component.css']
})
export class GenomeTableComponent implements OnInit {

  genomes: Genome[] = [];
  searchText = '';

  constructor(private genomeService: GenomeService) { }

  ngOnInit(): void {
    this.loadGenomes();
  }

  loadGenomes() {
    this.genomeService.getGenomes().subscribe(data => {
      this.genomes = data.map(item => new Genome(item));  // Asegurarse de instanciar la clase Genome
      console.log(this.genomes);
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}

