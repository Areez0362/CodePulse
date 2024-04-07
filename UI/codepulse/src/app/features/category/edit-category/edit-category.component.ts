import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {

id: string | null = null;  
paramsubscription?: Subscription;
editCategoryscription?: Subscription;

category?: Category;

constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router){

}
  ngOnInit(): void {
  this.paramsubscription = this.route.paramMap.subscribe({
    next: (param)=> {
    this.id =  param.get('id');
    if(this.id)
      {
        this.categoryService.getCategoryById(this.id)
        .subscribe({
          next: (response)=> {
            this.category=response;
          }
        })
      }


    }
  });
  }

  onFormSubmit() {  
  const updateCategoryRequest: UpdateCategoryRequest={
    name: this.category?.name ?? '',
    urlHandle: this.category?.urlHandle ?? ''
  };

  if(this.id){
  this.editCategoryscription = this.categoryService.updateCategory(this.id,updateCategoryRequest)
  .subscribe({
  next: (response)=> {
    this.router.navigateByUrl('/admin/categories');
  }
    
  })
  }


  }




  ngOnDestroy(): void {
    this.paramsubscription?.unsubscribe;
    this.editCategoryscription?.unsubscribe;

  }
 

}