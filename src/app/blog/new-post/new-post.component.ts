import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { BlogPost } from '@interfaces';

@Component({
  selector: 'sg-new-post',
  templateUrl: 'new-post.component.html',
  styleUrls: ['new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  @Input() editMode: boolean;
  @Output() selectedBlogPost: EventEmitter<number> = new EventEmitter<number>();
  blogPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: ['', Validators.required ],
      body: ['', Validators.required ],
    });
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost.emit(blogPostId);
  }

  submit() {
    console.log('Create post!');
  }
}
