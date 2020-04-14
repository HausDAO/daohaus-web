import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import MolochService from './molochService';

import TokenService from './tokenService';
import { get } from './requests';

let _web3;
if (
  Web3.givenProvider &&
  Web3.givenProvider.networkVersion === process.env.REACT_APP_NETWORK_ID
) {
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
    Moloch: {
      apiData: async (moloch, _args) => {
        let apiData = [];
        try {
          const daoRes = await get(`moloch/${moloch.id}`);
          apiData = daoRes.data;
        } catch (e) {
          console.log('error on dao api call', e);
        }

        return apiData;
      },
      tokenInfo: async (moloch, _args, _context) => {
        let molochService;

        if (moloch.version === '1') {
          if (molochs.hasOwnProperty(moloch.id)) {
            molochService = molochs[moloch.id];
          } else {
            molochs[moloch.id] = new MolochService(moloch.id, web3Service);
            molochService = molochs[moloch.id];
          }
          const address = await molochService.approvedToken();
          const guildBankAddr = await molochService.getGuildBankAddr();
          let tokenService;
          if (tokens.hasOwnProperty(address)) {
            tokenService = tokens[address];
          } else {
            tokens[address] = new TokenService(address, web3Service);
            tokenService = tokens[address];
          }
          let symbol;
          let guildBankValue;

          try {
            const daoRes = await get(`moloch/${moloch.id}`);
            if (daoRes.data.hide) {
              throw new Error({ err: 'token error' });
            }
            symbol = await tokenService.getSymbol();
            guildBankValue = await tokenService.balanceOf(guildBankAddr);
          } catch (err) {
            // console.log('symbol or guildbank error', err);
            symbol = 'ERR';
            guildBankValue = '0';
          }

          return {
            guildBankAddr,
            guildBankValue,
            symbol,
            address,
          };
        } else {
          return {};
        }
      },
    },
  };
})();
