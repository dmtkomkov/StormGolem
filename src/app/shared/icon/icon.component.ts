import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sg-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: string;
  public url: string;

  constructor() { }

  ngOnInit() {
    this.url = `assets/${this.icon}.svg`;
  }
}
