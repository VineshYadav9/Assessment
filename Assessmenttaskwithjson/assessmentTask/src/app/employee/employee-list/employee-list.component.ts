import { Component, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "../../core/api/http-api.service";
import 'rxjs/add/observable/timer';
import { Observable, of } from 'rxjs';
import { DialogService } from "../../common/bootstrap-modal/dialog.service";
import { ConfirmComponent } from '../../common/confirm-modal/confirm-modal';
declare var $: any;
import { config } from  '../../config';
//import { timer } from 'rxjs';


export interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [HttpService, DialogService]
})
export class EmployeeListComponent implements OnInit {
  public options;
  public jvcreation: Object = {};
  public flag = true;
  public successMessage = "";
  public errorMessage = "";
  public employeeAddLink = "";
  public employeeList: any[] = [];
  public confirmModalFlag = false;
  public companyList = [];
  public branchList = [];
  public employeeDetails = {};
  public lodgerFlag: boolean = false;
  public apiResponsesLoderFlag: any = [];
  public pageName = "";
  public tableDetails = "";
  public AJAX_LOADER_PIC_WITH_PATH = config.AJAX_LOADER_PIC_WITH_PATH;
  public validatorOptions: any = {};
  public tableHideFlag = true;
  public static decimalSteps = 2;
  public static totalRecords = 0;
  public static totalRecordsAvailable = 0;
  public pageSize = 10;
  public pageNumber = 1;
  public resetPageNumberRecords = 0;
  public refreshHeaderForm = { type : 'yes'};

  constructor(private router: Router, private route: ActivatedRoute,
    private httpApiService: HttpService,private elementRef: ElementRef, 
    public dialogService: DialogService
    ) {
    this.successMessage = "";
    this.errorMessage = "";
  }

  ngOnInit() {
   let timer = Observable.timer(5000, 25000);
    timer.subscribe(t => {
      this.successMessage = "";
});
    
//const numbers = timer(3000, 1000);
//numbers.subscribe(x => console.log(x));
      this.apiResponsesLoderFlag = [];
      this.successMessage = "";
      this.errorMessage = "";
      this.employeeAddLink = "/employee/add-employee";
      this.pageNumber = 1;
      this.resetPageNumberRecords = this.pageNumber;
      this.bindData(1);
  }


  public detailsFormat() {
    return `<table cell-padding="5" cell-spacing="0" border="0" class="table table-hover table-condensed">
            <tbody>
            </tbody>
        </table>`
  }

  dataList() {
    this.options = {
      data: this.employeeList,
      "drawCallback": function( settings ) {
        EmployeeListComponent.setTotalRecords()
      },
      "paging":false,
      "info":false,
      "order": [],
      "columns": [
        {
          "data": "id",
          'mRender': function (data, a, allData, type, row) {
            let buttons = '<a href="employee/edit-employee/' + data + '"><span class=\'padding-5 glyphicon glyphicon-edit cursor-pointer\' ></span> </a>';
            buttons += "<span> <a data-toggle='modal' rel='{ \"employee_id\": \"" + data + "\"}' class='btn-danger cursor-pointer glyphicon glyphicon-trash delete-btn' title='delete'></a></span> ";
            buttons += '<a href="employee/view-employee/' + data + '"><span class=\'glyphicon glyphicon-eye-open padding-5 txt-color-green cursor-pointer\'> </span> </a>';
            return buttons;
          }
        },
        { "data": "firstName" },
        { "data": "lastName" },
        { "data": "emailId" },
        { "data": "age" },
        { "data": "gender" },
        { "data": "address" }
      ],
      buttons: [
        {
          extend: 'colvis'
        },
        {
          extend: 'excel'
        },
        {
          extend: 'pdf',
          orientation: 'portrait'
        }
      ]
    }

  }

  static setTotalRecords(){
    EmployeeListComponent.totalRecords = EmployeeListComponent.totalRecordsAvailable;
  }

  getTotalRecords(){
    return EmployeeListComponent.totalRecords;
  }


  bindData(currentPageNumber?) {
      if (currentPageNumber) {
        this.pageNumber = currentPageNumber;
      }
      //let url = "employee/employeeList/"+((this.pageNumber-1)*this.pageSize)+"/"+this.pageSize;
      let url = "assets/api/employelist.json";
      this.apiResponsesLoderFlag.push(true);
      this.httpApiService.get(url).then(result => {
        if (result ) {
          this.employeeList = result.list;
          EmployeeListComponent.totalRecordsAvailable =  result.count;
          this.dataList();
          this.reloadList();
        }
        this.lodgerFlag = false;
        this.tableHideFlag = false;
        this.apiResponsesLoderFlag.pop();
      },
        err => {
          this.tableHideFlag = false;
          this.employeeList = [];          
          this.dataList();
          this.reloadList();
          this.lodgerFlag = false;
          this.apiResponsesLoderFlag.pop();
        });
  }

  reloadList() {
    if ($("table[id*='employee-list']").length > 0) {
      let table = $("table[id*='employee-list']").DataTable();
      table.clear().draw();
      table.rows.add(this.employeeList);
      table.columns.adjust().draw();
      let elementsDivs = this.elementRef.nativeElement.querySelectorAll('.delete-btn');
      elementsDivs.forEach(element => {
        element.addEventListener('click',
          (event) => this.deleteConfirm(element.rel));
      });
    }
  }

  private deleteConfirm(row) {
    if (!this.confirmModalFlag) {
      this.confirmModalFlag = true;
      this.successMessage = "";
      this.errorMessage = "";
      let data = JSON.parse(row);
      this.dialogService.addDialog(ConfirmComponent,{
        title: 'Delete employee:' + data.employee_id,
        message: 'Are you sure you want to delete employee :' + data.employee_id
      }).subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.deleteEmployee(data.employee_id);
        } else {
          this.confirmModalFlag = false;
        }
      });
    }
  }

  ngAfterContentChecked() {
    let elementsDivs = this.elementRef.nativeElement.querySelectorAll('.delete-btn');
    elementsDivs.forEach(element => {
      this.flag = false;
      element.addEventListener('click',
        (event) => this.deleteConfirm(element.rel));
    });
    $( ".dt-toolbar-footer" ).remove();
  }

  deleteEmployee(uuid) {
    //let url = "employee/delete/"+uuid;
    let url = "assets/api/employee.json";
    let bodyObject: Object = {}
    let hmacString = "";
    this.apiResponsesLoderFlag.push(true);
    this.httpApiService.delete(url)
      .then(res => {
        debugger;
         this.successMessage = "Record has been deleted successfully";
          this.bindData(this.pageNumber);
          this.apiResponsesLoderFlag.pop();
      }, err => {
        this.apiResponsesLoderFlag.pop();
        this.errorMessage = "server error";
      });
    this.confirmModalFlag = false;
  }

  resetErrors(){
    this.errorMessage = "";
  }
}