import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VendaComponent } from './venda/venda.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path:'', component:LoginComponent },
  { path: 'home', component:HomeComponent },
  { path: 'vendas', component:VendaComponent },
  { path: 'clientes', component:ClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
