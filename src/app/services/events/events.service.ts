import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  events: Event[] = [];
  eventsSubject: Subject<Event[]> = new Subject<Event[]>();

  constructor(private http: HttpClient) { }

  async getEvents() {
    try {
      const result = await <any>this.http.get('http://localhost:8000/api/events').toPromise();
      this.events = result;
      this.emitEventsSubject();
    } catch (error) {
      console.log(error);
    }
  }

  emitEventsSubject() {
    this.eventsSubject.next(this.events.slice());
  }
}
