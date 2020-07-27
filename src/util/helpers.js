import moment from 'moment';
import web3 from 'web3';

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

export const formatCreatedAt = createdAt => {
  return moment.unix(createdAt).format('MMM Do');
};

export const formatPeriodDuration = seconds => {
  const hours = moment.duration(+seconds, 'seconds').asHours();
  if (hours > 1) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    const minutes = moment.duration(+seconds, 'seconds').asMinutes();
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
};

export const formatPeriodLength = (periods, duration) => {
  const periodSeconds = +periods * duration;
  const days = moment.duration(periodSeconds, 'seconds').asDays();

  return `${days} day${days > 1 ? 's' : ''}`;
};

export const periodsForForm = daoData => {
  const votingPeriod = moment
    .duration(+daoData.votingPeriod * +daoData.periodDuration, 'seconds')
    .asDays();

  const gracePeriod = moment
    .duration(+daoData.gracePeriod * +daoData.periodDuration, 'seconds')
    .asDays();

  return {
    votingPeriod,
    gracePeriod,
  };
};

export const periodsFromForm = (periods, periodDuration) => {
  const votingSeconds = moment
    .duration(+periods['formattedPeriods.votingPeriod'], 'days')
    .asSeconds();
  const votingPeriod = +votingSeconds / +periodDuration;

  const graceSeconds = moment
    .duration(+periods['formattedPeriods.gracePeriod'], 'days')
    .asSeconds();
  const gracePeriod = +graceSeconds / +periodDuration;

  return {
    votingPeriod,
    gracePeriod,
  };
};

export const formatDepositWei = amount => {
  return web3.utils.fromWei(amount.toString(), 'ether');
};

export const depositsForForm = daoData => {
  return {
    proposalDeposit: formatDepositWei(daoData.proposalDeposit),
    processingReward: formatDepositWei(daoData.processingReward),
  };
};

export const depositsFromForm = deposits => {
  const propDeposit = isNaN(+deposits['formattedDeposits.proposalDeposit'])
    ? '0'
    : +deposits['formattedDeposits.proposalDeposit'];

  const procReward = isNaN(+deposits['formattedDeposits.processingReward'])
    ? '0'
    : +deposits['formattedDeposits.processingReward'];

  console.log(propDeposit, procReward);
  return {
    proposalDeposit: web3.utils.toWei(propDeposit.toString(), 'ether'),
    processingReward: web3.utils.toWei(procReward.toString(), 'ether'),
  };
};

export const asciiLog = () => {
  console.log(`
  ▓█████▄  ▄▄▄       ▒█████   ██░ ██  ▄▄▄       █    ██   ██████ 
  ▒██▀ ██▌▒████▄    ▒██▒  ██▒▓██░ ██▒▒████▄     ██  ▓██▒▒██    ▒ 
  ░██   █▌▒██  ▀█▄  ▒██░  ██▒▒██▀▀██░▒██  ▀█▄  ▓██  ▒██░░ ▓██▄   
  ░▓█▄   ▌░██▄▄▄▄██ ▒██   ██░░▓█ ░██ ░██▄▄▄▄██ ▓▓█  ░██░  ▒   ██▒
  ░▒████▓  ▓█   ▓██▒░ ████▓▒░░▓█▒░██▓ ▓█   ▓██▒▒▒█████▓ ▒██████▒▒
   ▒▒▓  ▒  ▒▒   ▓▒█░░ ▒░▒░▒░  ▒ ░░▒░▒ ▒▒   ▓▒█░░▒▓▒ ▒ ▒ ▒ ▒▓▒ ▒ ░
   ░ ▒  ▒   ▒   ▒▒ ░  ░ ▒ ▒░  ▒ ░▒░ ░  ▒   ▒▒ ░░░▒░ ░ ░ ░ ░▒  ░ ░
   ░ ░  ░   ░   ▒   ░ ░ ░ ▒   ░  ░░ ░  ░   ▒    ░░░ ░ ░ ░  ░  ░  
     ░          ░  ░    ░ ░   ░  ░  ░      ░  ░   ░           ░  
   ░                                                             
   welcomes you`);
};
