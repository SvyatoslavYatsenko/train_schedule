import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { ScheduleItemTypeFromServer, ScheduleItemTypeToServer } from '../../types/TrainSchedule';

type Props = {
    toggleAddModal: (arg: boolean) => void
    addModal: boolean
    addSchedule: (newItem: ScheduleItemTypeToServer) => void
    editSchedule: (editedItem: ScheduleItemTypeToServer) => void
    scheduleId: number | null
    setScheduleId: (item: number | null) => void
    data: ScheduleItemTypeFromServer[]
}

const Modal: React.FC<Props> = ({
    toggleAddModal,
    addModal,
    addSchedule,
    editSchedule,
    scheduleId,
    data

}) => {
    const { register, handleSubmit,reset, setValue, formState, formState:{errors}, 
    } = useForm<ScheduleItemTypeToServer>();

    const isAddMode = !scheduleId;
    
    console.log(isAddMode);

    const splitRoute = (data: ScheduleItemTypeFromServer[]) => {
        const route = data[0].route.split('-');
        const obj = JSON.parse(JSON.stringify(data[0]));
        delete obj.route;
        obj.route_from = route[0];
        obj.route_to = route[1];
        return obj;
    };

    useEffect(() => {
        if (!isAddMode) {
            const edit = splitRoute(data);

            setValue('number', edit['number']);
            setValue('route_from', edit['route_from']);
            setValue('route_to', edit['route_to']);
            setValue('periodicity', edit['periodicity']);
            setValue('station', edit['station']);
            setValue('arrival', edit['arrival']);
            setValue('departure', edit['departure']);   
            setValue('terminal', edit['terminal']);
        }

    }, [isAddMode]);

    const onSubmit = (data: ScheduleItemTypeToServer) => {
        return isAddMode 
            ?addSchedule(data)
            :editSchedule(data);
    };

    return (
        <div>
            <form 
                onSubmit={handleSubmit(data => onSubmit(data))}
            >
                <div className="modal-background">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{isAddMode 
                                ? 'Новий графік' 
                                : 'Змінити графік'}</p>
                            <button 
                                className="delete" 
                                aria-label="close"
                                onClick={() => toggleAddModal(!addModal)}
                            ></button>
                        </header>               
                        <section className="modal-card-body is-flex-direction-column">
                            <div className="field">
                                <label className="label">Номер потяга</label>
                                <div className="control">
                                    <input 
                                        className={classNames(
                                            errors.number 
                                                ? 'input is-danger' 
                                                : 'input is-success' 
                                        )}
                                        type="text"
                                        placeholder="Text input"
                                        {...register('number', { 
                                            required: 'Train number is required', 
                                            maxLength: {
                                                value: 33,
                                                message: 'This input exceed maxLength.'
                                            },
                                            pattern: {
                                                value: /^[0-9]/,
                                                message: 'First symbol must be integer'
                                            }
                                        })}
                                    />
                                </div>
                                {errors.number 
                                    ? (
                                        <>
                                            {errors.number.type === 'required' && (
                                                <p className="help is-danger">{errors.number.message}</p>
                                            )}
                                            {errors.number.type === 'maxLength' && (
                                                <p className="help is-danger">{errors.number.message}</p>
                                            )}
                                            {errors.number.type === 'pattern' && (
                                                <p className="help is-danger">{errors.number.message}</p>
                                            )}
                                        </>
                                    ) : <p className="help is-success">Good</p>}
                            </div>
                        
                            <div className='is-flex is-justify-content-space-between is-align-items-center'>
                                <div className="field">
                                    <label className="label">Маршрут</label>
                                    <div className="control">
                                        <input 
                                            className={classNames(
                                                errors.route_from 
                                                    ? 'input is-danger' 
                                                    : 'input is-success' 
                                            )} 
                                            {...register ('route_from',
                                                { 
                                                    required: 'Input is required', 
                                                    maxLength: {
                                                        value: 25,
                                                        message: 'This input exceed maxLength.'
                                                    },
                                                })}
                                            type="text"               
                                            placeholder="Звідки прямує"
                                        />
                                    </div>
                                    {errors.route_from 
                                        ? (
                                            <>
                                                {errors.route_from.type === 'required' && (
                                                    <p className="help is-danger">{errors.route_from.message}</p>
                                                )}
                                                {errors.route_from.type === 'maxLength' && (
                                                    <p className="help is-danger">{errors.route_from.message}</p>
                                                )}
                                                
                                            </>
                                        ) : <p className="help is-success">Good</p>}
                                </div>
                                <div className="field mt-4">
                                    <div className="control">
                                        <input 
                                            className={classNames(
                                                errors.route_to 
                                                    ? 'input is-danger' 
                                                    : 'input is-success' 
                                            )} 
                                            {...register ('route_to', 
                                                { 
                                                    required: 'Input is required', 
                                                    maxLength: {
                                                        value: 25,
                                                        message: 'This input exceed maxLength.'
                                                    },
                                                   
                                                })}
                                            type="text"               
                                            placeholder="Куди прямує"
                                        />
                                    </div>
                                    {errors.route_to 
                                        ? (
                                            <>
                                                {errors.route_to.type === 'required' && (
                                                    <p className="help is-danger">{errors.route_to.message}</p>
                                                )}
                                                {errors.route_to.type === 'maxLength' && (
                                                    <p className="help is-danger">{errors.route_to.message}</p>
                                                )}
                                                
                                            </>
                                        ) : <p className="help is-success">Good</p>}
                                </div>
                            </div>
                            <div>
                                <div className="field">
                                    <label className="label">Перiодичнiсть з початкової станції маршруту</label>
                                    <div className="control">
                                        <input 
                                            className={classNames(
                                                errors.periodicity 
                                                    ? 'input is-danger' 
                                                    : 'input is-success' 
                                            )} 
                                            {...register ('periodicity',
                                                { 
                                                    required: 'Input is required', 
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'This input exceed maxLength.'
                                                    }
                                                })}
                                            type="text"               
                                            placeholder="Text input"
                                        />
                                    </div>
                                    {errors.periodicity 
                                        ? (
                                            <>
                                                {errors.periodicity.type === 'required' && (
                                                    <p className="help is-danger">{errors.periodicity.message}</p>
                                                )}
                                                {errors.periodicity.type === 'maxLength' && (
                                                    <p className="help is-danger">{errors.periodicity.message}</p>
                                                )}
                                            </>
                                        ) : <p className="help is-success">Nice</p>}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Назва станції</label>
                                <div className="control">
                                    <input 
                                        className={classNames(
                                            errors.station 
                                                ? 'input is-danger' 
                                                : 'input is-success' 
                                        )} 
                                        {...register ('station', {
                                            required: 'Input is required', 
                                            maxLength: {
                                                value: 25,
                                                message: 'This input exceed maxLength.'
                                            },
                                        })} 
                                        type="text"               
                                        placeholder="Text input"
                                    />
                                </div>
                                {errors.station 
                                    ? (
                                        <>
                                            {errors.station.type === 'required' && (
                                                <p className="help is-danger">{errors.station.message}</p>
                                            )}
                                            {errors.station.type === 'maxLength' && (
                                                <p className="help is-danger">{errors.station.message}</p>
                                            )}                                        </>
                                    ) : <p className="help is-success">Good</p>}
                            </div>
                            <div className="field">
                                <label className="label">Час прибуття</label>
                                <div className="control">
                                    <input 
                                        className={classNames(
                                            errors.arrival 
                                                ? 'input is-danger' 
                                                : 'input is-success' 
                                        )}
                                        {...register ('arrival', {
                                            required: 'Input is required', 
                                            maxLength: {
                                                value: 25,
                                                message: 'This input exceed maxLength.'
                                            },
                                            pattern: {
                                                value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                                                message: 'You have to write time format like 23:00'
                                            }
                                        })} 
                                        type="text"                
                                        placeholder="Text input"
                                    />
                                </div>
                                {errors.arrival 
                                    ? (
                                        <>
                                            {errors.arrival.type === 'required' && (
                                                <p className="help is-danger">{errors.arrival.message}</p>
                                            )}
                                            {errors.arrival.type === 'maxLength' && (
                                                <p className="help is-danger">{errors.arrival.message}</p>
                                            )}
                                            {errors.arrival.type === 'pattern' && (
                                                <p className="help is-danger">{errors.arrival.message}</p>
                                            )}
                                        </>
                                    ) : <p className="help is-success">Good</p>}
                            </div>
                            <div className="field">
                                <label className="label">Час вiдправлення</label>
                                <div className="control">
                                    <input 
                                        className={classNames(
                                            errors.departure 
                                                ? 'input is-danger' 
                                                : 'input is-success' 
                                        )}
                                        {...register ('departure', {
                                            required: 'Input is required', 
                                            maxLength: {
                                                value: 25,
                                                message: 'This input exceed maxLength.'
                                            },
                                            pattern: {
                                                value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                                                message: 'You have to write time format like 23:00'
                                            }
                                        })} 
                                        type="text"                
                                        placeholder="Text input"
                                    />
                                </div>
                                {errors.departure 
                                    ? (
                                        <>
                                            {errors.departure.type === 'required' && (
                                                <p className="help is-danger">{errors.departure.message}</p>
                                            )}
                                            {errors.departure.type === 'maxLength' && (
                                                <p className="help is-danger">{errors.departure.message}</p>
                                            )}
                                            {errors.departure.type === 'pattern' && (
                                                <p className="help is-danger">{errors.departure.message}</p>
                                            )}
                                        </>
                                    ) : <p className="help is-success">Good</p>}
                            </div>
                            <div className="field">
                                <label className="label">Прибуття на кінцеву станцію</label>
                                <div className="control">
                                    <input 
                                        className={classNames(
                                            errors.terminal 
                                                ? 'input is-danger' 
                                                : 'input is-success' 
                                        )}
                                        {...register ('terminal', {
                                            required: 'Input is required', 
                                            maxLength: {
                                                value: 25,
                                                message: 'This input exceed maxLength.'
                                            },
                                            pattern: {
                                                value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                                                message: 'You have to write time format like 23:00'
                                            }
                                        })} 
                                        type="text"              
                                        placeholder="Text input"
                                    />
                                </div>
                                {errors.terminal 
                                    ? (
                                        <>
                                            {errors.terminal.type === 'required' && (
                                                <p className="help is-danger">{errors.terminal.message}</p>
                                            )}
                                            {errors.terminal.type === 'maxLength' && (
                                                <p className="help is-danger">{errors.terminal.message}</p>
                                            )}
                                            {errors.terminal.type === 'pattern' && (
                                                <p className="help is-danger">{errors.terminal.message}</p>
                                            )}
                                        </>
                                    ) : <p className="help is-success">Good</p>}
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button 
                                type="submit" 
                                className={'button is-success'}
                                onClick={() => formState.isSubmitSuccessful && toggleAddModal(!addModal)}
                            >
                                {formState.isSubmitSuccessful ? 'Close' : 'Save'}
                            </button>
                            <input
                                className='button'
                                type="button"
                                onClick={() => reset()}
                                value="Reset"
                            />
                        </footer>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Modal;
