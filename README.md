# daohaus-web

Web app for exploring and summoning moloch daos.

## Development

1. Install dependencies

```bash
$ yarn install
```

2. Create an env file and fill out the appropriate varialbles for the network you are using. There are currently factory contracts and subgraphs on mainnet, kovan and rinkeby.

```bash
$ cp .env.sample .env.local
```

3. Run a dev server

```bash
$ yarn start
```

### Factory contract addresses

mainnet: 0x2840d12d926cc686217bb42B80b662C7D72ee787
kovan: 0x0C60Cd59f42093c7489BA68BAA4d7A01f2468153
rinkeby: 0x610247467d0dfA8B477ad7Dd1644e86CB2a79F8F

### Subgraph urls

mainnet: https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus
kovan: https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-kovan
rinkeby: https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby

<table border="0"><tr>  <td><a href="https://gittron.me/bots/0x8f36df85f8e0bf32f2ffd20979d139cc"><img src="https://s3.amazonaws.com/od-flat-svg/0x8f36df85f8e0bf32f2ffd20979d139cc.png" alt="gittron" width="50"/></a></td><td><a href="https://gittron.me/bots/0x8f36df85f8e0bf32f2ffd20979d139cc">SUPPORT US WITH GITTRON</a></td></tr></table>
