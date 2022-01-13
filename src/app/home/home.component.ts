import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  showForm: boolean = false;
  userForm: FormGroup = new FormGroup({});
  showUpdateButton: boolean = false;
  userId: number;

  dzongkhags: any;
  gewogs: any;
  villages: any;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllUsers();
    this.getAllDzongkhags();
  }

  getAllUsers(){
    this.dataService.getAllUsers().subscribe(response => {
      console.log('Users', response);
      this.users = response;
    });
  }

  getAllDzongkhags(){
    this.dataService.getAllDzongkhags().subscribe(response => {
      this.dzongkhags = response;
    })
  }

  getAllGewogs(dzongkhagId: number){
    this.dataService.getAllGewogsByDzongkhagId(dzongkhagId).subscribe(response => {
      this.gewogs = response;
    })
  }

  getAllVillages(gewogId: number){
    this.dataService.getAllVillagesByGewogId(gewogId).subscribe(response => {
      this.villages = response;
    })
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      dzongkhag: ['', Validators.required],
      gewog: ['', Validators.required],
      village: ['', Validators.required]
    });
  }

  showAddForm(){
    this.showForm = true;
    this.showUpdateButton = false;
    this.userForm.reset();
    this.gewogs = [];
    this.villages = [];
  }

  add(){
    let user = {
      name: this.userForm.get('name').value,
      age: this.userForm.get('age').value,
      gender: this.userForm.get('gender').value,
      villageId: this.userForm.get('village').value
    }
    this.dataService.saveUser(user).subscribe(response => {
      alert('User successfully created');
      this.getAllUsers();
    }, () => {
      alert('User could not be created');
    });
  }

  populateForm(user: any){
    this.showUpdateButton = true;
    this.userId = user.id;

    this.getAllGewogs(user.village.gewog.dzongkhag.id);
    this.getAllVillages(user.village.gewog.id);

    this.userForm.patchValue({
      name: user.name,
      age: user.age,
      gender: user.gender,
      dzongkhag: user.village.gewog.dzongkhag.id,
      gewog: user.village.gewog.id,
      village: user.village.id
    })
  }

  update(){
    let user = {
      id: this.userId,
      name: this.userForm.get('name').value,
      age: this.userForm.get('age').value,
      gender: this.userForm.get('gender').value,
      villageId: this.userForm.get('village').value
    }
    this.dataService.updateUser(user).subscribe(response => {
      alert('User successfully updated');
      this.getAllUsers();
    }, () => {
      alert('User could not be updated');
    });
  }

  delete(id){
    this.dataService.deleteUser(id).subscribe(response => {
      alert('User successfully deleted');
      this.getAllUsers();
    });
  }
}
