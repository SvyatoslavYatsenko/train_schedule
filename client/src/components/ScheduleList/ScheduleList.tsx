import React from 'react';
import { ScheduleItemTypeFromServer } from '../../types/TrainSchedule';
import { ScheduleItem } from '../ScheduleItem';

type ScheduleListType = ScheduleItemTypeFromServer[] | [];

type Props = {
    toggleModalWindow: (arg: boolean) => void
    modalWindow: boolean
    data: ScheduleListType
    handleDelete: (itemId: number) => Promise<void>
}
export const ScheduleList: React.FC<Props> = ({
    toggleModalWindow,
    modalWindow,
    data,
    handleDelete,
}) => {
    
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


