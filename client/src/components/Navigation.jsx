import { ethers } from 'ethers'
import React from 'react'

const Navigation = ({account, setAccount}) => {
    const connectWallet=async()=>{
       
          
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const account = ethers.getAddress(accounts[0])
        setAccount(account)

        if (accounts.length === 0) {
          console.log("No account found");
          return;
        }

    }
  return (
    <div>
        <nav>
      <div className='nav__brand'>
        <h1>Dappcord</h1>
      </div>

      {account ? (
        <button
          type="button"
          className='nav__connect'
        >
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectWallet}
        >
          Connect
        </button>
      )}
    </nav>
      
    </div>
  )
}

export default Navigation
