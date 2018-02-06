import { Component, OnInit } from '@angular/core';

/**
 * Home component
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    console.debug('# AdminComponent started');
  }
}
