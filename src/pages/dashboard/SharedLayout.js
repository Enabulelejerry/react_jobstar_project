// import { Outlet } from 'react-router-dom';
//  import { BigSideBar, Navbar, SmallSiderbar } from '../../components'

import { Outlet } from 'react-router-dom';
import { BigSideBar, Navbar, SmallSiderbar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <BigSideBar />
        <SmallSiderbar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
