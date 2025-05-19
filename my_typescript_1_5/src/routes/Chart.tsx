import {useOutletContext} from 'react-router-dom'
import {useQuery} from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import { isDarkAtom } from '../atoms';
import { useRecoilValue } from 'recoil';

export interface IChartContext{
    coinId:string;
}
export interface IHistorical{
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart(){
    const isDark = useRecoilValue(isDarkAtom);
    //{coinId}:IChartContext 이런 방식을 쓸 수도 있겠지만,
    //<Route>에서 직접 props로 넘겨줘야 함. 우리는 교양있게 outletcontext로 간다
    const {coinId} =useOutletContext<IChartContext>();
    const {isLoading:historyLoading, data:historyData} 
        = useQuery<IHistorical[]>(["history",coinId],()=>fetchCoinHistory(coinId));
    console.log("hitoryData",historyData);
    console.log("isDark", isDark);
    return <div>
        {historyLoading
        ?"Loading chart..."
        : <ApexCharts 
        type="line"
        series={[
            {
                name:"hello",
                data:historyData?.map(price=>Number(price.close))||[]
            },
        ]}
        options={{
            theme:{
                mode:"dark"
            },
            chart:{
                background:"transparent",
                height:800,
                width:800,
                toolbar:{
                    show:false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            stroke:{
                curve:"smooth",
                width:3
            },
            xaxis:{
                categories:
                    historyData?.map(price=>(new Date(price.time_close * 1000).toUTCString()))||[],
                type:"datetime",
                axisBorder:{
                    show:false
                },
                axisTicks:{
                    show:false
                },
                labels:{
                    show:false
                }
            },
            yaxis:{
                labels:{
                    show:false
                }
            },
            grid:{
                show:false
            },
            fill:{
                type:"gradient",
                gradient:{
                    gradientToColors:["yellow"],
                    stops:[0,100]
                }, //이거 색상조절 왜 안 되는거누 => colors속성을 fill 바깥에서 썼어야 함
            },
            colors:["red"],
            tooltip:{
                y:{
                    formatter: value=>`$ ${value.toFixed(3)}`,
                    //특정 소수자리까지 출력해주는 메소드 toFixed
                }
            }
        }}/>
        }
    </div>
}
export default Chart;