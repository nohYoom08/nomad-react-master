import {atom, selector} from 'recoil';

export const minutesState = atom({
    key:"minutes",
    default: 0,
})

export const hourSelector = selector<number>({
    //key는 이미 타입 명시, 새로운 값에 대해서만 타입 명시하면 됨(<number>)
    key:"hours",
    get:({get})=>{
        const minutes = get(minutesState);
        return minutes/60;
    },
    //외부의 atom값을 받고 본인을 바꿈
    set:({set}, newValue)=>{
        const minutes = +newValue * 60;
        console.log("newValue:",newValue);
        set(minutesState, minutes);
    }
    //1.setState함수 반환 + 
    //(외부에서 setHours(num)했을 때 num이 알아서 newValue자리에 들어감. 값을 newValue로 setState해줌)
    //2.본인이 받은 인자를 통해 외부의 atom값을 바꿈
    
    //즉, setState함수의 역할 & 외부 atom값을 바꿔주는 역할도 함('set'이라는 추가적인 함수의 역할)
})

export const toDosState = atom({
    key:"toDos",
    default:['a','b','c','d','e','f']
})