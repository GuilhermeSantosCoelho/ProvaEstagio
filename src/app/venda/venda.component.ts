import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ConfirmComponent } from '../confirm/confirm.component';
import { CreatevendaComponent } from './createvenda/createvenda.component';

export interface vendas {
  id: number,
  quantidade: number;
  data_venda: string;
}

var ELEMENT_DATA: vendas[] = [];

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.sass']
})
export class VendaComponent implements OnInit {

  @ViewChild('vendasTable') table: MatTable<any>;
  displayedColumns: string[] = ['id', 'produto', 'quantidade', 'valor', 'data_venda', 'actions'];
  dataSource: vendas[] = ELEMENT_DATA;
  vendaOriginal: vendas;
  resultados_busca: any = [];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  resultadoBusca(resultado: any) {
    document.getElementById("resultadoBusca").innerHTML = '';
    if(resultado.length == 0){
      document.getElementById("resultadoBusca").innerHTML = 'Nenhum resultado encontrado';
    }
    resultado.forEach(element => {
      document.getElementById("resultadoBusca").innerHTML += JSON.stringify(element);
      document.getElementById("resultadoBusca").innerHTML += '<br>';
    });
  }

  openEditVenda(id): void {
    let venda = this.dataSource.find(client => client.id === id);
    this.vendaOriginal = Object.assign({}, venda);

    const dialogRef = this.dialog.open(CreatevendaComponent, {
      width: '500px',
      data: venda
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) { //Cancelar
        let venda = this.dataSource.find(client => client.id === id);
        this.dataSource[this.dataSource.indexOf(venda)] = this.vendaOriginal;
        this.table.renderRows();
      } else { //Editar
        venda = result;
        this.showSnackBar('Venda editada!', '');
      }
    });
  }

  openConfirmDelete(id): void {
    let venda = this.dataSource.find(client => client.id === id);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { mensagem: 'Deseja realmente excluir a venda ' + venda.id + '?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.dataSource.splice(this.dataSource.indexOf(venda), 1);
        this.table.renderRows();
        this.showSnackBar('Venda excluída!', '');
      }
    });
  }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  openCreateVenda(): void {
    const dialogRef = this.dialog.open(CreatevendaComponent, {
      width: '500px',
      data: { id: -1 }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      
      if (result !== undefined) {
        if(this.dataSource.length != 0){
          result.id = this.dataSource[this.dataSource.length - 1].id + 1;
        }else{
          result.id = 0;
        }
        
        this.dataSource.push(result);
        this.table.renderRows();
        this.showSnackBar('Venda criada!', '');
      }
    });
  }

}
