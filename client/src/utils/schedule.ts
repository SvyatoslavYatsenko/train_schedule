import { ScheduleItemTypeToServer } from './../types/TrainSchedule';


export const removeScheduleItem = async (itemId: number) => {
    return fetch(`http://localhost:3001/schedule/${itemId}`, {
        method: 'DELETE'});
};

export const addScheduleItem = async (newItem: ScheduleItemTypeToServer) => {
    return fetch('http://localhost:3001/schedule/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem),
    });
};

export const editScheduleItem = async (editededItem: ScheduleItemTypeToServer, itemId: number) => {
    return fetch(`http://localhost:3001/schedule/edit/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editededItem),
    });
};
