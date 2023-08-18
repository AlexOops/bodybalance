import React, {useState} from 'react';
import s from "./CreatePatient.module.scss";
import axios from "../../../axios";

export const CreatePatient = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('/admin/customers/newCustomer',
                {
                    fullName: fullName,
                    email: email
                }
            );

            if (response.data.success) {
                setSuccess(true);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Произошла ошибка при отправке запроса ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <p className={s.request}>Отправка...</p>
            ) : (
                <div className={s.newCustomer}>
                    {error && <p className={s.error}>{error}</p>}
                    {success ? (
                        <p className={s.success}>Временный пароль отправлен на email пациента</p>
                    ) : (
                        <form className={s.block} onSubmit={handleSubmit}>

                            <input className={s.input}
                                   type="text"
                                   placeholder={'Введите Имя и Фамилию'}
                                   value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}/>

                            <input className={s.input}
                                   type="email"
                                   placeholder={'Введите адрес электронной почты'}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>

                            <button type={"submit"} className={s.button}>Создать и отправить временный пароль</button>
                        </form>
                    )}
                </div>
            )}

        </>
    );
};