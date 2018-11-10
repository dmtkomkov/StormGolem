import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sg-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() blogPost;

  constructor() { }

  ngOnInit() {}
}
