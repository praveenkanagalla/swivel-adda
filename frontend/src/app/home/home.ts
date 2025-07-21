import { Component } from '@angular/core';
import { Carousel } from "../carousel/carousel";
import { Prodects } from "../prodects/prodects";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Carousel, Prodects],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
