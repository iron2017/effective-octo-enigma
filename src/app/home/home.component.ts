import { Component , OnInit} from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormsModule } from '@angular/forms';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { NgFor, NgIf } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,MatPaginatorModule,NgIf,NgFor,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  selectedCategory: string = 'primary';
  selectedYear: string='';
  selectedClass: string='';
  editingClass:boolean=false;
  editingYear:boolean=false;
  expanded:boolean=false;
  selectedStudentId: string="";
  selectedClassToEdit:string="";
  selectedYearToEdit:string="";
  selectedStudentClassId:string="";
  selectedStudentYearId:string="";
  selectedStudentNameId:string="";
  selectedStudentAgeId:string="";

  showConfirmationDialog: boolean = false;
  isPostingData:boolean=false;
  isDataPostedSuccessfully:boolean=true;
  studentToDelete: any;
  students :any[]=[];
  years: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // All possible years
  primaryClasses: string[] = ['KG1', 'KG2', 'KG3', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']; // Primary classes
  secondaryClasses: string[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']; // Secondary classes
  filteredClasses:string[]= [];
  totalItems = 100;
  pageSize=10;
  currentPage=1;
  // Filtered years based on category
  get filteredYears(): number[] {
    return this.years;
  }

  // Filtered classes based on category and year
 
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
  
    this.filterClasses();
    this.filterStudents(0,10);
   
  }
  filterClasses(){
     if (this.selectedCategory === 'primary') {
      this.filteredClasses= this.primaryClasses;
    } else {
      this.filteredClasses= this.secondaryClasses;
    }
  }
  editStudent(student: any, property: any, event: any): void {
    
     console.log(event)
 this.isDataPostedSuccessfully=false;
    student[property] = event;
   
    
    this.studentService.updateStudent(student._id, { [property]: event})
      .subscribe(
        updatedStudent => {
          console.log('Student updated successfully:', updatedStudent);
          if(property ="className"){
            this.editingClass =false;
            this.isDataPostedSuccessfully=true;
          }
          if(property ="year"){
            this.editingYear =false;
          }
          
          
        },
        error => {
          console.error('Error updating student:', error);
          
        }
      );
  }
  editingClassState(studentId:string){
    this.editingClass =true;
    this.selectedStudentClassId = this.selectedStudentClassId === studentId ? "" : studentId;
  }
  editingYearState(studentId:string){
    
    this.selectedStudentYearId = this.selectedStudentYearId === studentId ? "" : studentId;
  this.editingYear =true;
  }
  StudentNameStatus(studentId:string){
 this.selectedStudentNameId = this.selectedStudentNameId === studentId ? "" : studentId;

  }
  StudentAgeStatus(studentId:string){
 this.selectedStudentAgeId = this.selectedStudentAgeId === studentId ? "" : studentId;

  }
  handlePageEvent(event:any){
  
    this.filterStudents(event.pageIndex,event.pageSize);

  }
 expandStudent(studentId: string): void {
    // Toggle the expansion state for the clicked row
     this.selectedStudentId = this.selectedStudentId === studentId ? "" : studentId;
  }



  filterStudents( page:number, pageSize:number){
    this.studentService.getStudents(this.selectedCategory, Number(this.selectedYear), this.selectedClass, page, pageSize)
      .subscribe((data: any) => {
        // Handle the data returned by the service
        this.students = data.students; 
        this.totalItems = data.count
        // Assign the fetched students to the local array
      }, error => {
        console.error('Error fetching students:', error); // Handle any errors
      });
  }
  confirmDelete(student: any) {
    this.studentToDelete = student;
    this.showConfirmationDialog = true;
  }

  // Method to cancel the deletion and hide the confirmation dialog
  cancelDelete() {
    this.studentToDelete = null;
    this.showConfirmationDialog = false;
  }
    cancelFilters() {
    // Reset filter variables or perform any other actions to cancel filters
    this.selectedCategory = 'primary';
    this.selectedYear = '';
    this.selectedClass = '';
    
    // Call the method to fetch students data with the new filters
    this.filterStudents(0, 10);
  }
  // Method to delete the student
  deleteStudent() {

     this.studentService.deleteStudent(this.studentToDelete._id).subscribe(() => {
    
     this.filterStudents(0,10);
   });
  
    // Reset variables
    this.studentToDelete = null;
    this.showConfirmationDialog = false;
  }
 
}

