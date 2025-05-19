import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {Flex} from '../screens/Root';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export interface IForm{
    'Email':string,
    'First Name':string,
    'Last Name':string,
    'Password':string,
    'Password Check':string,
    'extraError'?:string,

    'toDo':string
    //새로 toDo를 추가했다는건 formState에서 toDo를 추가했다는 것
}

// type categories = "TO_DO" | "DOING" | "DONE";
// //type 자료형도 있음

export enum Categories{
    "TO_DO",
    "DOING",
    "DONE",
    // "TO_DO" = "TO_DO"
    // 이렇게 하면 그냥 Categories.TO_DO의 값이 "TO_DO"가 되어버림
}//숫자의 문자화 (위에서부터 차례대로 0,1,2,3..), 일종의 define

export const categoryState = atom<Categories>({
    //세 가지 값중 하나를 가질 것이라는 타입선언
    key:"category",
    // default:"TO_DO"
    default:Categories.TO_DO
})

export const toDoState=atom<IToDo[]>({
    key:"toDo",
    default:[],
})

export interface IToDo{
    id:number;
    text:string;
    category:Categories;
}

export const toDoSelector = selector({
    key:"toDoSelector",
    get:({get})=>{
        //options라는 인자
        const toDos = get(toDoState);
        const category=get(categoryState);

        // if(category==="TO_DO") return toDos.filter((toDo)=>toDo.category==="TO_DO");
        // else if(category==="DOING") return toDos.filter((toDo)=>toDo.category==="DOING");
        // else if(category==="DONE") return toDos.filter((toDo)=>toDo.category==="DONE");

        //const selectorOutput = useRecoilValue(toDoSelector);
        //를 통해서 반환된 배열을 받는다

        return toDos.filter((toDo)=>toDo.category===category);
        //각자 카테고리에 맞게 필터링하면 개별 케이스 조사할 필요 없음
    }
})