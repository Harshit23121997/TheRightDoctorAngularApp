import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    alert("This page is not available so you will redirected to the main page ")
    this.router.navigate([''])
  }

}
