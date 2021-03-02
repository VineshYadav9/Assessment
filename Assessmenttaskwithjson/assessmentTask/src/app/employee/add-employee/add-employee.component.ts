import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/api/http-api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Rx';
import { config } from  '../../config';

@Component({
  providers:[HttpService],
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public employeeForm: any = {};
  public AJAX_LOADER_PIC_WITH_PATH = config.AJAX_LOADER_PIC_WITH_PATH;
  public apiResponsesLoderFlag = [];
  public isAdd:boolean = true;
  public employeeId: string = ""
  public apiResponseMessage: string = "";
  public errorMessage: string = "";
  public employeeListLink = "/employee/employee-list";
  public abc: any = "";
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) { 
    this.reset();
  }

  ngOnInit(): void {
     let timer = Observable.timer(5000, 25000);
     timer.subscribe(t => {
       this.apiResponseMessage = "";
     }); 
   
    this.resetApiResponseMessage();
    this.route.params.subscribe(params => {
      
      if (params['id']) {
        this.employeeId = params['id'];
        this.isAdd = false;
        this.initializeEmployeeObject(this.employeeId);
      }
    });
  }


  reset(){
    this.employeeForm['firstName'] = "";
    this.employeeForm['lastName'] = "";
    this.employeeForm['emailId'] = "";
    this.employeeForm['age'] = "";
    this.employeeForm['gender'] = "";
    this.employeeForm['address'] = "";
  }

  initializeEmployeeObject(id){
   // let url = "employee/getEmployee/"+id;
    let url = "assets/api/employee.json";
       this.apiResponsesLoderFlag.push(true);
       this.httpService.get(url).then(res=> {
        this.apiResponsesLoderFlag.pop();
        this.employeeForm =res;
       },
       err => {
        this.apiResponsesLoderFlag.pop();
        this.errorMessage = "Server Error";
       });
  }

  resetApiResponseMessage(){
    this.apiResponseMessage = "";
    this.errorMessage = "";
  }
 
  submit(){
       //let url = "employee/"+ (this.isAdd == true ? "add":"updateEmployee");
       let url = "assets/api/employee.json";
       this.apiResponsesLoderFlag.push(true);
       
       this.httpService.post(url,this.employeeForm).then(res=> {
        this.apiResponsesLoderFlag.pop();
        this.apiResponseMessage = "Employee Successully" + (this.isAdd == true ? "Added":"Updated");
       },
       err => {
        this.apiResponsesLoderFlag.pop();
        this.errorMessage = "Server Error";
       });
  }
 
}
