import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type RoomType = 'sortie' | 'cadeau' | 'evenement';

interface Option {
  name: string;
  votes: number;
}
interface Room {
  id: string;
  type: RoomType;
  name: string;
  description?: string;
  budget?: number;
  options: Option[];
  totalVotes: number;
  userVotes: Record<string, string>; // userId -> option.name
  createdAt: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  rooms: Room[] = [];
  focusedRoom: Room | null = null;

  newRoom = {
    type: 'sortie' as RoomType,
    name: '',
    description: '',
    budget: 0,
    optionsText: ''
  };

  // UI partage
  showShareForId: string | null = null;
  qrVisibleForId: string | null = null;
  lastCopyOk = false;

  ngOnInit(): void {
    this.loadRooms();

    // Vérifie si on a ?room=ID dans l’URL
    const url = new URL(window.location.href);
    const forceId = url.searchParams.get('room') || url.hash.replace('#room=', '');
    if (forceId) {
      const r = this.rooms.find(x => x.id === forceId);
      if (r) this.focusedRoom = r;
    }
  }

  // ===== Persistance =====
  private saveRooms() {
    localStorage.setItem('planify_rooms', JSON.stringify(this.rooms));
  }
  private loadRooms() {
    try {
      const raw = localStorage.getItem('planify_rooms');
      if (raw) this.rooms = JSON.parse(raw);
    } catch { /* ignore */ }
  }
  private uid(): string {
    return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
  }

  // ===== Création Room =====
  createRoom() {
    if (!this.newRoom.name || !this.newRoom.optionsText.trim()) return;

    const options: Option[] = this.newRoom.optionsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name, votes: 0 }));

    const room: Room = {
      id: this.uid(),
      type: this.newRoom.type,
      name: this.newRoom.name.trim(),
      description: this.newRoom.description?.trim(),
      budget: this.newRoom.budget || 0,
      options,
      totalVotes: 0,
      userVotes: {},
      createdAt: Date.now()
    };

    this.rooms.unshift(room);
    this.saveRooms();

    // reset form
    this.newRoom = { type: 'sortie', name: '', description: '', budget: 0, optionsText: '' };
  }

  // ===== Votes =====
  private getUserId(): string {
    let id = localStorage.getItem('planify_user_id');
    if (!id) {
      id = this.uid();
      localStorage.setItem('planify_user_id', id);
    }
    return id;
  }

  vote(room: Room, option: Option) {
    const userId = this.getUserId();
    const prev = room.userVotes[userId];

    if (prev === option.name) {
      // toggle : retire le vote
      option.votes--;
      room.totalVotes--;
      delete room.userVotes[userId];
    } else {
      // supprime ancien vote
      if (prev) {
        const old = room.options.find(o => o.name === prev);
        if (old) {
          old.votes--;
          room.totalVotes--;
        }
      }
      // ajoute le nouveau
      option.votes++;
      room.totalVotes++;
      room.userVotes[userId] = option.name;
    }
    this.saveRooms();
  }

  // ===== Partage =====
  roomShareLink(room: Room): string {
    const base = window.location.origin + window.location.pathname;
    return `${base}?room=${room.id}`;
  }

  async copyLink(room: Room) {
    try {
      await navigator.clipboard.writeText(this.roomShareLink(room));
      this.lastCopyOk = true;
      setTimeout(() => (this.lastCopyOk = false), 1500);
    } catch {
      this.lastCopyOk = false;
    }
  }

  async webShare(room: Room) {
    const url = this.roomShareLink(room);
    const text = `Rejoins ma room "${room.name}" sur Planify.tn et vote :`;
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: `Room ${room.name}`,
          text,
          url
        });
      } else {
        await this.copyLink(room);
      }
    } catch {
      // cancel
    }
  }

  whatsappHref(room: Room): string {
    const url = this.roomShareLink(room);
    const msg = `🔥 Viens voter dans ma room "${room.name}" (${room.type}) : ${url}`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }

  qrSrc(room: Room): string {
    const data = this.roomShareLink(room);
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(data)}`;
  }

  toggleShare(room: Room) {
    this.showShareForId = this.showShareForId === room.id ? null : room.id;
    if (this.showShareForId !== room.id) this.qrVisibleForId = null;
  }
  toggleQr(room: Room) {
    this.qrVisibleForId = this.qrVisibleForId === room.id ? null : room.id;
  }

  // ===== Utils =====
  percent(room: Room, option: Option): number {
    if (!room.totalVotes) return 0;
    return Math.round((option.votes / room.totalVotes) * 100);
  }

  trackByRoom = (_: number, r: Room) => r.id;
  trackByOption = (_: number, o: Option) => o.name;
}
