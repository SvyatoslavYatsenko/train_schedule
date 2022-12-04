import { ScheduleItemTypeToServer } from './../types/TrainSchedule';


export const removeScheduleItem = async (itemId: number) => {
    await fetch(`http://localhost:3001/schedule/${itemId}`, {
        method: 'DELETE'});
};

export const addScheduleItem = async (newItem: ScheduleItemTypeToServer) => {
    await fetch('http://localhost:3001/schedule/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem),
    });
};
