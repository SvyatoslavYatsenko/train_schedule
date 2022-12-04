import React, { useEffect, useState } from 'react';
import './schedule.scss';
import { ScheduleList } from '../ScheduleList';
import Modal from '../Modal/Modal';
import { ScheduleItemTypeFromServer, ScheduleItemTypeToServer } from '../../types/TrainSchedule';
import { addScheduleItem, removeScheduleItem } from '../../utils';

type ScheduleListType = ScheduleItemTypeFromServer[] | [];

export const Schedule: React.FC = () => {
    const [modalWindow, toggleModalWindow] = useState(false);
    const [data, setData] = useState<ScheduleListType>([]);
    const [seletctedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        fetch('/schedule')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [seletctedItems]);

    const handleDelete = async (itemId: number) => {
        setSelectedItems(state => [...state, itemId]);
        try {
            await removeScheduleItem(itemId);
            setData(state => [...state.filter(item => item.id !== itemId)]);
        } catch {
            console.log('error');
        }
        setSelectedItems([]);
    };

    const handleNewData = async (newItem: ScheduleItemTypeToServer) => {
        setSelectedItems(state => [...state, newItem.number]);
        try {
            await addScheduleItem(newItem);
        } catch {
            console.log('error');
        }
        setSelectedItems([]);
    };

    return (
        <div className='schedule'>
            <div className='schedule__list'>
                <ScheduleList 
                    data={data}
                    handleDelete={handleDelete}
                    toggleModalWindow={toggleModalWindow}
                    modalWindow={modalWindow}
                />
            </div>
            {modalWindow
                ? <Modal 
                    toggleModalWindow={toggleModalWindow}
                    modalWindow={modalWindow}
                    handleNewData={handleNewData}
                />
                : <></>
            }
            
        </div>
    );
};
