import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { NgxNotifierComponent, NgxNotifierService } from 'ngx-notifier';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NavbarComponent, ListProductsComponent, ProgressBarComponent, NgxNotifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';

  constructor(private ngxNotifierService: NgxNotifierService) {}

  createNotification(message: string, style: string) {
    this.ngxNotifierService.createToast(message, style);
  }
}
