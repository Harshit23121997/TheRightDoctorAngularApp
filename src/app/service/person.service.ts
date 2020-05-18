import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient,private router:Router,private snack:MatSnackBar) { }

  getPersons(){
    return this.http.get("http://localhost:2000/person")
  }
  status:any
  addPerson(data){
    alert("here")
    this.http.post("http://localhost:2000/person",data).subscribe(
      data=>{
        this.status=data
        if(this.status.status=="OK"){
          this.snack.open("Data Added");
          location.reload();
        }
        else{
          this.snack.open("Internal Server Error","502",{
            duration:5000
          })
        }
      }
    );
  }

  //EditPerson Service
  editPerson(data,id){

    alert("here")
    let url="http://localhost:2000/person/"+id
    this.http.put(url,data).subscribe(
      data=>{
        this.status=data
        if(this.status.status=="OK"){
          this.snack.open("Data Edited");
          location.reload();
        }
        else{
          this.snack.open("Internal Server Error","502",{
            duration:5000
          })
        }
      }
    );

  }

  //Delete Person Service
  deletePerson(id){
    alert("here")
    let url="http://localhost:2000/person/"+id
    this.http.delete(url).subscribe(
      data=>{
        this.status=data
        if(this.status.status=="OK"){
          this.snack.open("Data Deleted");
          location.reload();
        }
        else{
          this.snack.open("Internal Server Error","502",{
            duration:5000
          })
        }
      }
    );
  }


}
