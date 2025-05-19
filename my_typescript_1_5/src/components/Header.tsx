import { Link } from 'react-router-dom';
import { Container } from '../routes/Coins';

import styled from 'styled-components';

function Header() {
    return <Container2>
        <ul>
            <li><Link to='/ ' >Home</Link></li>
            <li><Link to='/about ' >About</Link></li>
        </ul>
    </Container2>
}
export default Header; 

export const Container2 = styled(Container)`
    background-color:teal;
    margin-bottom:40px;

    li{
        height:40px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
`;