import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import router from './Router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();
//리액트쿼리 기본설정

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* //Recoil 기본 설정 */}
      <QueryClientProvider client={queryClient}>
        {/* theme속성 필수로 작성 */}
        {/* <App /> */ /*라우팅 자체에선 얘 필요없음*/}
        <RouterProvider router={router}></RouterProvider> {/*router함수 반환 값 쓰이는 곳 */}

      </QueryClientProvider> 
    </RecoilRoot>

  </React.StrictMode>
);