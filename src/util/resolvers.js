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

export const resolvers = {
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
      console.log('_args', _args);
      console.log('_context', _context);
      
      const molochService =  new MolochService(moloch.moloch, web3Service);
      const address = await molochService.approvedToken();
      const guildBankAddr = await molochService.getGuildBankAddr();
      const tokenService = new TokenService(address, web3Service);
      const symbol = await tokenService.getSymbol();
      const guildbankValue = await tokenService.balanceOf(guildBankAddr);
      
      return {
        guildbankValue,
        symbol,
        address
      };
    },
    totalShares: async (moloch, _args) => {
      const molochService = new MolochService(moloch.moloch, web3Service);
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
