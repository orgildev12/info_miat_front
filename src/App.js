// import logo from './logo.svg';
import { LoadingContextProvider, LoadingSpin, FibaMsgContextProvider, FibaMessageBox } from './components'
import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import CoreRoutes from './routes/CoreRoutes'
import './index.css'

function App() {
  return (
    <LoadingContextProvider>
      <FibaMsgContextProvider>
        <AuthProvider>
          <CoreRoutes />
          <LoadingSpin />
          <FibaMessageBox />
        </AuthProvider>
      </FibaMsgContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
