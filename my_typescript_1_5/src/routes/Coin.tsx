import { useState, useEffect } from 'react';
import { useParams, useLocation, Outlet, Link} from "react-router-dom";
import {Helmet} from 'react-helmet';
import {Container} from './Coins';
import {Flex} from '../screens/Root';

import styled from 'styled-components';

import {useQuery} from 'react-query';

import {fetchInfo, fetchPrice} from '../api';

function Coin() {
    const { coinId } = useParams();
    const location = useLocation();
    const { state: { name } } = useLocation();
    //상위스크린에서 props인자 받아오기(Link에서 state속성)
    //디스트럭쳐링 => 중괄호 쳐져 있다는 뜻은 변수 선언과 대입을 동시에 하겠다는 뜻 
    const [endParam,setEndParam]=useState("");

    const {isLoading:infoLoading, data:infoData} = 
        useQuery<IInfo>(["info",coinId], ()=>fetchInfo(coinId));
    const {isLoading:priceLoading, data:priceData} = 
        useQuery<IPrice>
        (["price",coinId], 
        ()=>fetchPrice(coinId),
        {refetchInterval:5000});
    //query의 키는 array형태이므로 위와같이 처리해도 됨
    //isLoading:infoLoading => 기존의 isLoading을 infoLoading으로 변수명을 바꿔줌(디스트럭쳐링 문법의 일부)

    console.log("Datas",infoData, priceData);
    // const [info, setInfo] = useState<IInfo>();
    // //인터페이스 명시해줬으면 괄호안에 중괄호(빈 객체) 넣을 필요 없음 
    // const [price, setPrice] = useState<IPrice>();

    interface ITag {
        coin_counter: number;
        ico_counter: number;
        id: string;
        name: string;
    }
    interface IInfo {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        is_new: boolean;
        is_active: boolean;
        type: string;
        logo: string;
        tags: ITag[];
        // 인터페이스 내 object 자료형 처리하기
        team: object;
        description: string;
        message: string;
        open_source: boolean;
        started_at: string;
        development_status: string;
        hardware_wallet: boolean;
        proof_type: string;
        org_structure: string;
        hash_algorithm: string;
        links: object;
        links_extended: object;
        whitepaper: object;
        first_data_at: string;
        last_data_at: string;
    }
    //1. 오른쪽마우스 => 'store global 뭐시기'
    //2. Object.keys(temp1).join()
    //3. 쉼표만 컨트롤+d 후 엔터키
    //4. option+shift+드래그 후 ':;' 추가
    //5. Object.keys(temp1).map(item=>typof(item)).join()
    //6. 3번 적용 후 잘라내기
    //7. 4번 한 후에 6번의 잘라내기를 붙여넣기



    interface IPrice {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
        beta_value: number;
        first_data_at: string;
        last_updated: string;
        quotes: object;
    }

    console.log(location);

    useEffect(()=>{
        setEndParam(location.pathname.split('/').pop() || '');
        //location.pathname의 타입을 지정하기 애매한 상황이라면(location이 useLocation()에서 얻어온 것이니)
        // || 연산자 적극 활용
    },[location])

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await (fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`))).json();
    //         console.log("infoData", infoData);
    //         setInfo(infoData);

    //         const priceData = await (await (fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`))).json();
    //         console.log("priceData", priceData);
    //         setPrice(priceData);
    //     })();
    // }, []);


    return <Container>
        <Helmet>
            <title>
                {location?.state?.name}
            </title>
        </Helmet>
        {!infoLoading&&!priceLoading
        //loading이 false일 때 렌더링해야지, true일 때 렌더링한다고 하면 당연히 ts는 '무조건 타입이 never인 상황'을 도출할 수 밖에 없음.
        //그래서 infoData?.symbol와 priceData?.max_supply에서 오류가 난 것
        &&
        <div>
            <h1>Coin {coinId || "LOADING"}!!!</h1>
            <h1>COIN_NAME {location?.state?.name || "LLOOAADDIINNGG"}!!!</h1>
            {/* 만약 coins 페이지를 안 통하고 그냥 바로 들어온다면 state에 담겨있는 정보가 없으므로 undefined가 됨 */}
            <h1>REAL_COIN_NAME {name}!!!</h1>
            <h2>SYMBOL {infoData?.symbol}</h2>
            {/* possibly undefined가 날 수도 있으니 '?' 넣어줘야함 */}
            <h2>MAX_SUPPLY {priceData?.max_supply}</h2>
        </div>
        }

       
        <Flex style={{gap:'12px'}}>
            <Link to="price" state={{name: name}}><NewTab selected = {endParam==='price'}>PRICE</NewTab></Link>
            {/* 타입 명시는 선언 및 조건시에만 (null 및 undefined참조의 오류가 발생할 수도 있는 곳에서만) */}
            <br></br>
            <Link to="chart" state={{name: name}}><NewTab selected = {endParam==='chart'}>CHART</NewTab></Link>
            {/* state로 상위페이지에서 객체 받아온거면 outlet을 통한 하위스크린을 띄우는거라 
            하더라도다른 페이지 넘어갈 때 꼭 Link의 state를 통한 객체전달을 다시 해주어야 함.
            여러 자손 컴포넌트에 계속해서 props전달하는 거랑 마찬가지*/}
            {/* + Outlet부분만 리렌더링됨 */}
        </Flex>

        <Outlet context = {
            {coinId: coinId}   //서로다른 모든 자식컴포넌트들에게 보낼 수 있음(컴포넌트 별로 일일이 인자 전달할 필요 없이)
        }/>
    </Container>
}

export default Coin;

export const NewTab = styled.div<{selected:boolean;}>`
    width:300px;
    height:50px;
    background-color:gray;
    border-radius:25px;

    color:${props=>props.selected
    ? 'blue'
    : 'white'};


    display:flex;
    justify-content:center;
    align-items:center;
`;



/* 참조 / 피참조
// 참조 : 인자, 객체
// 피참조 : 타입, 인터페이스
// '인자 : 타입' / '객체 : 인터페이스'

// 함수인자나 조건문에서는 () / State나 스타일컴포넌트에는 <> 사용*/