import s from './SearchBar.module.scss'
import React, {useState} from 'react';

export const SearchBar = ({onSearchChange}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearchChange(e.target.value);
    }

    return (
        <div className={s.searchBlock}>
            <input
                className={s.search}
                type="text"
                placeholder="Поиск пациента"
                value={searchQuery}
                onChange={handleSearchChange}/>

            <button className={s.button}> + Добавить нового пациента</button>
        </div>
    );
}