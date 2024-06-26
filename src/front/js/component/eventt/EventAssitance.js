import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../store/appContext'

export const EventAssistance = ({ eventId, assistances, onAssistanceChange }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.user_id : null;

    const [isAttending, setIsAttending] = useState(false);
    const { actions } = useContext(Context);

    useEffect(() => {
        const fetchAssistanceStatus = async () => {
            try {
                const data = await actions.getAssistanceStatus(eventId, userId);
                if (data) {
                    setIsAttending(data.is_attending);
                } else {
                    console.error('Error al obtener el estado de asistencia');
                }
            } catch (error) {
                console.error('Error al obtener el estado de asistencia', error);
            }
        };

        fetchAssistanceStatus();
    }, []);




    const handleButtonClick = async () => {
        if (isAttending) {
            await actions.removeAssistances(eventId, userId);
            setIsAttending(false);
        } else {
            await actions.addAssistances(eventId, userId);
            setIsAttending(true);
        }
        onAssistanceChange(); // Notificar al componente padre que ha habido un cambio en la asistencia
    };

    return (
        isAttending ?
            <button className="cancel-asist-button" onClick={handleButtonClick}>Cancelar asistencia</button> :
            <button className="asist-button" onClick={handleButtonClick}>Asistir</button>
    );
}