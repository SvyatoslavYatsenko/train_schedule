import React, { useState, useEffect } from 'react';
import { ScheduleItem } from '../ScheduleItem';
import { ScheduleItemType } from '../../types/TrainSchedule';
import { removeScheduleItem } from '../../utils';

type ScheduleListType = ScheduleItemType[] | [];

type Props = {
    toggleModalWindow: (arg: boolean) => void
    modalWindow: boolean
}
export const ScheduleList: React.FC<Props> = ({
    toggleModalWindow,
    modalWindow
}) => {
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
    
    return (
        <div>
            <table className="table">
                <thead className='has-background-white-ter'>
                    <tr className=''>
                        <th><abbr title="TrainNumber">Номер потяга</abbr></th>
                        <th>Маршрут</th>
                        <th><abbr title="Periodicity">Перiодичнiсть з початкової станції маршруту</abbr></th>
                        <th><abbr title="Station">Назва станції</abbr></th>
                        <th><abbr title="ArrivingTime">Час прибуття</abbr></th>
                        <th><abbr title="DepartureTime">Час вiдправлення</abbr></th>
                        <th>Прибуття на кінцеву станцію</th>
                        <th>
                            <button    
                                className="button is-outlined"
                                onClick={() => toggleModalWindow(!modalWindow)}
                            >
                            New
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>  
                    
                
                
                <tfoot>
                    { 
                        data.map(item => 
                            <ScheduleItem 
                                key={item?.id} 
                                scheduleItem={item}
                                handleDelete={handleDelete}
                            />)}
                </tfoot>
            </table>
            
        </div>
    );
};


