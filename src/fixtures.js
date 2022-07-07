export const plansDescription = [
  {
    title: 'Free',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    btn: 'Try For Free',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
      '10 GB of storage',
      'Help center access',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
    btn: 'Get Started Now',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Help center access',
      'Priority email support',
      '10 GB of storage',
      'Help center access',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    btn: 'Get Pro Plan',
  },
]

export const toastTypes = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

export const toastTimeout = 5000

export const toastMessages = {
  register: {
    success: 'You are successfully registered',
    warningEmail: 'Check your email address',
    warningAllFields: 'All fields should be filled in and checkbox is checked',
    warningPassword: 'Passwords should be the same',
    error: 'Try again. Server error',
  },
  signIn: {
    success: 'You have successfully logged in',
    warning: 'Check your password and/or email',
    error: 'Try again. Server error',
  },
  confirmEmail: {
    success: 'You have confirmed your account. Thanks!',
    error: 'Try again. Server error',
  },
  resendConfirmation: {
    success: 'Confirmation email has been sent again',
    error: "Server error. Confirmation hasn't been resent",
  },
  resetPassword: {
    success: 'Success! Check your inbox email',
    warningEmail: 'Check your email address',
  },
  setPassword: {
    success: 'Password has been reset',
    warningPassword: 'Passwords should be the same',
    warningToken: 'Please check link in email and try again',
    error: 'Try again. Server error',
  },
  postBroker: {
    success: "Broker's data has successfully set",
    warningAllFields: 'All fields should be filled in',
    error: 'Try again. Server error',
  },
  common: {
    error: 'Server error. Try again.',
  },
}

export const titles = {
  '/login': 'Login',
  '/register': 'Register',
  '/create-account': 'Create Account',
  '/pricing': 'Pricing',
  '/setup-payment': 'Payment',
  '/select-broker': 'Brokers',
  '/forgot-password': 'Forgot Password',
  '/create-password': 'Create Password',
}
