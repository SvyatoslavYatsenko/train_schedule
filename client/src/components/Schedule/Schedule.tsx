import React, { useState } from 'react';
import './schedule.scss';
import { ScheduleList } from '../ScheduleList';
import Modal from '../Modal/Modal';

export const Schedule: React.FC = () => {
    const [modalWindow, toggleModalWindow] = useState(false);

    return (
        <div className='schedule'>
            <div className='schedule__list'>
                <ScheduleList 
                    toggleModalWindow={toggleModalWindow}
                    modalWindow={modalWindow}
                />
            </div>
            {modalWindow
                ? <Modal 
                    toggleModalWindow={toggleModalWindow}
                    modalWindow={modalWindow}
                />
                : <></>
            }
            
        </div>
    );
};
