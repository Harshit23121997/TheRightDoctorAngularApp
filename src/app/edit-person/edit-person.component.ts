import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {

  editForm: FormGroup
  ngOnInit() {
    console.log(this.details)
    if (this.details == null) {
      this.editForm = new FormGroup({
        'fname': new FormControl(null, Validators.required),
        'lname': new FormControl(null, Validators.required),
        'contact': new FormControl(null, Validators.required),
        'gender': new FormControl(null, Validators.required)
      })
    }
    else {
      this.editForm = new FormGroup({
        'fname': new FormControl(this.details.first_name, Validators.required),
        'lname': new FormControl(this.details.last_name, Validators.required),
        'contact': new FormControl(this.details.contact_no,  [Validators.required,Validators.pattern("[0-9]{10}")]),
        'gender': new FormControl((this.details.gender).toString(),Validators.required)
      })
    }
  }
  closeDialog() {
    //alert("close")
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.details) {
      this.editForm.value.gender = parseInt(this.editForm.value.gender)
      //alert("Edit")
      this.personService.editPerson(this.editForm.value,this.details.id)
    }
    else {
      this.editForm.value.gender = parseInt(this.editForm.value.gender);
      //alert("add")
      this.personService.addPerson(this.editForm.value);
    }
  }
  details: any

  constructor(
    public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) data, private personService:PersonService) {
    this.details = data;
    console.log(this.details);
  }


}
