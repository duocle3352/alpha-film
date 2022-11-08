import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debounceVale, setDebounceVale] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceVale(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debounceVale;
};

export default useDebounce;
