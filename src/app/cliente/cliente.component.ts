import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatTable } from '@angular/material/table';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface clientes {
  id: number,
  nome: string;
  telefone: string;
  sexo: string;
  prime: boolean;
  tipoCliente: string;
  data_nascimento: string;
}

var ELEMENT_DATA: clientes[] = [];

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.sass'],
})

export class ClienteComponent implements OnInit {
  @ViewChild('clientesTable') table: MatTable<any>;
  displayedColumns: string[] = ['nome', 'telefone', 'sexo', 'prime', 'tipoCliente', 'data_nascimento', 'actions'];
  dataSource: clientes[] = ELEMENT_DATA;
  userOriginal: clientes;
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

  openEditUser(id): void {
    let user = this.dataSource.find(client => client.id === id);
    this.userOriginal = Object.assign({}, user);

    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) { //Cancelar
        let user = this.dataSource.find(client => client.id === id);
        this.dataSource[this.dataSource.indexOf(user)] = this.userOriginal;
        this.table.renderRows();
      } else { //Editar
        user = result;
        this.showSnackBar('Cliente editado!', '');
      }
    });
  }

  openConfirmDelete(id): void {
    let user = this.dataSource.find(client => client.id === id);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { mensagem: 'Deseja realmente excluir o usuário ' + user.nome + '?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.dataSource.splice(this.dataSource.indexOf(user), 1);
        this.table.renderRows();
        this.showSnackBar('Cliente excluído!', '');
      }
    });
  }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  openCreateUser(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: { id: -1, nome: '', telefone: '', sexo: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result !== undefined) {
        if(this.dataSource.length != 0){
          result.id = this.dataSource[this.dataSource.length - 1].id + 1;
        }else{
          result.id = 0;
        }
        
        this.dataSource.push(result);
        this.table.renderRows();
        this.showSnackBar('Cliente criado!', '');
      }
    });
  }
}
