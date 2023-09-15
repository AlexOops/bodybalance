import React from 'react';
import s from './Calendar.module.scss';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import Modal from "../../../components/Modal/Modal";
import {useDispatch} from "react-redux";
import {openModal} from "../../../redux/slices/modal";
import {AppointmentsSearch} from "./AppointmentsSearch";

const events =  [
    {
        title: 'event1',
        groupId: 'blueEvents', // recurrent events in this group move together
        daysOfWeek: [ '1','2','4' ],
        startTime: '10:30:00',
        endTime: '16:00:00',
        // display: 'background',
        //повторять график только в сентябре и октябре
        startRecur: '2023-09-01T06:30:00',
        endRecur: '2023-10-30T22:30:00',
    },
    {
        daysOfWeek: [ '3' ], // these recurrent events move separately
        startTime: '11:00:00',
        endTime: '17:00:00',
        color: 'red',
        // display: 'background'
    },
    {
        daysOfWeek: [ '3' ], // these recurrent events move separately
        startTime: '11:00:00',
        endTime: '17:00:00',
        color: 'blue',
        // display: 'background'
    },
    {
        daysOfWeek: [ '3' ], // these recurrent events move separately
        startTime: '11:00:00',
        endTime: '17:00:00',
        color: 'green',
        // display: 'background'
    },
    {
        daysOfWeek: [ '2' ], // these recurrent events move separately
        startTime: '10:00:00',
        endTime: '17:00:00',
        color: 'red',
        display: 'background'
    },
]
const Calendar = () => {
    const dispatch = useDispatch();
    const handleDateClick = (clickInfo) => {
        dispatch(openModal('modalCalendar'))
        console.log(clickInfo)
    }
    return (
        <div>
            <h1 className={s.title}>Календарь</h1>
            <Modal type={'modalCalendar'}>
                <div className={s.modal}>
                   <h2>Создать событие</h2>
                    <AppointmentsSearch/>
                </div>
            </Modal>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                // initialView="dayGridMonth"
                initialView="timeGridWeek"
                headerToolbar={{
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    end: 'today prev,next new'
                }}
                customButtons={{
                    new: {
                        text: 'Создать сегодня',
                        click: () => console.log('Создаем событие')
                    }
                }}
                slotMinTime={"06:00:00"}
                slotMaxTime={"22:00:00"}
                events={events}
                // businessHours={{}}
                // eventSources={[...allEvents,
                //     ...allWorkTimes]}
                // events={
                //     [events: {
                //         start: '2023-08-20T10:00:00',
                //         // end: '2023-08-20T16:00:00',
                //         display: 'background'
                //     }]
                // }
                eventColor={"#d78dff"}
                nowIndicator
                dateClick={handleDateClick}
                // eventClick={handleEventClick}
                // eventRemove={(e) => console.log('eventRemove', e.event.id)}
                // select={handleDateSelect}
                locale={ruLocale}
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                    meridiem: 'short'
                }}
                // eventContent={renderEventContent}
                // slotDuration={1}
                // workingHourArray={workingHourArray}
                selectable={true}
                editable={true}
                eventAdd={(event) => console.log('Записали в БД', event)}
                eventChange={(event) => console.log('Изменили', event)}
                // eventsSet={(e) => console.log(e, 'Изменили')}
                /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
        </div>
    );


};

export default Calendar;