import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  redirecionando: boolean;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.redirecionando = false;
  }

  redirect(to): void{
    this.redirecionando = true;
    setTimeout(() => {
      this.redirecionando = false;
      this.router.navigate([to], { relativeTo: this.route });
    }, 2000);
  }
}
