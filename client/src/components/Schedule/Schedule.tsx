import React, { useState } from 'react';
import './schedule.scss';
import { ScheduleList } from '../ScheduleList';

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
                ? <div className="modal-background">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Modal title</p>
                            <button 
                                className="delete" 
                                aria-label="close"
                                onClick={() => toggleModalWindow(!modalWindow)}
                            ></button>
                        </header>
                        <section className="modal-card-body is-flex-direction-column">
                            <input className="input is-info mb-4" type="text" placeholder="Номер потяга"/>
                            <div className='is-flex is-justify-content-space-between'>
                                <div>
                                    <input 
                                        className="input is-info" 
                                        type="text" 
                                        placeholder="Звідки"
                                    />
                                </div>
                                <div>
                                    <input 
                                        className="input is-info mb-4 " 
                                        type="text" 
                                        placeholder="Куди"
                                    />
                                </div>
                                
                            </div>
                            <input className="input is-info mb-4" type="text" placeholder="Перiодичнiсть"/>
                            <input className="input is-info mb-4" type="text" placeholder="Станція"/>
                            <input className="input is-info mb-4" type="text" placeholder="Прибуття"/>
                            <input className="input is-info mb-4" type="text" placeholder="Відправлення"/>
                            <input className="input is-info mb-4" type="text" placeholder="Кінцева"/>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success">Submit</button>
                            <button className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
                : <></>
            }
            
        </div>
    );
};
