import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-get',
  templateUrl: './crud-get.component.html',
  styleUrls: ['./crud-get.component.css'],
})
export class CrudGetComponent implements OnInit {
  businessForm: FormGroup;
  faBan = faBan;
  editing: Boolean = false;
  business: Business;

  deleted : Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.businessForm = this.formBuilder.group({
      person_name: ['', Validators.required],
      business_name: ['', Validators.required],
      business_gst_number: [null, Validators.required],
    });

    let id = this.route.snapshot.paramMap.get('id');
    let data = { person_name: '', business_name: '', business_gst_number: 0 };
    this.business = new Business(data);

    this.businessService.getById(id).subscribe((data) => {
      this.business = data;
      this.business._id = String(id);
      this.businessForm = this.formBuilder.group({
        person_name: [data.person_name, Validators.required],
        business_name: [data.business_name, Validators.required],
        business_gst_number: [data.business_gst_number, Validators.required],
      });
      this.businessForm.disable();
    });
  }

  ngOnInit(): void {}

  onEdit(): void {
    this.editing = true;
    this.businessForm.enable();
  }

  onCancel(): void {
    this.businessForm.reset(this.business);
    this.editing = false;
    this.businessForm.disable();
  }

  onDelete(): void {
    this.deleted = true;
    this.businessService.deleteBusiness(this.business._id).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'The busines has been delete',
        });

        this.router.navigate(["/business"]);
      }
    );
  }

  editBusiness() {
    const business = new Business(this.businessForm.value);

    if (this.businessForm.invalid || this.deleted) {
      return;
    }

    this.businessService
      .editBusiness(this.business._id, business)
      .pipe(first())
      .subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'The busines has been saved',
          });
        },
        (error: any) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    return;
  }

  get f(): any {
    return this.businessForm.controls;
  }
}
