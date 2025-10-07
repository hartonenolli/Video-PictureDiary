import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const Timer = () => {
    const [count, setCount] = useState(10);

    useEffect(() => {
        if (count === 0) return;
        const timer = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [count]);

    return (
            <Typography variant="h4" color="black">Recording: {count}</Typography>
    );
};

export default Timer;