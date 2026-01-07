import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountServiceService } from '../core/services/account-service.service';
import { Home } from "../home/home";
import { User } from '../types/user';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [NavComponent, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accounService = inject(AccountServiceService)
  private http = inject(HttpClient);
  protected title = 'Datting app';
  protected members = signal<User[]>([])
  
  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accounService.currentUser.set(user);
    
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
