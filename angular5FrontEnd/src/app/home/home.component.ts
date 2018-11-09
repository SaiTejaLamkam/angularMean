import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    // setInterval(() => {
    //   this.type3 = !this.type3;
    // },1000)
  }
  // private actualAmountInUsd = 50;
  // INR = true;
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(8)],
      email: [null, [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        street: [null, Validators.required],
        street2: [null],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required]
      })
    });
  }

  // get amount() {
  //  return this.INR ? this.actualAmountInUsd * 65 : this.actualAmountInUsd;
  // }

  // get format() {
  //   return this.INR ? 'INR' : 'USD';
  // }

  // toggleINRandUSD() {
  //   this.INR = !this.INR;
  // }

  // type1 = true;

  // type2 = false;

  // type3 = true;

  // data = [
  //   {
  //     lang:'Javascript',
  //     usedOn:'web'
  //   },
  //   {
  //     lang:'Swift',
  //     usedOn:'Ios'
  //   }
  // ]


  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      // console.log('form submitted');
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }

}
