import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { QueryService } from '../query.service';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'
  })
};

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  
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

  deleteItem(ItemId: number) {
    if(confirm("Are you sure to delete")) {
      for(let i = 0; i < this.ItemsDetails.length; i++){
          if (this.ItemsDetails[i].ItemId === ItemId) {
              this.ItemsDetails.splice(i,1);
              alert("Item is deleted");
          }
      }
      this.q.deleteItemById(ItemId).subscribe(successCode => {         
              alert("Item is deleted");
      },err => {
           console.log(err);
        },
        () => {}       
      };
  }
   
   
  addNewItem(data: NgForm):void{
    //console.log(data)
    if(!data.valid){
      console.log("error");
    }else{
      //var x = JSON.stringify(this.dataForm); 
       alert("Item successfully added");
      //this.ItemsDetails.push(this.dataForm);
      this.http.post('http://task.taj-it.com/api/Items', data.value).subscribe(res => { 
        this.ItemsDetails.push(this.dataForm);
        alert("Item successfully added");
      });
    }
  }

  updateItem(data: NgForm):void{
    console.log(data)
    if(!data.valid){
      console.log("error");
    }else{
      //var y = JSON.stringify(this.updateData);
      //console.log(y);
      //console.log(this.updateData.ItemId);
      alert("Item successfully updated");
      this.http.put('http://task.taj-it.com/api/Items'+'/'+this.updateData.ItemId).subscribe(res => {
        //console.log(res);
      });
    }
  }

   ngOnInit() {
  }
}
