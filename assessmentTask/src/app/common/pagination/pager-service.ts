/** 
* @author  Umesh Singh Yadav
* @version 1.0
* @since   2017-03-01 
*/
import * as _ from 'underscore';

export class PagerService {

    getPager(totalItems: number, currentPage: number, pageSize: number) {
        // calculate total pages
        pageSize = pageSize || 10;
        let paginationDisplayLinkCount  = 7; // it should be even
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= paginationDisplayLinkCount) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= Math.ceil((paginationDisplayLinkCount-1)/2)) {
            startPage = 1;
            endPage = paginationDisplayLinkCount;
        } else if (currentPage + Math.ceil((paginationDisplayLinkCount-1)/2) >= totalPages) {
            startPage = currentPage - (Math.ceil((paginationDisplayLinkCount-1)/2));
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.ceil((paginationDisplayLinkCount-1)/2);
            endPage = currentPage + Math.ceil((paginationDisplayLinkCount-1)/2);
        }
        
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            isRightMorePages : Number(totalPages) > Number(endPage),
            isLeftMorePages : Number(startPage) > 1 ,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}