import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectSubscription?: Subscription;

  constructor(private blogpostService: BlogPostService, private router: Router,
    private categoryService: CategoryService, private imageService: ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      publishedDate: new Date(),
      isVisible: true,
      author: '',
      categories: []
    };
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectSubscription = this.imageService.onSelectIMage()
      .subscribe({
        next: (slectedImage) => {
          this.model.featuredImageUrl = slectedImage.url;
          this.closeImageSelector();
        }
      });
  }

  onFormSubmit() {
    this.blogpostService.createBlogPost(this.model).subscribe(
      {
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      }
    );
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;

  }
}
