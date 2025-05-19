import {users} from "../db"
import {Link, useSearchParams} from 'react-router-dom'

function Home (){
    const [readSearchParams, setSearchParams] = useSearchParams();
    //params에 대한 정보를 다루는 useSearchParams()

    console.log(readSearchParams,setSearchParams);
    console.log(readSearchParams.has("geo"),readSearchParams.get("geo"));
    //has => 해당 파라미터를 가지고 있는지 true/false
    //get => 해당 파라미터의 값을 가지고 옴

    // setTimeout(()=>{
    //     setSearchParams({
    //         day:'today',
    //         tomorrow:'123'
    //     })
    // },3000);

    //시간 간격을 두고 실행하는 렌더링 set함수 setTimeout
    //사이트의 쿼리파라미터를 설정하는 setSerachParams

    return <div>
        <h1>Users</h1>
        <ul>
            {users.map((user)=>
            <li key={user.id}>
                <Link to={`/user/${user.id}`}>
                {user.name}
                </Link>
            </li>)}
        </ul>
         
    </div>
}
export default Home ;