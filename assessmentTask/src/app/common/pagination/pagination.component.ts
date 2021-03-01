/** 
* @author  Umesh Singh Yadav
* @version 1.0
* @since   2017-03-01 
*/
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PagerService } from './pager-service';

@Component({
  selector: 'pagination',
  styleUrls: ['./pagination.component.css'],
  templateUrl: './pagination.component.html',
  providers: [PagerService]
})

export class PaginationComponent implements OnInit {

  public pager: any = {};
  public totalRecordCounts = 0;
  public currentPageNumber = 1;


  @Input() public pageSize: number;
  @Input() 
  public set totalRecords(value) {
    this.totalRecordCounts = value;
    this.setPage(this.currentPageNumber);
  }

  @Input() 
  public set resetPageNumberRecords(value) {
    if(value!=0){
      this.currentPageNumber = value;
      this.setPage(value);
    }
  }
  @Output() public onClickPageNumber: EventEmitter<any> = new EventEmitter();

  constructor(public pagerService: PagerService) {
  }

  ngOnInit() {
  }

  setPage(pageNumber: number) {
    this.pager = this.pagerService.getPager(this.totalRecordCounts, pageNumber, this.pageSize);
  }

  getListAccordingPageNumber(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.pager.totalPages) {
      return;
    }
    this.setPage(pageNumber);
    this.onClickPageNumber.emit(this.pager.currentPage);
  }
}
