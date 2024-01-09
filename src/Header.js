import { React } from 'react';

const Header = (props) => {
    const {
        label,
        debug
    } = {...props};

    return (
        <div>{label}</div>
    )
}

export default Header;