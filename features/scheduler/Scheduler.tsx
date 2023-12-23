'use client'
import React from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import fetchHeroEvents, { INITIAL_EVENTS, createEventId } from '../../app/(general)/scheduler/events/event-utils'
import { HeroName } from '@/app/(general)/scheduler/page'
import SelectHero from './components/SelectHero'
import { createEvent } from '@/hooks/createEvent'
import { deleteEvent } from '@/hooks/deleteEvent'
import { parseURL } from '@/utils/parseUrl'


export type myEvent = {
  hero: number,
  start: string,
  end: string,
  title: string,
  color: string,
}

interface DemoAppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
  currentHero: number, // hero id.
}

export default class DemoApp extends React.Component<{ heroNames: HeroName[], token: string | null | undefined }, DemoAppState>  {
  constructor(props: { heroNames: HeroName[], token: string | null | undefined }) {
    super(props);
    this.addEvent = this.addEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }

  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    currentHero: 5210,

  }

  render() {

    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            // initialEvents={await fetchHeroEvents(session.user.accessAPIToken)}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            // initialEvents={`http://127.0.0.1:8000/heroes/schedules/?hero=`} // fetching all by default
            events={parseURL(`/heroes/schedules/?hero=${this.state.currentHero}`)}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventChange={function(){}}
            */

            eventAdd={this.addEvent}
            eventRemove={this.removeEvent}
          />
        </div>
      </div>
    )
  }


  async removeEvent(event: any) {
    // console.log(event.event._def.publicId)
    await deleteEvent(event.event._def.publicId, this.props.token)
  }
  async addEvent(addInfo: any) {

    // console.log(this.state.currentHero)
    if (this.state.currentHero !== undefined) {
      console.log("currentHero is defined");
      const event = {
        hero: this.state.currentHero,
        start: addInfo.event.startStr,
        end: addInfo.event.endStr,
        title: addInfo.event.title,
        color: addInfo.event.backgroundColor,
      };
      console.log(this.props.token);
      await createEvent(event, this.props.token);
    } else {
      console.error("currentHero is undefined");
    }
  }


  selectedHero = (id: number) => {
    this.setState({
      currentHero: id
    })
    console.log(this.state.currentHero)
  }


  renderSidebar() {
    return (
      <div className="flex justify-center">
        <SelectHero heroNames={this.props.heroNames} handleChange={this.selectedHero} />
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}