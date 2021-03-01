import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from "@angular/cdk/collections";

import { Store as _Store, select } from "@ngrx/store";
import * as fromRoot from "src/app/@store";
import { Observable, Subject } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { DialogUploadContractComponent } from "../dialog-upload-contract/dialog-upload-contract.component";
import { StaffManagementService } from "../../services/staff-management.service";
import { UserStaff } from "../../models/user-staff.model";
import { UserStore } from "../../models/user-store.model";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import * as fromAuth from '../../../core/authentication/@store/auth/auth.selector';
import { Store } from '../../../smart-stores/models/Store';
import { StoresService } from '../../../smart-stores/services/StoresService';
import { UserStaffStoreRequestModule } from '../../models/user-staff-store-request.module';
import { StaffManager } from "../../services/staff-management.manager";

@Component({
  selector: "app-staff-management",
  templateUrl: "./staff-management.component.html",
  styleUrls: ["./staff-management.component.scss"],
})
export class StaffManagementComponent implements OnInit {
  public tabLinks: any[];
  public activeLink: string;
  public displayedColumns: string[];

  public dataSource: MatTableDataSource<UserStaff>;
  public dataSourceAllStaff: MatTableDataSource<UserStaff>;
  public dataSourceActiveStaff: MatTableDataSource<UserStaff>;
  public dataSourceInactiveStaff: MatTableDataSource<UserStaff>;

  private initialSelection = [];
  private allowMultiSelect = false;

  public selection: SelectionModel<UserStaff>;
  public addStuffBtnClicked = false;

  private unsubscribe$: Subject<void> = new Subject();

  public users$: Observable<UserStaff[]>;
  public userStaff: UserStaff;
  public userStores: UserStore[];
  public storesUi: any[] = [];

  public showingStaffInfoView = false;
  public editingUserStaffInfo = false;

  public showingStoreInputField = false;
  public activeUsers: UserStaff[];
  public inactiveUsers: UserStaff[];


  public staffManagementForm: FormGroup;
  private stores$: Observable<Store[]>;
  private store$: Observable<Store>;
  public storesList: Store[];
  private selectedStore: Store;
  public saveActionUpdate = false;
  public saveActionAdd = false;
  public changeAddStore = false;
  public changeDeleteStore = false;
  private selectedStaff: UserStaff;
  private newStore: Store;
  private deleteStore: Store;
  private userStore: UserStaffStoreRequestModule;
  private storeService: StoresService;
  private staffManager: StaffManager;
  constructor(
    public store: _Store<fromRoot.State>,
    public staffManagementService: StaffManagementService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    storeService: StoresService,
    staffManager: StaffManager
  ) {
    this.storeService = storeService;
    this.staffManager = staffManager;

    this.tabLinks = [
      { label: "Staff", link: "/" },
      { label: "Active", link: "/" },
      { label: "Inactive", link: "/" },
    ];
    this.activeLink = 'Staff';
    this.displayedColumns = ["select", "name", "store", "rights", "actions"];
    this.stores$ = this.store.pipe(select(fromAuth.selectStores));
    this.store$ = this.store.pipe(select(fromAuth.selectSelectedStore));
    this.selection = new SelectionModel<UserStaff>(
      this.allowMultiSelect,
      this.initialSelection
    );

    this.createForm();
  }

  async ngOnInit() {
    (await this.store$.pipe(takeUntil(this.unsubscribe$))).subscribe(store => {
      this.resetInfoView();
      if (!store) {
        return;
      }

      this.staffManager.currentusers.subscribe(users => {
        if (users != null || users != undefined) {
          this.dataSource = new MatTableDataSource(users);
        }
      });

      this.selectedStore = store;
      this.loadUsers(store.referenceId, store.country);
    });

    this.stores$.pipe(takeUntil(this.unsubscribe$)).subscribe(stores => {
      this.storesList = stores;

    });
  }

  private loadUsers(referenceId: string, country: string) {
    this.staffManagementService.getUsersStaff(referenceId, country).subscribe((users) => {
      this.staffManager.changeusers(users);
      this.dataSource = new MatTableDataSource(users);
      const activeStaff = [];
      const inactiveStaff = [];
      for (const user of users) {
        if (user.isEnabled) {
          this.activeUsers = users.filter(x => x.isEnabled == true);
          activeStaff.push(this.activeUsers);
        } else {
          this.inactiveUsers = users.filter(x => x.isEnabled == false);
          inactiveStaff.push(this.inactiveUsers);
        }
      }
      console.log(this.activeUsers)
      this.dataSourceAllStaff = new MatTableDataSource(users);
      this.dataSourceActiveStaff = new MatTableDataSource(this.activeUsers);
      this.dataSourceInactiveStaff = new MatTableDataSource(this.inactiveUsers);
    });
  }

  public onShowAllStaff() {
    this.activeLink = 'Staff';
    this.dataSource = this.dataSourceAllStaff;
  }
  public onShowActiveStaff() {

    this.activeLink = 'Active';
    this.dataSource = this.dataSourceActiveStaff;
  }
  public onShowInactiveStaff() {
    this.activeLink = 'Inactive';
    this.dataSource = this.dataSourceInactiveStaff;
  }
  public onTabChange(item: any) { }

  public view(userStaff: UserStaff) {
    this.showingStaffInfoView = true;
    this.editingUserStaffInfo = false;

    this.storesUi = [...userStaff.stores];
    (this.staffManagementService.getUserDetailById(userStaff.id)).subscribe((user) => {
      userStaff = user;
      this.staffManagementForm.setValue({
        userName: userStaff.userName,
        familyName: userStaff.familyName,
        phoneNumber: userStaff.phoneNumber,
        email: userStaff.email,
        password: userStaff.password,
        dateOfBirth: '',
        passportID: '',
        socialSecurityNum: '',
        id: userStaff.id,
        created: '',
        rights: '',
        position: '',
      });
    });
  }

