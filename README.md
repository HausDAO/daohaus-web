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
