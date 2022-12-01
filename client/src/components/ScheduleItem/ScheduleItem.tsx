import React, { FormEvent } from 'react';
import { ScheduleItemType } from '../../types/TrainSchedule';

type Props = {
    scheduleItem: ScheduleItemType
    handleDelete: (itemId: number) => Promise<void>
}

export const ScheduleItem: React.FC<Props> = ({ scheduleItem, handleDelete}) => {

    const handleRemove = async (event: FormEvent) => {
        event.preventDefault();
        handleDelete(scheduleItem?.id);
    };
    
    return (
        <tr>
            <th><abbr title="Position">{scheduleItem?.number}</abbr></th>
            <th>{scheduleItem?.route}</th>
            <th><abbr title="Played">{scheduleItem?.periodicity}</abbr></th>
            <th><abbr title="Won">{scheduleItem?.station}</abbr></th>
            <th><abbr title="Drawn">{scheduleItem?.arrival}</abbr></th>
            <th><abbr title="Lost">{scheduleItem?.departure}</abbr></th>
            <th><abbr title="Goals for">{scheduleItem?.terminal}</abbr></th>
            <th> 
                <button className="button is-info is-outlined">
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
