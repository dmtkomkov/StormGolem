import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { BlogService } from '@services/blog.service';

import { BlogPost } from '@interfaces';

import { Observable } from 'rxjs';

// FIXME: Action into global enums
enum Action {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

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
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [ this.title, Validators.required ],
      body: [ this.body, Validators.required ],
    });
  }

  private get_method(action: Action): Observable<BlogPost|{}> {
    switch(action) {
      case Action.CREATE:
        return this.blogService.createBlogPost(this.blogPostForm.value)
      case Action.UPDATE:
        return this.blogService.updateBlogPost(this.id, this.blogPostForm.value)
      case Action.DELETE:
        return this.blogService.deleteBlogPost(this.id)
    }
  }

  private perform_action(action: Action) {
    this.get_method(action).subscribe(
      () => {
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log(`${action} post failed: `, error.status, error.message);
      }
    );
  }

  create() {
    this.perform_action(Action.CREATE);
  }

  update() {
    this.perform_action(Action.UPDATE);
  }

  delete() {
    this.perform_action(Action.DELETE);
  }
}
