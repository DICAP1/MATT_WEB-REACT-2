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
    warningAllFields: 'All fields should be filled in',
    warningPassword: 'Passwords should be the same',
    error: 'Server error',
  },
  signIn: {
    success: 'You are successfully logged in',
    warning: 'Check your password and/or email',
  },
  confirmEmail: {
    success: 'Email has been confirmed',
    error: 'Server error',
  },
  resetPassword: {
    success: 'Success! Check your inbox email',
    warningEmail: 'Check your email address',
  },
  setPassword: {
    success: 'Password has been reset',
  },
}
