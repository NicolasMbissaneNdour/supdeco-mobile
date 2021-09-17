import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, OnDestroy {
  events: Event[] = [];
  eventsSubscription: Subscription;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsSubscription = this.eventsService.eventsSubject.subscribe(
      (observer) => {
        this.events = observer;
        console.log(this.events);
      }
    )
    this.eventsService.getEvents();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onClickEvent(event) {
    console.log(event);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.events.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
