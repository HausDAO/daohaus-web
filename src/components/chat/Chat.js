import React from 'react';
import ChatRoom from 'smart-chat-react'

const Chat = props => {
  const { contract, contractAddress } = props;

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

  // The founder of the DAO will serve as the first moderator of the chat,
  // whose space need to get open first, before allow members to join the chat.
  // Here we assume the 1st member is the founder. We want a fixed account address here.
  // Please Note: a unique chat is decided by { appName, channelName, organizer } ,
  // if the organizer address changed, a new chat will be open for the DAO
  const founder = members && members.length > 0 ? members[0] : null;
  const canJoin = {
    contract, // the Moloch contract
    method: "members" // method of checking whether the current user is a member
  };

  if (!contract || !contractAddress || !founder || !members || members.length === 0) {
    return <div></div>
  } else {
    return (
      <ChatRoom
        appName="DAOHaus"
        channelName={contractAddress}
        canJoin={canJoin}
        organizer={founder}
        members={members}
        colorTheme="#0D99C4"
        popup
      />
    )
  }
}

export default Chat
