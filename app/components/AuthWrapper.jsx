'use client'

import { AuthProvider } from "../actions/authContext"

const AuthWrapper = ({children}) => {
  return (
    
      <AuthProvider>
        {children}
      </AuthProvider>
    
  )
}

export default AuthWrapper
