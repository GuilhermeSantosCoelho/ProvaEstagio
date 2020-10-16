import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.sass']
})
export class BuscaComponent {
  @Input() array;
  @Input() attribute;
  @Output() newItemEvent = new EventEmitter<any>();
  busca: string;
  buscando:boolean;

  constructor() { }

  buscar() {
    this.buscando = true;
    setTimeout(() => {
      this.buscando = false;
      if(this.busca == '' || this.busca == null){
        return;
      }
      let resultados = [];
      this.array.forEach(element => {
        if(element[this.attribute].toUpperCase().startsWith(this.busca.toUpperCase())){
          resultados.push(element);
        }
      });
      this.newItemEvent.emit(resultados);
    }, 3000);
    
  }
}
