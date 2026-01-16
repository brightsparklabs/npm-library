import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorld } from '@brightsparklabs/angular-toolkit-root'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloWorld],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dev');
}
