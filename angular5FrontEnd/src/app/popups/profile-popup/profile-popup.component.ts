import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ACTION_LOGIN } from '../../store/actions/appActions';
@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  userDetails: any;
  showEditForm: Boolean = false;
  profileForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
    private formbuilder: FormBuilder,
    private autahService: AuthService,
    private toastrService: ToastrService,
    private user: UserService,
  ) {
    // this.store.select('appReducer').subscribe( userData => {
    //   this.userDetails = userData;
    // });
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.profileForm = this.formbuilder.group({
      firstName: this.formbuilder.control(null, []),
      lastName: this.formbuilder.control(null, []),
      userName: this.formbuilder.control(null, []),
      phone: this.formbuilder.control(null, []),
      mobileNo: this.formbuilder.control(null, []),
      email: this.formbuilder.control(null, []),
      location: this.formbuilder.control(null, []),
    });

    this.store.select('appReducer').subscribe( userData => {
      this.userDetails = userData;
      console.log(this.userDetails, '-----------');
      this.profileForm.patchValue(this.userDetails);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editProfile(type) {
    this.showEditForm = !this.showEditForm;
    if ( type === 'editForm') {
      this.profileForm.reset();
    } else if (type === 'showDetails') {
      this.profileForm.patchValue(this.userDetails);
    }
  }

  submitProfile() {
    console.log({...this.profileForm.value}, '---------------');
    const payload = {
      _id: this.userDetails._id,
      ...this.profileForm.value
    };
    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
    this.autahService.updateUserDetails(payload).subscribe(data => {
      if (data.success) {
        this.profileForm.patchValue(data.data);
        this.user.updateState({action: ACTION_LOGIN, payload: data.data});
        this.toastrService.success('Profile Updated Successfully', 'Success');
      }
      console.log(data, '-------');
    });
  }
}
