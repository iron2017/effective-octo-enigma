import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students/';

  constructor(private http: HttpClient) { }

  getStudents(filter: string, year: number, classType: string, page: number, pageSize: number): Observable<any[]> {
  
  const url = `${this.apiUrl}?category=${filter}&year=${year}&className=${classType}&page=${page}&pageSize=${pageSize}`;

 
  return this.http.get<any[]>(url);
}
  updateStudent(id: string, studentData: any): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.put<any>(url, studentData);
  }
deleteStudent(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
