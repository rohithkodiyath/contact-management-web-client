import { Component, OnInit } from '@angular/core';
import {ContactModel} from "../models/contact.model";
import {LoggerService} from "../services/logger.service";
import {RestClientService} from "../services/restclient.service";
import {ResponseModel} from "../models/response.model";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ContactService} from "../services/contact/contact.service";
import {PageEvent} from "@angular/material/paginator";
import {NotificationService} from "../services/notification.service";
import {ContactPageState} from "../constants/constants";
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  protected readonly ContactPageState = ContactPageState;

  protected readonly sortOrders = {
    asc: 'asc',
    dese: 'desc'
  }

  protected readonly sortFields = {
    fname: 'firstName',
    lname: 'lastName',
    mail: 'email',
    date: 'createdDate'
  }

  contacts : ContactModel[];
  sortField : string = this.sortFields.date;
  sortOrder :string;
  searchKey : string = '';

  paginator : {
    length: number,
    pageSize: number
  }={
    length:  2,
    pageSize: 10,
  }

  constructor(private logger :LoggerService,
              private contactService : ContactService,
              private notification :NotificationService) {
    this.contacts = [];
  }

  sortData(sort: Sort) {
    this.sortOrder = sort.direction;
    this.sortField = sort.active
    this.getTableData();
  }


  getTableData(page = 0, searchKey = this.searchKey, sortField = this.sortField, sortOrder  = this.sortOrder){

    this.contactService.listContacts(page,searchKey,sortField,sortOrder).subscribe({
      next: (data) => {
        this.logger.info('getTableData', data);
        console.error(data);
        this.contacts = data.list;
        this.paginator.length = data.totalPage;
      },
      error: (error) => {
        this.notification.handleErrorMessage(error);
      }
    });
  }



  ngOnInit() {
    this.getTableData();
  }

  handlePageEvent($event: PageEvent) {
    this.getTableData($event.pageIndex);
  }


}
