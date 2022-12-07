import React, { useEffect, useState } from 'react';
import './schedule.scss';
import { ScheduleList } from '../ScheduleList';
import Modal from '../Modal/Modal';
import { ScheduleItemTypeFromServer, ScheduleItemTypeToServer } from '../../types/TrainSchedule';
import { addScheduleItem, editScheduleItem, removeScheduleItem } from '../../utils';
import { SortBy } from '../../types/SortTypes';

type ScheduleListType = ScheduleItemTypeFromServer[] | [];




export const Schedule: React.FC = () => {
    const [addModal, toggleAddModal] = useState(false);
    const [data, setData] = useState<ScheduleListType>([]);
    const [seletctedItems, setSelectedItems] = useState<number[]>([]);
    const [scheduleId, setScheduleId] = useState<number | null>(null);
    const [sortType, setSortType] = useState<SortBy>(SortBy.NUMBER);
    const [sortedData, setSortedData] = useState<ScheduleListType>([]);

    useEffect(() => {
        fetch('/schedule')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [seletctedItems]);

    console.log(data);
    console.log(sortedData);

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
                    setData={setData}
                    handleDelete={handleDelete}
                    toggleAddModal={toggleAddModal}
                    addModal={addModal}
                    setScheduleId={setScheduleId}
                    setSortType={setSortType}
                    sortType={sortType}
                    setSortedData={setSortedData}
                    sortedData={sortedData}
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
