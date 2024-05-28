import React, { Component, useState } from 'react'
import axios from 'axios';
import { addDays, addMonths, endOfMonth, endOfWeek, format, formatDate, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek, subMonths } from 'date-fns'
import { Icon } from '@iconify/react';
import './style.css';



// 년월 랜더링
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className='header'>
            <div className='header-text-box'>
                <div className='text'>
                    <span className='text-month'>{format(currentMonth, 'M')}</span>
                    <span className='text-year'>{format(currentMonth, 'yyyy')}</span>
                </div>
                <div className='button'>
                    <Icon className='icon' width="30px" icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                    <Icon className='icon' width="30px" icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                </div>
            </div>
        </div>
    )
}

// 요일 랜더링
const RenderDate = () => {
    const days = [];
    const date = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='rows-date' key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className='row-days'>{days}</div>
}

const RenderDay = ({ currentMonth, selectedDate, onDateClick }) => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(startMonth);
    const startDay = startOfWeek(startMonth);
    const endDay = endOfWeek(endMonth);

    const rows = [];
    let days = [];
    let day = startDay;
    let formatDay = '';

    while (day <= endDay) {
        for (let i = 0; i < 7; i++) {
            formatDay = format(day, 'd');

            const cloneDay = day;
            days.push(
                <div className={`rows-day ${!isSameMonth(day, currentMonth) ? 'disabled' :
                    isSameDay(day, selectedDate) ? 'selected' :
                        format(currentMonth, 'M') !== format(day, 'M') ? 'not-valid' : 'valid'
                    }`}
                    key={day} onClick={() => onDateClick(cloneDay)}>
                    <span id={format(currentMonth, 'M') !== format(day, 'M') ? 'text-not-valid' : ''}
                        className={`${i === 0 ? 'sunday' : i === 6 ? 'saturday' : ''}`}>
                        {formatDay}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>{days}</div>
        );
        days = [];
    }
    return (
        <div className='body'>{rows}</div>
    )
}

export default function MyCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
        console.log(selectedDate);
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        const formatDate = format(day, 'yyyy-MM-dd');

        console.log(formatDate);
        sendDateToServlet(formatDate);
        // console.log(selectedDate);
        // window.location.href = `${process.env.REACT_APP_SERVER_URL}?date=formatDate`;
    }

    return (
        <div className='calendar-box'>
            <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <RenderDate />
            <RenderDay currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
        </div>
    );
}

// 포맷된 날짜를 서버로 전송하는 함수
const sendDateToServlet = (formatDate) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/sample`, { date: formatDate }) // 서버 URL과 엔드포인트로 POST 요청
        .then(response => {
            console.log('Date sent successfully:', response); // 요청 성공 시 콘솔에 출력
            console.log('check date', formatDate)
        })
        .catch(error => {
            console.error('Error sending date:', error); // 요청 실패 시 콘솔에 출력
        });
};




