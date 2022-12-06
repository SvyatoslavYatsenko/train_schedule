import React, { useEffect, useState } from 'react';
import './schedule.scss';
import { ScheduleList } from '../ScheduleList';
import Modal from '../Modal/Modal';
import { ScheduleItemTypeFromServer, ScheduleItemTypeToServer } from '../../types/TrainSchedule';
import { addScheduleItem, editScheduleItem, removeScheduleItem } from '../../utils';

type ScheduleListType = ScheduleItemTypeFromServer[] | [];

export const Schedule: React.FC = () => {
    const [addModal, toggleAddModal] = useState(false);
    const [data, setData] = useState<ScheduleListType>([]);
    const [seletctedItems, setSelectedItems] = useState<number[]>([]);
    const [scheduleId, setScheduleId] = useState<number | null>(null);

    useEffect(() => {
        fetch('/schedule')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [seletctedItems]);

    const handleDelete = async (itemId: number) => {
        removeScheduleItem(itemId).then(() => setData(state => [...state.filter(item => item.id !== itemId)]));
    };

    const addSchedule = async (newItem: ScheduleItemTypeToServer) => {
        addScheduleItem(newItem).then(() => setSelectedItems(state => [...state, newItem.number]));
    };

    const editSchedule = async (editededItem: ScheduleItemTypeToServer) => {
        if(scheduleId) {
            editScheduleItem(editededItem, scheduleId).then(() => setSelectedItems(state => [...state, editededItem.number]));
        }
    };

    return (
        <div className='schedule'>
            <div className='schedule__list'>
                <ScheduleList 
                    data={data}
                    handleDelete={handleDelete}
                    toggleAddModal={toggleAddModal}
                    addModal={addModal}
                    setScheduleId={setScheduleId}
                />
            </div>
            {addModal
                ? <Modal 
                    toggleAddModal={toggleAddModal}
                    addModal={addModal}
                    addSchedule={addSchedule}
                    editSchedule={editSchedule}
                    scheduleId={scheduleId}
                    setScheduleId={setScheduleId}
                    data={data.filter(item => item.id === scheduleId)}
                />
                : <></>
            }
            
        </div>
    );
};
