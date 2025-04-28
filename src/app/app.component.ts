import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reserve-seat';

  // public reservierungForm: FormGroup = new FormGroup( {
  //   name: new FormControl('', [
  //     Validators.required
  //   ], []),
  //   lastname: new FormControl('', [
  //     Validators.required
  //   ], []),
  //   seat: new FormControl('', [
  //     Validators.required
  //   ], []),
  // })

}
