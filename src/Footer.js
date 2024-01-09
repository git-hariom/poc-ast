import { React } from 'react';

const Footer = (props) => {
    const {
        title,
        url,
        setUrl
    } = {...props};

    return (
        <>
            <div>{title}</div>
            <div>{url}</div>
        </>
    )
}

export default Footer;