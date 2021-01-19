import { OnInit, Component, ViewChild} from '@angular/core';
import { Catalog} from '../catalog';
import { ProductService} from '../product.service'
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{
  
  displayedColumns: string[] = [ 'name', 'description', 'price', 'category_id'];
  dataSource2:MatTableDataSource<any>;
  paginator:MatPaginator
  sorter:MatSort
  value:any;
  
  @ViewChild(MatPaginator)
    set appPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
    if(this.paginator && this.dataSource2)
      this.dataSource2.paginator = this.paginator;
  }

  @ViewChild(MatSort) 
    set appSorter(sorter: MatSort) {
    this.sorter = sorter;
    if(this.sorter && this.dataSource2)
      this.dataSource2.sort = this.sorter;
  }
  
  constructor(private productService:ProductService,private route: ActivatedRoute) {
    
  }
  
  ngOnInit() {
    this.getAllProducts();
    this.setIntrvl();
    // Sets the filter directly from the route
    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(data => {
        if(<string>data.name) {
          this.value = <string>data.name;
        }
    });
  }
  
  getAllProducts() {
    this.productService.getAllProducts()
   .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          response.forEach(function (value) {
            if(<number>value.category_id==1) {
               value.category_id = 'Imbracaminte';
            }
            if(<number>value.category_id==2) {
               value.category_id = 'Incaltaminte';
            }
            if(<number>value.category_id==3) {
               value.category_id = 'Accesorii';
            }
          }); 
          this.dataSource2 = new MatTableDataSource(response);
          this.dataSource2.sort = this.sorter;
          this.dataSource2.paginator = this.paginator;
          if(this.value && this.value.length > 1) {
            this.dataSource2.filter = this.value;
          }
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }
  
  setIntrvl(){
    setInterval(() => this.getAllProducts(),10000);
  }
  
  updateFilter() {
    if(this.value.length > 1 && this.dataSource2) {
      this.dataSource2.filter = this.value;
    } else {
      this.getAllProducts()
    }
  }
  
}
