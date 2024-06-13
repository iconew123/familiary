import React, { useState, useEffect } from 'react';
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { Icon } from '@iconify/react';
import './style.css';

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
    );
};

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

    return <div className='row-days'>{days}</div>;
};

const RenderDay = ({ currentMonth, selectedDate, onDateClick, diaryData, infoData }) => {
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
            let dataForDay = null;
            let dataForDayInfo = null;
        
            if (diaryData && diaryData.length > 0 && diaryData.status !== '400') {
                dataForDay = diaryData.find(data => {
                    if (data.date) {
                        return format(data.date, 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd');
                    }
                    return false;
                });
            }
            
            if (infoData && infoData.length > 0 && infoData.status !== '404') {
                dataForDayInfo = infoData.find(data => {
                    if (data.date) {
                        return format(data.date, 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd');
                    }
                    return false;
                });
            }
            

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
                    {dataForDay && (
                        <div className="data-container">
                            <div className="data">{dataForDay.title}</div>
                        </div>
                    )}
                    {dataForDayInfo && (
                        <div className="infoData-container">
                            <div className="infoData">⭐</div>
                        </div>
                    )}
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
    );
};

export default function MyCalendar({ onDateSelect, onDateInfoSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formatDate, setFormatDate] = useState(format(selectedDate, 'yyyy-MM-dd'));
    const [diaryData, setDiaryData] = useState([]);
    const [infoData, setInfoData] = useState([]);
    const selectedBaby = sessionStorage.getItem('isSelectedBaby');
    const babySample = sessionStorage.getItem('babyInfo');
    const baby = JSON.parse(babySample);

    const fetchDiaryData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=diarylist&babycode=${baby.code}`);
            const data = await response.json();
            setDiaryData(data);
        } catch (error) {
            console.error('Error fetching diary data:', error);
        }
    };

    const fetchInfoData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/babyInfo?command=allInfo&code=${baby.code}`);
            const data = await response.json();
            setInfoData(data);
        } catch (error) {
            console.error('Error fetching diary data:', error);
        }
    };

    useEffect(() => {
        fetchDiaryData();
        fetchInfoData();
        const interval = setInterval(() => {
            fetchDiaryData();
            fetchInfoData();
        }, 1000); // 1분마다 데이터 업데이트

        return () => clearInterval(interval);
    }, []);

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = async (day) => {
        setSelectedDate(day);
        const newFormatDate = format(day, 'yyyy-MM-dd');
        setFormatDate(newFormatDate);

        if (typeof onDateSelect === 'function') {
            onDateSelect(newFormatDate);
        }

        if (typeof onDateInfoSelect === 'function') {
            onDateInfoSelect(newFormatDate);
        }

        await fetchDiaryData(); // 클릭시마다 데이터 새로고침
        await fetchInfoData(); // 클릭시마다 데이터 새로고침
    };

    return (
        <div className='calendar-box'>
            <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <RenderDate />
            <RenderDay currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} diaryData={diaryData} infoData={infoData} />
        </div>
    );
}

