import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  catagory?: Category;
  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: ((params: { get: (arg0: string) => string | null; }) => {
        this.id = params.get('id');
        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe(
            {
              next: (response: Category | undefined) => {
                this.catagory = response;
              }
            }
          );
        }
      })
    });
  }

  onFormSubmit(): void {

    console.log(this.catagory);
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.catagory?.name ?? '',
      urlHandle: this.catagory?.urlHandle ?? ''
    };

    //pass this object to service
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/categories');
          }
        });
    }

  }

  onDelete(): void {
    if (this.id) {
      this.categoryService.deleteCategory(this.id).subscribe(
        {
          next: () => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (err: any) =>{
            console.log(err)}
        }
      );
    }

  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

}
