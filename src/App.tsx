import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@components/shared/ScrollToTop';
import PrivateRoute from '@components/auth/PrivateRoute';
import Navbar from '@components/shared/Navbar';
import HomePage from '@pages/Home';
import TestPage from '@pages/Test';
import CardPage from '@pages/Card';
import SigninPage from '@pages/Signin';
import SignupPage from '@pages/Signup';
import ApplyPage from '@pages/Apply';
import ApplyDone from '@/pages/ApplyDone';
import { Suspense } from 'react';
import MyPage from '@/pages/My';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <Suspense fallback={<>로딩중입니다...</>}>
                <ApplyDone />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="/card/:id" Component={CardPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
