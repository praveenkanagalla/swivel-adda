import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel {

  slides = [
    { img: '../../assets/banner-imgs/tea.webp' },
    { img: '../../assets/banner-imgs/lemman-tea.jpg' },
    { img: '../../assets/banner-imgs/coffee-1.avif' },
    { img: '../../assets/banner-imgs/black-tea.jpg' }
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "pauseOnHover": true,
    "infinite": true,
  }
}
