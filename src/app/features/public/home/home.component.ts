import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>

  constructor(private blogpostService: BlogPostService) {
  }

  ngOnInit(): void {
    this.blogs$ = this.blogpostService.getAllBlogPosts();
  }


}
