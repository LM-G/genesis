import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  template: '<router-outlet></router-outlet>',
  styleUrls: [ './public.component.scss' ]
})
export class PublicComponent implements OnInit {
  ngOnInit(): void {
    console.log('# PublicComponent started');
  }
}
