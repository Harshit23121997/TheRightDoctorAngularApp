import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { PersonService } from '../service/person.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'contact', 'gender', 'more'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, private personService: PersonService,private snack:MatSnackBar) {

  }
  gen: string[] = ['', 'Female', 'Male', 'Not Prefer to Say']

  ngOnInit(): void {
    this.personService.getPersons().subscribe(
      data => {
        console.log(data['status'])
        if (data['status'] == "OK") {
          this.dataSource = new MatTableDataSource(data['persons']);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else{
          this.snack.open("Internal Server Error","502",{
            duration:5000
          })
        }

      }
    )

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Edit PersonDialogue
  editPerson(person) {
    console.log(person);
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: 'auto',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  addPerson() {
    //console.log(person);
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: 'auto',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deletePerson(id) {
    this.personService.deletePerson(id);
  }

}
