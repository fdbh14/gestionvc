import { Injectable } from '@angular/core';
import { User} from '../models/User';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  form: FormGroup = new FormGroup({

    $id: new FormControl(null),
    domain_id: new FormControl(0),
    password: new FormControl(''),
    email: new FormControl(''),
    status: new FormControl(1),
    accessin: new FormControl(0),
    accessou: new FormControl(0)
  });
}
