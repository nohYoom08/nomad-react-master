import { useSetRecoilState } from "recoil";
import { Categories, IToDo,toDoState } from "./atoms";



function ToDo({id, text, category}:IToDo){
    const setToDos = useSetRecoilState(toDoState);
    // const onClick = (newCategory:IToDo["category"]) => {
    //    console.log( "i wanna to ", newCategory);
    // }
    
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const{
            currentTarget:{name}
        } = event;
        // event객체의 디스트럭쳐링

        const newToDo={text,id,category:name as any}
        //객체 리터럴 문법_속성 단축 : 중괄호에 변수만 끼워넣으면
        //text:text(값), id:id(값)의 형식의 객체로 만들어짐

        setToDos((prev)=>{
            const targetIndex = prev.findIndex(toDo=>toDo.id===id);
            //as any 활용법

            console.log(targetIndex);
            return [...prev.slice(0,targetIndex),
            newToDo,
            ...prev.slice(targetIndex+1)]
            //특정 원소만 수정하는 방법
            //배열 또는 객체일 때 '...'활용. newToDo는 반환될 배열의 '원소'여서 '...'이 안 붙은 것
        })

        console.log(name);
    }
    return (
    <li>
        <span>{text}</span>
        {/* {category === "DOING" && <button onClick={()=>{}}>To Do</button>}
        {category === "TO_DO" && <button onClick={()=>{}}>Doing</button>}
        {category === "DONE" && <button onClick={()=>{}}>Done</button>}
        방법 1*/}

        {category !== Categories.TO_DO && <button name="TO_DO" onClick={onClick}>To Do</button>}
        {category !== Categories.DOING && <button name="DOING" onClick={onClick}>Doing</button>}
        {category !== Categories.DONE && <button name ="DONE" onClick={onClick}>Done</button>}
    </li>
    )
    }
export default ToDo;