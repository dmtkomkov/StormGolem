import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from '@services';
import { IBlogPost } from "@interfaces";

@Component({
  selector: 'sg-post-form',
  templateUrl: 'post-form.component.html',
  styleUrls: ['post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() body: string;
  blogPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [ this.title, Validators.required ],
      body: [ this.body, Validators.required ],
    });
  }

  create() {
    this.blogService.sendBlogAction('create', this.blogPost);
  }

  update() {
    this.blogService.sendBlogAction('update', this.blogPost);
  }

  delete() {
    this.blogService.sendBlogAction('delete', this.blogPost);
  }

  private get blogPost(): IBlogPost {
    return { id: this.id, ...this.blogPostForm.value }
  }
}
