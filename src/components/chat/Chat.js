import React from 'react';
import ChatRoom from 'smart-chat-react'

const Chat = props => {
  // The summoner of the DAO will serve as the first moderator of the chat,
  // whose space need to get open first, before allow members to join the chat.
  // Please Note: a unique chat is decided by { appName, channelName, organizer } ,
  // if the organizer address changed, a new chat will be open for the DAO
  const { contract, contractAddress, summoner} = props;

  // Get the Ethereum addresses of the members; we can include applicants if needed
  const getMemberAddresses = (data, group) => {
    if (data) {
      if (group) {
        data = data[group];
      }
      if (data && data.length > 0) {
        return data.map(m => m.memberAddress);
      }
    }
    return [];
  }
  const members = props.memberData ? getMemberAddresses(props.memberData, 'active') : getMemberAddresses(props.members);

  const canJoin = {
    contract, // the Moloch contract
    method: "members" // method of checking whether the current user is a member
  };

  if (!contract || !contractAddress || !summoner || !members || members.length === 0) {
    return <div></div>
  } else {
    return (
      <ChatRoom
        appName="DAOHaus"
        channelName={contractAddress}
        canJoin={canJoin}
        organizer={summoner}
        members={members}
        colorTheme="#0D99C4"
        popup
      />
    )
  }
}

export default Chat
