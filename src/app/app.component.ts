import { Component, OnInit} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Framework } from '../framework';
import { Versions } from '../versions';
import { DataService } from '../dataservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';

interface Hobby {
  hobbyName: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    DataService
  ]
})
export class AppComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(public _dataService: DataService, private fb: FormBuilder) {}
  name = '';
  surname = '';
  date: Moment;
  chips: null;
  frameworkVersion: Versions;
  email: '';
  selectFramework: Framework = new Framework(null, '');
  filterFrameworks: Framework;
  frameworks: Framework[];
  versions: Versions[];
  myForm: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  hobbies: Hobby[] = [
    { hobbyName: 'programming' }
  ];

  ngOnInit() {
    this.myForm = this.fb.group({
      user_Name: [ '', Validators.required ],
      user_Surname: [ '', Validators.required ],
      date: [ '', Validators.required],
      framework: ['', Validators.required ],
      version: ['', Validators.required ],
      email: ['', Validators.required ],
      hobby: [ '', Validators.required ]
    });

    this.frameworks = this._dataService.getFramework();
    this.onSelect(this.selectFramework.id);
  }

  onSelect(frameworkId) {
    this.versions = this._dataService.getVersions().filter((item) => item.frameworkId == frameworkId);
    this._dataService.getFramework().filter((item) => item.id == frameworkId).map((fmValue) => {
      this.filterFrameworks = fmValue;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;

    if (value) {
      this.hobbies.push({ hobbyName: value });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(hobby: Hobby): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  saveInfo() {
    console.log(this.selectFramework);
    const user = {
      firstName: this.name,
      lastName: this.surname,
      dateOfBirth: this.date.format('DD-MM-YY'),
      framework: this.filterFrameworks.value,
      frameworkVersion: this.frameworkVersion,
      email: this.email,
      hobby: this.hobbies
    };
    console.log(user);
  }
}
