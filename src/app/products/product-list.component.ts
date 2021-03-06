import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector:'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
 
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.product;
  }

  filteredProducts: IProduct[] = [];
  product: IProduct[] = [];

  constructor(private productService: ProductService) {

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.product.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
     this.productService.getProducts().subscribe({
       next:products=>{
         this.product=products,
         this.filteredProducts = this.product
       },
       error:err => this.errorMessage = err 
     });
    this.filteredProducts = this.product
   
  }
}
