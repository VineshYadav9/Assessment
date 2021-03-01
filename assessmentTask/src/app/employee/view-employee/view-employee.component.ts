import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/api/http-api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { config } from  '../../config';

@Component({providers:[
  // HttpJsonService
  HttpService
],
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  public employeeId: string = "";
  public apiResponsesLoderFlag = [];
  public employeeForm: any = {};
  public errorMessage:string= "";
  public AJAX_LOADER_PIC_WITH_PATH = config.AJAX_LOADER_PIC_WITH_PATH;
  public apiResponseMessage: string = "";
  public employeeListLink = "/employee/employee-list";
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = params['id'];
      
        this.getEmployeeObject(this.employeeId);
      }
    });
  }
  getEmployeeObject(id){
    let url = "employee/getEmployee/"+id;
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
}
