import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.css']
})
export class CrudListComponent implements OnInit {
  faEdit = faEdit;
  businessList :Array<Business> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService) { }

  ngOnInit(): void {
    this.businessService.getAll().subscribe(business => {
      this.businessList = business;
    });
  }



}
