import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import MolochService from './molochService';

import TokenService from './tokenService';
import { legacyGraph } from './legacyGraphService';
import { get } from './requests';
import {
  GET_MEMBERDATA_LEGACY,
  GET_MEMBERDATA,
  GET_PROPOSALS,
} from './queries';

let _web3;
if (Web3.givenProvider && Web3.givenProvider.networkVersion === '1') {
  _web3 = new Web3(Web3.givenProvider);
} else {
  _web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI),
  );
}
const web3Service = new Web3Service(_web3);

export const resolvers = (() => {
  const tokens = {};
  const molochs = {};
  return {
    Factory: {
      apiData: async (moloch, _args) => {
        let apiData = [];
        try {
          const daoRes = await get(`moloch/${moloch.moloch}`);
          apiData = daoRes.data;
        } catch (e) {
          console.log('error on dao api call', e);
        }

        if (apiData.isLegacy && apiData.graphNodeUri) {
          let legacyData = await legacyGraph(
            apiData.graphNodeUri,
            GET_MEMBERDATA_LEGACY,
          );
          apiData.legacyData = legacyData.data.data;
        }

        return apiData;
      },
      apiDataStats: async (moloch, _args) => {
        let apiData = [];
        try {
          const daoRes = await get(`moloch/${moloch.moloch}`);
          apiData = daoRes.data;
        } catch (e) {
          console.log('error on dao api call', e);
        }

        if (apiData.isLegacy && apiData.graphNodeUri) {
          let legacyData = await legacyGraph(
            apiData.graphNodeUri,
            GET_MEMBERDATA_LEGACY,
          );
          apiData.legacyData = legacyData.data.data;
        }

        return apiData;
      },
      tokenInfo: async (moloch, _args, _context) => {

        let molochService;

        if(molochs.hasOwnProperty(moloch.moloch)){
          molochService = molochs[moloch.moloch]
        }else {
          molochs[moloch.moloch]= new MolochService(moloch.moloch, web3Service);
          molochService = molochs[moloch.moloch]
        }
        const address = await molochService.approvedToken();
        const guildBankAddr = await molochService.getGuildBankAddr();
        let tokenService;
        if(tokens.hasOwnProperty(address)){
          tokenService = tokens[address]
        }else {
          tokens[address]= new TokenService(address, web3Service);
          tokenService = tokens[address]
        }
        // console.log('tokens', tokens);
        // console.log('molochs', molochs);
        
        const symbol = await tokenService.getSymbol();
        const guildBankValue = await tokenService.balanceOf(guildBankAddr);
        //console.log(guildbankValue);
        
        // console.log({
        //   guildbankValue,
        //   symbol,
        //   address,
        // });
        
        return {
          guildBankValue,
          symbol,
          address,
        };
      },
      totalShares: async (moloch, _args) => {
        let molochService;
        if(molochs.hasOwnProperty(moloch.moloch)){
          molochService = molochs[moloch.moloch]
        }else {
          molochs[moloch.moloch]= new MolochService(moloch.moloch, web3Service);
          molochService = molochs[moloch.moloch]
        }
        return await molochService.getTotalShares();
      },
      newContractMembers: async (moloch, _args, context) => {
        if (+moloch.newContract) {
          const { data } = await context.client.query({
            query: GET_MEMBERDATA,
            variables: { contractAddr: moloch.moloch },
          });

          return data.members;
        } else {
          return [];
        }
      },
      newContractProposals: async (moloch, _args, context) => {
        if (+moloch.newContract) {
          const { data } = await context.client.query({
            query: GET_PROPOSALS,
            variables: { contractAddr: moloch.moloch },
          });

          return data.proposals;
        } else {
          return [];
        }
      },
    },
    Member: {
      memberId: async (member, _args) => {
        let memberId = member.id;
        if (memberId.includes('-0x')) {
          memberId = memberId.split('-')[1];
        }
        return memberId;
      },
    },
  };
})();

