import React, { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeToast, selectToasts } from '../../slices/toastSlice'
import { toastTimeout } from '../../fixtures'

const Toasts = () => {
  const [open, setOpen] = useState(false)
  const toast = useSelector(selectToasts)?.[0]
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(removeToast())
    setOpen(false)
  }

  useEffect(() => {
    if (toast) {
      setOpen(true)
    }
  }, [toast])

  return toast && (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={toastTimeout}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={toast.type} sx={{ width: '100%' }}>
        {toast.message}
      </Alert>
    </Snackbar>
  )
}

export default Toasts
