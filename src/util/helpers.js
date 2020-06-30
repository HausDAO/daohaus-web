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
    case 'rage': {
      return 'Nice Rage Quit!';
    }
    default: {
      return null;
    }
  }
};

export const titleMaker = proposal => {
  const details = proposal.details.split('~');

  if (details[0] === 'id') {
    return details[3];
  } else if (details[0][0] === '{') {
    let parsedDetails;

    try {
      parsedDetails = JSON.parse(proposal.details);
      return parsedDetails.title;
    } catch {
      if (proposal.details && proposal.details.indexOf('link:') > -1) {
        const fixedDetail = proposal.details.replace('link:', '"link":');
        const fixedParsed = JSON.parse(fixedDetail);
        return fixedParsed.title;
      } else {
        console.log(`Couldn't parse JSON from metadata`);
        return `Proposal ${proposal.proposalIndex}`;
      }
    }
  } else {
    return proposal.details
      ? proposal.details
      : `Proposal ${proposal.proposalIndex}`;
  }
};

export const descriptionMaker = proposal => {
  try {
    const parsed = JSON.parse(proposal.details);
    return parsed.description;
  } catch (e) {
    if (proposal.details && proposal.details.indexOf('link:') > -1) {
      const fixedDetail = proposal.details.replace('link:', '"link":');
      const fixedParsed = JSON.parse(fixedDetail);
      return fixedParsed.details;
    } else {
      console.log(`Couldn't parse JSON from metadata`);
    }
  }
  return ``;
};
