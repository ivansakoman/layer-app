/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { useCallback } from 'react';

interface Props {
    onChange: (searchTerm: string) => void;
}

const SearchInput = (props: Props) => {

    const { onChange } = props;

    //don't send request for every letter, but wait for 350ms between keypresses and than send request
    const valueCallback = useCallback(debounce(onChange, 350), []);

    const handleChange = (value: string) => {
        valueCallback(value);
    }

    return <input
        className="input input--base input--text type--center type--lg"
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Enter search term'
    />
}

export default SearchInput;