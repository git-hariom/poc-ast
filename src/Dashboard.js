
import { React } from 'react';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
    const temp="I am label";
    const [url, setUrl] = useState("http://google.com");
    const doActions = () => {
        console.log("do actions");
    }

    return (
        <>
            <Header label={temp} debug={doActions}></Header>
            <Footer title={"I have Nav Items"} url={url} setUrl={setUrl}></Footer>
        </>
    )
}

export default Dashboard;