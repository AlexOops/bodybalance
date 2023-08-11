import React from 'react';
import Avatar from '@mui/material/Avatar';

const CustomAvatar = ({avatarUrl, fullName, size}) => {
    if (avatarUrl) {
        // Если есть URL аватарки, показываем аватарку
        return <Avatar src={`http://localhost:4444${avatarUrl}?timestamp=${new Date().getTime()}`} alt={fullName} style={{width: size, height: size}}/>;
    } else {
        // Иначе показываем инициалы
        const initials = fullName
            .split(' ')
            .map(name => name[0])
            .join('');
        return <Avatar style={{width: size, height: size}}>{initials}</Avatar>;
    }
};

export default CustomAvatar;