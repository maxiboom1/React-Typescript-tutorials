import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // A. Property binding
  public tooltip = Math.random() > 0.5 ? "value-a" : "value-b"
  // B. Event binding 
  public search(){
    alert('Button clicked');
    this.textToSearch = 'new'
  }
  // C. Two-way binding (Banana in the box)
  public textToSearch: string;

}