  public async edit(userStaff: UserStaff) {
    this.selectedStaff = userStaff;
    (this.staffManagementService.getUserDetailById(this.selectedStaff.id)).subscribe((user) => {
      userStaff = user;

      this.showingStaffInfoView = true;
      this.editingUserStaffInfo = true;

      this.storesUi = [...userStaff.stores];
      this.staffManagementForm.setValue({
        userName: userStaff.userName,
        familyName: userStaff.familyName,
        phoneNumber: userStaff.phoneNumber,
        email: userStaff.email,
        password: userStaff.password,
        dateOfBirth: '',
        passportID: '',
        socialSecurityNum: '',
        id: userStaff.id,
        created: '',
        rights: '',
        position: '',
      });
      this.saveActionUpdate = true;
    });
  }

  public save() {
    const user = { ...this.staffManagementForm.value };
    user.name = this.staffManagementForm.value.userName;
    user.referenceStoreId = this.selectedStore.referenceId;
    user.country = this.selectedStore.country;

    if (this.saveActionUpdate) {
      if (this.changeAddStore) {
        this.addUserStore(user);
      }
      if (this.changeDeleteStore) {
        this.deleteUserStore(user);
      }
      this.staffManagementService.updateUserStaff(user).subscribe(rest => {
        this.loadUsers(this.selectedStore.referenceId, this.selectedStore.country);
        this.onDesactivateStaffInfoView();
        this.openSnackBar('saved', 'ok');
      });
    }
    if (this.saveActionAdd) {
      if (this.changeAddStore) {
        this.addUserStore(user);
      }
      if (this.changeDeleteStore) {
        this.deleteUserStore(user);
      }
      user.emailConfirmed = this.staffManagementForm.value.email;
      user.phoneNumberConfirmed = this.staffManagementForm.value.phoneNumber;
      this.staffManagementService.createStaff(user).subscribe(rest => {
        this.loadUsers(this.selectedStore.referenceId, this.selectedStore.country);
        this.onDesactivateStaffInfoView();
        this.openSnackBar('saved', 'ok');
      });
    }
  }
  public addUserStore(user) {
    this.userStore = {
      userId: user.id,
      referenceStoreId: this.newStore.referenceId
    };
    this.staffManagementService.addUserStores(this.userStore).subscribe(() => { });
  }
  public deleteUserStore(user) {
    this.userStore = {
      userId: user.id,
      referenceStoreId: this.deleteStore.referenceId
    };
    this.staffManagementService.deleteUserStores(this.userStore).subscribe(() => { });
  }
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public onAddStuff() {
    this.staffManagementForm.reset();
    this.showingStaffInfoView = true;
    this.editingUserStaffInfo = true;
    this.storesUi = [];
    this.saveActionAdd = true;
  }

  public resetInfoView() {
    this.staffManagementForm.reset();
    this.showingStaffInfoView = false;
    this.editingUserStaffInfo = false;
  }

  public onShowStoreInput() {
    this.showingStoreInputField = !this.showingStoreInputField;
  }

  // public onAddNewStore(event: any, storeNameToEnter: any) {
  //   if (event.keyCode === 13) {
  //     if (storeNameToEnter.value !== '') {
  //       this.storesUi.push(storeNameToEnter.value);
  //     }
  //   }
  // }

  public onDeleteUserStore(event: any, storeNameToDelete: any) {
    for (let i = 0; i < this.storesUi.length; i++) {
      if (this.storesUi[i].name === storeNameToDelete.textContent) {
        this.storesUi.splice(i, 1);
        break;
      }
    }
    for (const store of this.storesList) {
      if (store.name === storeNameToDelete.textContent) {
        this.deleteStore = store;
        this.changeDeleteStore = true;
      }
    }
  }

  public openUploadContract() {
    const dialogRef = this.dialog.open(DialogUploadContractComponent, {
      minWidth: '800px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (!data) {
          return;
        }
      });
  }
  public onActiveteStaff() {
    this.staffManagementService.enableUserStores(this.selectedStaff.id).subscribe(
      () => {
        this.onDesactivateStaffInfoView();
        this.openSnackBar('saved', 'ok');
      }
    );
  }
  public onDesactiveteStaff() {
    this.staffManagementService.revokeUserStores(this.selectedStaff.id).subscribe(
      () => {
        this.onDesactivateStaffInfoView();
        this.openSnackBar('saved', 'ok');
      }
    );
  }
  onDesactivateStaffInfoView() {
    this.loadUsers(this.selectedStore.referenceId, this.selectedStore.country);
    this.staffManagementForm.reset();
    this.showingStaffInfoView = false;
    this.editingUserStaffInfo = false;
    this.saveActionUpdate = false;
    this.saveActionAdd = false;
    this.changeAddStore = false;
    this.changeDeleteStore = false;
    this.showingStoreInputField = false;
    this.selectedStaff = null;
  }

  private createForm() {
    this.staffManagementForm = this.formBuilder.group({
      userName: new FormControl(''),
      familyName: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      dateOfBirth: new FormControl(''),
      passportID: new FormControl(''),
      socialSecurityNum: new FormControl(''),
      created: new FormControl(''),
      rights: new FormControl(''),
      position: new FormControl(''),
      id: new FormControl(''),
    });
  }
  public onStoreChange(store) {
    if (store.referenceId !== this.selectedStore.referenceId) {
      this.changeAddStore = true;
      this.newStore = store;
    }
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
