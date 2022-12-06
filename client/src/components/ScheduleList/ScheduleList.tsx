import React from 'react';
import { ScheduleItemTypeFromServer } from '../../types/TrainSchedule';
import { ScheduleItem } from '../ScheduleItem';

type ScheduleListType = ScheduleItemTypeFromServer[] | [];

type Props = {
    toggleAddModal: (arg: boolean) => void
    addModal: boolean

    data: ScheduleListType
    handleDelete: (itemId: number) => Promise<void>
    setScheduleId: (itemId: number) => void
}
export const ScheduleList: React.FC<Props> = ({
    toggleAddModal,
    addModal,
    data,
    handleDelete,
    setScheduleId
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
                                onClick={() => toggleAddModal(!addModal)}
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
                                setScheduleId={setScheduleId}
                                toggleAddModal={toggleAddModal}
                                addModal={addModal}
                            />)}
                </tfoot>
            </table>
        </div>
    );
};


