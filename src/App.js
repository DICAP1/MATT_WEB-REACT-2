import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import SignIn from './components/SigninScreen/SignIn';
import PreSignUp from './components/PreSignUpScreen/PreSignUp';
import SignUp from './components/SignUpScreen/SignUpScreen';
import VerifyPhoneNumber from './components/VerifyPhoneNumberScreen/VerifyPhoneNumber';
import ForgotPassword from './components/ForgotPasswordScreen/ForgotPassword';
import CreateNewPassword from './components/CreateNewPasswordScreen/CreateNewPassword';
import Pricing from './components/PricingScreen/Pricing';
import SetupPayment from './components/SetupPaymentScreen/SetupPayment';
import SelectBroker from './components/SelectBrokerScreen/SelectBroker';
import ForgotPasswordVerifyOTP from './components/ForgotPasswordVerifyOTPScreen/ForgotPasswordVerifyOTP';
import {RequireAuth} from './components/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<PreSignUp/>}/>
        <Route path="/create-account" element={<SignUp/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/pricing" element={
          <RequireAuth redirectTo="/login">
            <Pricing/>
          </RequireAuth>}/>
        {/*<Route path="/verifyEmailOTP" element={<VerifyEmailOTP />} />*/}
        {/*<Route path="/verifyPhoneOTP" element={<VerifyPhoneOTP />} />*/}
        <Route path="/forgotPasswordVerifyOTP" element={<ForgotPasswordVerifyOTP/>}/>
        <Route path="/verifyPhoneNumber" element={<VerifyPhoneNumber/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/createNewPassword" element={<CreateNewPassword/>}/>
        <Route path="/setupPayment" element={<SetupPayment/>}/>
        <Route path="/selectBroker" element={<SelectBroker/>}/>
        <Route path="*" element={<Navigate to="/login" replace/>}/> // todo change to '/'
      </Routes>
    </div>
  )
    ;
}

export default App;
