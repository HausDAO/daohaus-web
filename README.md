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

### Contributions

1. Clone or Fork this repo

2. Create your branch

   You will either pull of of the base branch: `develop` or a release branch if working on feature for a bundled release `RELEASE_<release name>`.

   Branch naming:

   `feature/<feature-name>`

   `fix/<bug name>`

   `chore/<chore name>`

3. Do your work and create the PR.

   Please fetch the base or relase branch you pulled off of and ensure the latest work is merged into your branch before creating the PR.

   PR template is TBD, so just be as descriptive as you can.

### Deployments

1. Deploy to staging

   PR from `develop` or the release branch, `RELEASE_<release name>` into `staging`. CD will deploy to

   `staging.daohaus.club` (kovan)

2. Deploy to production

   PR from `staging` into `production`. CD will deploy to

   `daohaus.club` (mainnet)
   `kovan.daohaus.club` (kovan)
   `rinkeby.daohaus.club` (rinkeby)
   `xdai.daohaus.club` (xdai)

   **Note that our CI/CD will fail if there are eslint code warnings.**

### Environement variables

#### Factory contract addresses

mainnet:

0x2840d12d926cc686217bb42B80b662C7D72ee787

kovan:

0x0C60Cd59f42093c7489BA68BAA4d7A01f2468153

#### Subgraph urls

mainnet:

https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus

https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats

kovan:

https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-kovan

https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-kovan-stats

<table border="0"><tr>  <td><a href="https://gittron.me/bots/0x8f36df85f8e0bf32f2ffd20979d139cc"><img src="https://s3.amazonaws.com/od-flat-svg/0x8f36df85f8e0bf32f2ffd20979d139cc.png" alt="gittron" width="50"/></a></td><td><a href="https://gittron.me/bots/0x8f36df85f8e0bf32f2ffd20979d139cc">HELLO GITTRON</a></td></tr></table>
 

### License

DAOhaus is an easy user interface for decentralized autonomous organizations built on the Moloch DAO framework smart contracts <https://github.com/MolochVentures/moloch>. 

Copyright (C) 2021 DAOhaus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.txt>.
