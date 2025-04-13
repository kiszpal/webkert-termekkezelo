import {Component, HostListener} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    NgIf,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMobile = false;
  menuOpen = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
