import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})

export class CreateComponent implements OnInit {
  create: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    let data_nascimento = new Date(this.data.data_nascimento);

    this.create = true;
    setTimeout(() => {
      this.data.data_nascimento = data_nascimento.getDate() + '/' + (data_nascimento.getMonth() + 1) + '/' + data_nascimento.getFullYear();
      this.dialogRef.close(this.data);
    }, 2000);
  }
}
