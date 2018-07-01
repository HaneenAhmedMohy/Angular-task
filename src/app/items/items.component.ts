import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { QueryService } from '../query.service';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  items: string[]; 
  closeResult: string;
  ItemsDetails: Array<object>;
  dataForm:object;
  updateData:object;
  searchResult : object;

  constructor( 
    private modalService: NgbModal ,
    private q:QueryService,
    private http: HttpClient
   ) { this.ItemsDetails=[];
      this.getItems();
      this.dataForm={};
      this.updateData={};
      this.searchResult ={};
    }

  open(content:any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getItems():void{
    let path:string='http://task.taj-it.com/api/Items';
    this.q.getData(path).subscribe(
      res => {
        this.ItemsDetails=res;
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }

  deleteItem(ItemId) {
      this.http.delete('http://task.taj-it.com/api/Items'+'/'+ItemId,ItemId).subscribe(successCode => {
          alert("Item is deleted");
          location.reload();
      },err => {
           console.log(err);
        },
        () => {}       
      );
  }
   
   
  addNewItem(data: NgForm):void{
    if(!data.valid){
      console.log("error");
    }else{
      //var x = JSON.stringify(this.dataForm); 
      this.http.post('http://task.taj-it.com/api/Items', this.dataForm ).subscribe(res => { 
        this.ItemsDetails.push(this.dataForm);
        alert("Item successfully added");

      });
    }
  }

  updateItem(ItemId , data: NgForm):void{
    if(!data.valid){
      console.log("error");
    }else{
      this.http.put('http://task.taj-it.com/api/Items'+"/"+ItemId,this.updateData).subscribe(res => {
        alert("Item successfully updated");
        location.reload();
      });
    }
  }

   ngOnInit() {
  }

   
}