import imgGrants from '../assets/imgGrants.svg';
import imgGuilds from '../assets/imgGuilds.svg';
import imgVentures from '../assets/imgVentures.svg';
import imgImpacts from '../assets/imgImpacts.svg';
import imgProjects from '../assets/imgProjects.svg';
import imgClubs from '../assets/imgClubs.svg';

export const daoConstants = {
  abortWindow: '1',
  dilutionBound: '3',
};

export const daoPresets = [
  {
    presetName: 'Grants',
    presetSubtitle: 'Accelerators',
    presetDescription: 'Spread around the wealth and accelerate good stuff.',
    currency: 'WETH',
    approvedToken: process.env.REACT_APP_WETH_ADDRESS,
    minimumTribute: '10',
    votingPeriod: '168',
    gracePeriod: '72',
    proposalDeposit: '10000000000000000',
    processingReward: '10000000000000000',
    periodDuration: '3600',
    color: '#ea8923',
    version: '2',
    img: imgGrants,
  },
  {
    presetName: 'Ventures',
    presetSubtitle: 'Investments',
    presetDescription:
      'Invest on chain with a venture fund at your fingertips.',
    currency: 'WETH',
    approvedToken: process.env.REACT_APP_WETH_ADDRESS,
    minimumTribute: '50',
    votingPeriod: '7',
    gracePeriod: '7',
    proposalDeposit: '100000000000000000',
    processingReward: '10000000000000000',
    periodDuration: '86400',
    color: '#AB3593',
    version: '2',
    img: imgVentures,
  },
  {
    presetName: 'Guilds',
    presetSubtitle: 'Services',
    presetDescription: 'BuidL with fellow journeymen for clients and glory.',
    currency: 'DAI',
    approvedToken: process.env.REACT_APP_DAI_ADDRESS,
    minimumTribute: '100',
    votingPeriod: '60',
    gracePeriod: '24',
    proposalDeposit: '5000000000000000000',
    processingReward: '2000000000000000000',
    periodDuration: '7200',
    color: '#4FBF9F',
    version: '2',
    img: imgGuilds,
  },
  {
    presetName: 'Clubs',
    presetSubtitle: 'Social',
    presetDescription:
      'Hang with your friends and commrades to nerd out or just chill.',
    currency: 'DAI',
    approvedToken: process.env.REACT_APP_DAI_ADDRESS,
    minimumTribute: '10',
    votingPeriod: '4320',
    gracePeriod: '2880',
    proposalDeposit: '5000000000000000000',
    processingReward: '5000000000000000000',
    periodDuration: '60',
    color: '#F16061',
    version: '2',
    img: imgClubs,
  },
  {
    presetName: 'Non-profit',
    presetSubtitle: 'Impact',
    presetDescription:
      'Decentralize to do good for the world and make an impact that lasts.',
    currency: 'DAI',
    approvedToken: process.env.REACT_APP_DAI_ADDRESS,
    minimumTribute: '25',
    votingPeriod: '240',
    gracePeriod: '96',
    proposalDeposit: '5000000000000000000',
    processingReward: '0',
    periodDuration: '1800',
    color: '#129AC6',
    version: '2',
    img: imgImpacts,
  },
  {
    presetName: 'Products',
    presetSubtitle: 'Projects',
    presetDescription:
      'Raid together to get projects and products done in record time.',
    currency: 'DAI',
    approvedToken: process.env.REACT_APP_DAI_ADDRESS,
    minimumTribute: '250',
    votingPeriod: '60',
    gracePeriod: '36',
    proposalDeposit: '5000000000000000000',
    processingReward: '5000000000000000000',
    periodDuration: '7200',
    color: '#513e97',
    version: '2',
    img: imgProjects,
  },
];

export const currencyOptions = [
  {
    value: 'DAI',
    label: 'DAI',
    address: process.env.REACT_APP_DAI_ADDRESS,
  },
  {
    value: 'WETH',
    label: 'WETH',
    address: process.env.REACT_APP_WETH_ADDRESS,
  },
];
