export const truncateAddr = addr => {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
};
export const successMessagesText = messageType => {
  switch (messageType) {
    case 'pledge': {
      return "Success! You've pledged!";
    }
    case 'delegate': {
      return "You've set up your delegate";
    }
    default: {
      return null;
    }
  }
};
