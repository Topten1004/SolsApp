import * as React from 'react'

const WalletContext = React.createContext()

export const WalletProvider = ({ children, value }) => {
  return (
    <WalletContext.Provider value={ value }>
      { children }
    </WalletContext.Provider>
  )
}

export const useWalletInfo = () => {
    return React.useContext(WalletContext) ;
}
