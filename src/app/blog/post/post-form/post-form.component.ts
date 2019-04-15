import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from '@services/blog.service';

import {CreateBlogPost, DeleteBlogPost, UpdateBlogPost} from "../../../actions/blog.actions";
import { IAppState } from "../../../states/app.state";
import { Store } from "@ngrx/store";

@Component({
  selector: 'sg-post-form',
  templateUrl: 'post-form.component.html',
  styles: []
})
export class PostFormComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() body: string;
  blogPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [ this.title, Validators.required ],
      body: [ this.body, Validators.required ],
    });
  }

  create() {
    this.store.dispatch(new CreateBlogPost(this.blogPostForm.value));
  }

  update() {
    this.store.dispatch(new UpdateBlogPost({id: this.id, ...this.blogPostForm.value}));
  }

  delete() {
    this.store.dispatch(new DeleteBlogPost(this.id));
  }
}
