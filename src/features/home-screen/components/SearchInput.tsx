import { debounce } from 'lodash';
import { useCallback } from 'react';

interface Props {
    onChange: (searchTerm: string) => void;
}

const SearchInput = (props: Props) => {

    const { onChange } = props;

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