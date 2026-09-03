import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-black border-t border-white/20 text-[9px] font-bold tracking-[0.2em] text-neutral-500 uppercase py-8">
      <div class="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>&copy; {{ currentYear }} RAW_URBAN STUDIO / ALL RIGHTS RESERVED</div>
        <div class="flex flex-wrap items-center justify-center gap-8 md:gap-10">
          <a href="#" class="hover:text-white transition-colors">Shipping & Returns</a>
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-white transition-colors">Contact</a>
        </div>
        <div class="flex items-center gap-4">
          <a href="#" class="text-white hover:text-accent transition-colors">INSTA</a>
          <a href="#" class="text-white hover:text-accent transition-colors">TWTR</a>
          <a href="#" class="text-white hover:text-accent transition-colors">TIKTOK</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
