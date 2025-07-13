import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 👈 IMPORTA QUESTO

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 AGGIUNGI QUI
  templateUrl: './app-title.html',
  styleUrls: ['./app-title.scss']
})
export class AppTitle {
  private readonly _title = signal('Github Repo Explorer');
  readonly title = computed(() => this._title());
}
