import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import MolochService from './molochService';
import WethService from './wethService';
import DaiService from './daiService';
import { legacyGraph } from './legacyGraphService';
import { get } from './requests';
import { GET_MEMBERDATA_LEGACY, GET_MEMBERDATA } from './queries';

let _web3;
if (Web3.givenProvider) {
  _web3 = new Web3(Web3.givenProvider);
} else {
  _web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI),
  );
}
const web3Service = new Web3Service(_web3);
const weth = new WethService(web3Service);
const dai = new DaiService(web3Service);

export const resolvers = {
  Factory: {
    guildBankValue: async (moloch, _args) => {
      const molochService = new MolochService(moloch.moloch, web3Service);
      const guildBankAddr = await molochService.getGuildBankAddr();
      const token = await molochService.approvedToken();
      if (token === 'Dai') {
        return await dai.balanceOf(guildBankAddr);
      } else {
        return await weth.balanceOf(guildBankAddr);
      }
    },
    apiData: async (moloch, _args) => {
      const daoRes = await get(`moloch/${moloch.moloch}`);
      const apiData = daoRes.data;

      if (apiData.isLegacy && apiData.graphNodeUri) {
        let legacyData = await legacyGraph(
          apiData.graphNodeUri,
          GET_MEMBERDATA_LEGACY,
        );
        apiData.legacyData = legacyData.data.data;
      }

      return apiData;
    },
    approvedToken: async (moloch, _args) => {
      const molochService = new MolochService(moloch.moloch, web3Service);
      return await molochService.approvedToken();
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
