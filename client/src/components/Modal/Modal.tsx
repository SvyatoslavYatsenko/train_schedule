import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    toggleModalWindow: (arg: boolean) => void
    modalWindow: boolean
}

const Modal: React.FC<Props> = ({
    toggleModalWindow,
    modalWindow
}) => {
    const {register} = useForm();

    return (
        <div>
            <div className="modal-background">
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button 
                            className="delete" 
                            aria-label="close"
                            onClick={() => toggleModalWindow(!modalWindow)}
                        ></button>
                    </header>
                    
                    <form>
                        <section className="modal-card-body is-flex-direction-column">
                            <div className="field">
                                <label className="label">Номер потяга</label>
                                <div className="control">
                                    <input 
                                        className="input is-success" 
                                        type="text"               
                                        placeholder="Text input"
                                    />
                                </div>
                                <p className="help is-success">This username is available</p>
                            </div>
                            <div className='is-flex is-justify-content-space-between is-align-items-center'>
                                <div className="field">
                                    <label className="label">Маршрут</label>
                                    <div className="control">
                                        <input 
                                            className="input is-success" 
                                            type="text"               
                                            placeholder="Звідки прямує"
                                        />
                                    </div>
                                    <p className="help is-success">This username is available</p>
                                </div>
                                <div className="field mt-2">
                                    <label className="label"></label>
                                    <div className="control">
                                        <input 
                                            className="input is-success" 
                                            type="text"               
                                            placeholder="Куди прямує"
                                        />
                                    </div>
                                    <p className="help is-success">This username is available</p>
                                </div>
                            </div>
                            <div>
                                <div className="field">
                                    <label className="label">Перiодичнiсть з початкової станції маршруту</label>
                                    <div className="control">
                                        <input 
                                            className="input is-success" 
                                            type="text"               
                                            placeholder="Text input"
                                        />
                                    </div>
                                    <p className="help is-success">This username is available</p>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Назва станції</label>
                                <div className="control">
                                    <input 
                                        className="input is-success" 
                                        type="text"               
                                        placeholder="Text input"
                                    />
                                </div>
                                <p className="help is-success">This username is available</p>
                            </div>
                            <div className="field">
                                <label className="label">Час прибуття</label>
                                <div className="control">
                                    <input 
                                        className="input is-success" 
                                        type="time"                
                                        placeholder="Text input"
                                    />
                                </div>
                                <p className="help is-success">This username is available</p>
                            </div>
                            <div className="field">
                                <label className="label">Час вiдправлення</label>
                                <div className="control">
                                    <input 
                                        className="input is-success" 
                                        type="time"                
                                        placeholder="Text input"
                                    />
                                </div>
                                <p className="help is-success">This username is available</p>
                            </div>
                            <div className="field">
                                <label className="label">Прибуття на кінцеву станцію</label>
                                <div className="control">
                                    <input 
                                        className="input is-danger" 
                                        type="time"              
                                        placeholder="Text input"
                                    />
                                </div>
                                <p className="help is-danger">This username is available</p>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success">Submit</button>
                            <button className="button">Cancel</button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
