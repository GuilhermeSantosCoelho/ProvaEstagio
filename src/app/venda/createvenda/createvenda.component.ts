import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createvenda',
  templateUrl: './createvenda.component.html',
  styleUrls: ['./createvenda.component.sass']
})
export class CreatevendaComponent implements OnInit {
  formGroup: FormGroup;
  create: boolean = false;
  error: string;

  constructor(public dialogRef: MatDialogRef<CreatevendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      produto: new FormControl("", [Validators.required, Validators.minLength(3)]),
      quantidade: new FormControl("", [Validators.required]),
      valor: new FormControl("", [Validators.required])
    })
  }

  getErrorMessage(errors) {
    if (errors.required) {
      return "Preencha esse campo";
    } else if (errors.minlength) {
      return "O campo precisa ter no mínimo " + errors.minlength.requiredLength + " caracteres.";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.formGroup.valid) {
      let data_venda = new Date();
      this.data.data_venda = data_venda.getDate() + '/' + (data_venda.getMonth() + 1) + '/' + data_venda.getFullYear();
      this.create = true;
      setTimeout(() => {
        this.dialogRef.close(this.data);
      }, 2000);
    }
  }

}
