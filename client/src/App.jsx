import { useState,useEffect } from 'react'
import { ethers } from 'ethers'
import abi from "./contract/Dappcord.json"
import './App.css'
import Channels from './components/Channels'
import Messages from './components/Messages'
import Navigation from './components/Navigation'
import Servers from './components/Servers'

function App() {
  const [state, setState] = useState({
    provider: "",
    signer: "",
    contract: "",
    address: "",
  });
  const [account, setAccount] = useState("");
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("");

  const loadBlockchainData = async () => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    const contractAddress = "0xc46DeE1aC18686DC47B6BEb000dB4497BD09BA2d";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask is not installed");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      

      setState({ provider, signer, contract, address });
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }

    
  };
  async function getAllChannels() {
    
  
    try {
      const totalChannels = await state.contract.totalChannels();
      console.log(totalChannels)
      const channels = [];
  
      for (let i = 1; i <= totalChannels; i++) {
        const channel = await state.contract.getChannel(i);
        channels.push(channel);
      }
      setChannels(channels)
  
      console.log('All channels:', channels);
      console.log(typeof(channels))
      return channels;
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  }
  useEffect(() => {
    loadBlockchainData();
    getAllChannels()
    
  },[]);

  return (
  <>
  <Navigation account={account} setAccount={setAccount}/>
  <main>
    <Servers state={state}/>
    <Channels state={state}  channels={channels} currentChannel={currentChannel} setCurrentChannel={setCurrentChannel}/>
    <Messages state={state}/>
  </main>
  
  </>);
}

export default App;
