import { Outlet, Route, Routes } from 'react-router-dom'
import DashLayout from './components/DashLayout'
import NotFound from './components/error/NotFound'
import Layout from './components/Layout'

import RequireAuth from './components/RequireAuth'
import AdminDashboard from './features/admin/AdminDashboard'
import Validation from './features/validation/Validation'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import ChangePassword from './features/changePassword/ChangePassword'
import ExamResult from './features/exams/ExamResult'
import UserExam from './features/exams/UserExam'

import PaginationTestLayout from './features/test/PaginationTestLayout'
import TestPage from './features/test/TestPage'

import HomePage from './pages/HomePage'
import RequireTestId from './features/test/RequireTestId'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='validation/:id' element={<Validation />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route element={<RequireAuth allowedRoles={'member'} />}>
            <Route path='dashboard' element={<DashLayout />}>
              <Route index element={<AdminDashboard />} />

              <Route path='user-exam' element={<Outlet />}>
                <Route index element={<UserExam />} />
                <Route path='preview/:id' element={<ExamResult />} />
              </Route>

              <Route path='password' element={<ChangePassword />} />
            </Route>

            <Route path='exam' element={<RequireTestId />}>
              <Route path=':section' element={<PaginationTestLayout />}>
                <Route path=':page' element={<TestPage />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
