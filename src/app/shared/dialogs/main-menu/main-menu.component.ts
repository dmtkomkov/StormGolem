import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ModalRef } from "@modal/modal-ref";

@Component({
  selector: 'sg-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: [ 'main-menu.component.scss' ],
})
export class MainMenuComponent implements OnInit {

  constructor(
    private dialogRef: ModalRef,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  navigate(url: string) {
    this.dialogRef.close();
    this.router.navigate([url]).catch(console.log);
  }
}
