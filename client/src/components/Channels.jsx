import React from 'react'

const Channels = ({state, channels, currentChannel, setCurrentChannel}) => {
 const {contract, address} = state
  const channelHandler=async(channel)=>{
    const hasJoined = await contract.hasJoined(channel.id, address) 
    if(hasJoined){
      setCurrentChannel(channel)
    } else{
      const tx = await contract.mint(channel.id, {value: channel.cost})
      await tx.wait()
      setCurrentChannel(channel)
    }

 }

  return (
    <div className="channels">
    <div className="channels__text">
      <h2>Text Channels</h2>
      <ul>
      {channels.map((channel, index)=>(
        <li key={index}
        onClick={()=>channelHandler(channel)}               className={currentChannel && currentChannel.id.toString() === channel.id.toString() ? "active" : ""}>
{channel.name}</li>
      ))}
      </ul>
   

    
    </div>

    <div className="channels__voice">
      <h2>Voice Channels</h2>
      <ul>
        <li>Channel 1</li>
        <li>Channel 2</li>
        <li>Channel 3</li>
      </ul>
    </div>
  </div>
  )
}

export default Channels
