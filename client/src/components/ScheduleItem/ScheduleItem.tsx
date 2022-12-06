import React, { FormEvent } from 'react';
import { ScheduleItemTypeFromServer } from '../../types/TrainSchedule';

type Props = {
    scheduleItem: ScheduleItemTypeFromServer
    handleDelete: (itemId: number) => Promise<void>
    setScheduleId: (itemId: number) => void
    toggleAddModal: (arg: boolean) => void
    addModal: boolean
}

export const ScheduleItem: React.FC<Props> = ({ scheduleItem, handleDelete, setScheduleId, toggleAddModal, addModal}) => {

    const handleRemove = async (event: FormEvent) => {
        event.preventDefault();
        handleDelete(scheduleItem?.id);
    };
    
    return (
        <tr>
            <th><abbr title="Number">{scheduleItem?.number}</abbr></th>
            <th><abbr title="Number">{scheduleItem?.route}</abbr></th>
            <th><abbr title="Periodicity">{scheduleItem?.periodicity}</abbr></th>
            <th><abbr title="Station">{scheduleItem?.station}</abbr></th>
            <th><abbr title="Arrival">{scheduleItem?.arrival}</abbr></th>
            <th><abbr title="Departure">{scheduleItem?.departure}</abbr></th>
            <th><abbr title="Terminal">{scheduleItem?.terminal}</abbr></th>
            <th> 
                <button 
                    className="button is-info is-outlined"
                    onClick={() => (setScheduleId(scheduleItem.id), toggleAddModal(!addModal))}
                >
                    <span>Edit</span>
                    <span className="icon is-small">
                        <i className="fas fa-times"></i>
                    </span>
                </button>
            </th>
            <th> 
                <button 
                    className="delete is-large"
                    onClick={(event) => handleRemove(event)}
                ></button>
            </th>
        </tr>        
    );
};
