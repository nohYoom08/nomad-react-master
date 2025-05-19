import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useQuery} from 'react-query';
import styled from 'styled-components';

import { lightTheme,darkTheme } from '../theme';

import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";


function Coins() {
    const {isLoading, data} = useQuery<coinInterface[]>("allCoins", fetchCoins); 
    //다른 페이지 갔다가 돌아와도 Loading 안 뜸. react-query는 캐시에 데이터를 저장해두기 때문
    
    const navigate = useNavigate();
    const nums = [1, 2, 3, 4, 5]
    const [loading,setLoading]=useState(true);

    interface coinInterface{
        id: string,
        name: string,
        symbol: string,
        rank: number,
        is_new: boolean,
        is_active: boolean,
        type: string,
    }

    const setterDark = useSetRecoilState(isDarkAtom);
    const toggleDark = () => {
        setterDark(prev=>!prev);
    }

    console.log("data",data);
    //recoil변수들을 set하는 함수
    //isDarkAtom자체가 그냥 isDark 변수 하나만 설정하는것.
    //하나의 atom당 하나의 변수


    // const [coins,setCoins] = useState<coinInterface[]>([
    //     {
    //         "id": "btc-bitcoin",
    //         "name": "Bitcoin",
    //         "symbol": "BTC",
    //         "rank": 1,
    //         "is_new": false,
    //         "is_active": true,
    //         "type": "coin"
    //     },
    //     {
    //         "id": "btc-etherium",
    //         "name": "Etherium",
    //         "symbol": "BTC",
    //         "rank": 1,
    //         "is_new": false,
    //         "is_active": true,
    //         "type": "coin"
    //     },
    //     {
    //         "id": "btc-moon",
    //         "name": "Moon",
    //         "symbol": "BTC",
    //         "rank": 1,
    //         "is_new": false,
    //         "is_active": true,
    //         "type": "coin"
    //     }
    // ]);


    // useEffect(()=>{
    //     (async()=>{
    //         const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
    //         const json = await response.json();
    //         console.log(json);
    //         setCoins(json.slice(0,10));
    //         setLoading(false);
    //     })();
    // },[]);  //useEffect에서 async쓰는 Tip



    return <Container>
        <button onClick={toggleDark}>Toggle</button>
        {/* recoil set함수 */}
        <Helmet>
            <title>
                코인
            </title>
        </Helmet>
        {/* index.tsx에서 title 바꾸는 역할 (각 페이지마다 가능) 
        중요한건 <head>를 참조하는 것일 뿐, 새로운 head를 넣는 것이 아님.
        즉 여기다가 favicon이나 css를 넣을 수도 있음*/}
        <Header>코인 COIN</Header>

        {isLoading
        
        ?
        "Loading..."        //그냥 별다른 태그 없이 텍스트만 넣어도 됨
        :
        <CoinsList>
            {data?.slice(0,10).map((item, index) =>
                <Link key={item.id} to={item.id} state={{
                    name:item.name,
                }}>
                    {/* Link는 a태그 활용 + 객체전달은 state속성 따로 */}
                    <Coin id={String(index + 1)}>
                        <ImgCoin src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}></ImgCoin>
                        Coin : {item.name} &rarr;
                    </Coin>
                    {/* //이미지경로 자체에 api주소 연결 */}
                </Link>
                //&nbsp; '&;'의 문법 잘 기억
            )}
            {nums.map((item, index) =>
                <Link key={index} to={String(index + 1)}>
                    <Coin id={String(index + 1)}>Coin : {index + 1}</Coin>
                </Link>
            )
            }
        </CoinsList>
}
    </Container>
}

export default Coins;


export const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:20px;
`;
const Header = styled.header``;
const CoinsList = styled.ul``;
const Coin = styled.h1`
    width:400px;
    height:100px;
    margin-bottom:4px;
    border-radius:20px;

    background-color:white;
    color:${darkTheme.colors.bgColor};

    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding:20px;

    transition:color 0.2s ease-out;
    gap:12px;

    &:hover{
        color:orange;
    }
    `;
const ImgCoin = styled.img`
width:40px;
height:40px;  
`;
const Title = styled.h1`
        color:${darkTheme.colors.btnColor};
    `

