import React, { useState } from 'react'
import ethereum from '../assets/ethereum.svg';
import plus from '../assets/plus.svg';
import search from '../assets/search.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ethers } from 'ethers';
const Servers = ({ state }) => {
  const { contract, address } = state;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(null)
  const [cost, setCost] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const tx = await contract.createChannel(name, tokens(cost))
    await tx.wait()
console.log(tx)
    console.log(`Created channel : ${name}`)
    setOpen(false)
    

  }
  const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
  }
  

  return (
    <div className="servers">
      <div className="server">
        <a
          href={`https://etherscan.io/address/${address}`}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img src={ethereum} alt="Ethereum Logo" />
        </a>
      </div>
      <div className="server" onClick={handleClickOpen}>
        <img src={plus} alt="Add Server" />
        <Dialog
        open={open}
         
        >
          <form onSubmit={handleSubmit}>
          <DialogTitle>Create a Channel !!</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
            
              margin="dense"
              id="name"
              name="name"
              label="Channel Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e)=>setName(e.target.value)}
            />
             <TextField
              autoFocus
              
              margin="dense"
              id="name"
              name="name"
              label="Cost to Join the Channel"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e)=>setCost(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Create</Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
      <div className="server">
        <img src={search} alt="Add Server" />
      </div>
    </div>
  );
};

export default Servers;
