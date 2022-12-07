import React, { useEffect } from 'react';
import { ScheduleItemTypeFromServer } from '../../types/TrainSchedule';
import { ScheduleItem } from '../ScheduleItem';
import { SortBy } from '../../types/SortTypes';

type ScheduleListType = ScheduleItemTypeFromServer[] | [];

type Props = {
    toggleAddModal: (arg: boolean) => void
    addModal: boolean
    data: ScheduleListType
    setData:(data:ScheduleListType) => void
    handleDelete: (itemId: number) => Promise<void>
    setScheduleId: (itemId: number) => void
    setSortType: (arg: SortBy) => void
    sortType: string
    setSortedData: (data:ScheduleListType) => void
    sortedData: ScheduleListType
}


export const ScheduleList: React.FC<Props> = ({
    toggleAddModal,
    addModal,
    data,
    handleDelete,
    setScheduleId,
    setSortType,
    sortType,
    setSortedData,
    sortedData

}) => {
    
    console.log(sortedData);

    const sortData = () => {
        switch(sortType) {
        case SortBy.NUMBER:
            sortedData.sort(function (a, b) {
                if (a.number > b.number) {
                    return 1;
                }
                if (a.number < b.number) {
                    return -1;
                }
                return 0;
            });
            break;

        case SortBy.ROUTE:
            sortedData.sort(function (a, b) {
                return ('' + a.route).localeCompare(b.route);
            });
            break;
        case SortBy.STATION:
            sortedData.sort(function (a, b) {
                return ('' + a.route).localeCompare(b.route);
            });
            break;
        case SortBy.ARRIVAL:
            sortedData.sort(function (a, b) {
                if (a.arrival > b.arrival) {
                    return 1;
                }
                if (a.arrival < b.arrival) {
                    return -1;
                }
                return 0;
            });
            break;
        case SortBy.DEPARTURE:
            sortedData.sort(function (a, b) {
                if (a.departure > b.departure) {
                    return 1;
                }
                if (a.departure < b.departure) {
                    return -1;
                }
                return 0;
            });
            break;
        
            
        }
        
        setSortedData(sortedData);
    };


    useEffect(sortData,
        [sortType]);
    console.log(sortedData);

    return (
        <div>
            <table className="table">
                <thead className='has-background-white-ter'>
                    <tr>
                        <th>
                            <abbr  
                                className='is-clickable'
                                title="TrainNumber"
                            >
                                Номер потягу
                            </abbr>
                        </th>
                        <th>
                            <abbr  
                                title="Route"
                            >
                                Маршрут
                            </abbr>
                        </th>
                        <th>
                            <abbr 
                                title="Periodicity"
                            >
                                Перiодичнiсть з початкової станції маршруту
                            </abbr>
                        </th>
                        <th>
                            <abbr 
                                title="Station"
                            >
                                Назва станції
                            </abbr>
                        </th>
                        <th>
                            <abbr 
                                title="ArrivingTime"
                            >
                                Час прибуття
                            </abbr>
                        </th>
                        <th>
                            <abbr 
                                title="DepartureTime"
                            >
                                Час вiдправлення
                            </abbr>
                        </th>
                        <th>
                            <abbr 
                                title="Terminal"
                            >
                                Прибуття на кінцеву станцію
                            </abbr>
                        </th>
                        <th>
                            <button    
                                className="button is-outlined"
                                onClick={() => (toggleAddModal(!addModal), setScheduleId(0))}
                            >
                            New
                            </button>
                        </th>
                        <th>
                            <div className="select">
                                <select 
                                    className="is-hovered"
                                    onChange={(event) => setSortType(event.target.value as SortBy)}
                                >
                                    <option value={SortBy.NUMBER}>Номер потягу</option>
                                    <option value={SortBy.ROUTE}>Маршрут</option>
                                    <option value={SortBy.STATION}>Станція</option>
                                    <option value={SortBy.ARRIVAL}>Прибуття</option>
                                    <option value={SortBy.DEPARTURE}>Відправлення</option>
                                    <option value={SortBy.TERMINAL}>Прибуття на кінцеву станцію</option>
                                </select>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>  
                <tfoot>
                    { 
                        sortedData.map(item => 
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


