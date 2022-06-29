import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './components/SigninScreen/SignIn'
import PreSignUp from './components/PreSignUpScreen/PreSignUp'
import SignUp from './components/SignUpScreen/SignUpScreen'
import ForgotPassword from './components/ForgotPasswordScreen/ForgotPassword'
import CreateNewPassword from './components/CreateNewPasswordScreen/CreateNewPassword'
import Pricing from './components/PricingScreen/Pricing'
import SetupPayment from './components/SetupPaymentScreen/SetupPayment'
import SelectBroker from './components/SelectBrokerScreen/SelectBroker'
import { RequireAuth } from './components/RequireAuth/RequireAuth'
import Main from './components/Main/Main'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Main />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<PreSignUp />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        
        <Route
          path="/pricing"
          element={
            // <RequireAuth redirectTo="/login">
            <Pricing />
            // </RequireAuth>
          }
        />
        <Route
          path="/setup-payment"
          element={
            // <RequireAuth redirectTo="/login">
            <SetupPayment />
            /* </RequireAuth> */
          }
        />
        <Route
          path="/select-broker"
          element={
            // <RequireAuth redirectTo="/login">
            <SelectBroker />
            // </RequireAuth>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-password" element={<CreateNewPassword />} />
        {/* <Route path="/verifyEmailOTP" element={<VerifyEmailOTP />} /> */}
        {/* <Route path="/verifyPhoneOTP" element={<VerifyPhoneOTP />} /> */}
        {/* <Route path="/forgotPasswordVerifyOTP" element={<ForgotPasswordVerifyOTP/>}/> */}
        {/* <Route path="/verifyPhoneNumber" element={<VerifyPhoneNumber/>}/> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
