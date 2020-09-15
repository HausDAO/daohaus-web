import React from 'react';

import './Help.scss';
import { Link } from 'react-router-dom';

import xDAIComparisonChart from '../../assets/xDAIcomparisonChart.png';

const Help = () => (
  <div className="Page">
    <div className="View">
      <div className="Help">
        <div className="Index">
          <h2>Index</h2>
          <ul>
            <li>
              <a href="#Support">Support</a>
            </li>
            <li>
              <a href="#WTF-Moloch">WTF is a Moloch</a>
            </li>
            <li>
              <a href="#Summon">Summon a Dao</a>
            </li>
            <li>
              <a href="#Interact">Interacting with DAOs</a>
            </li>
            <li>
              <a href="#Other">Other helpful things</a>
            </li>
            <li>
              <a href="#Glossary">DAO Glossary</a>
            </li>
          </ul>
        </div>
        <div className="Sections">
          <div className="Section" id="Support">
            <h2>Support</h2>
            <p>
              Feel free to hit us up in our{' '}
              <a
                href="https://discord.gg/NPEJysW"
                rel="noopener noreferrer"
                target="_blank"
              >
                #Support Channel on Discord
              </a>
              . Let us know about any bugs or feature requests. Or just ask us
              anything about daos. We can also introduce you to the DAO creation
              experts at{' '}
              <a
                href="https://daoshop.raidguild.org/"
                rel="noopener noreferrer"
                target="_blank"
              >
                DAOshop
              </a>{' '}
              if you want a bespoke experience.
            </p>
          </div>
          <div className="Intro Section" id="WTF-Moloch">
            <h2>WTF is a Moloch?</h2>
            <p>
              For a brief introduction to daos and Molochs specifically, you can
              catch up via the{' '}
              <a
                href="https://medium.com/raid-guild/moloch-evolved-v2-primer-25c9cdeab455"
                rel="noopener noreferrer"
                target="_blank"
              >
                Moloch V2 Primer for Humans
              </a>{' '}
              on Medium.
            </p>

            <p>
              But basically, a DAO is a magic internet community that allows
              members to raise and coordinate funds and resources. A Moloch (in
              addition to being a Canaanite god) is the simple, open-source DAO
              framework we use at DAOhaus. Its simplicity is important for 3
              reasons: security (less code, less bugs), usability (complex tech
              but easiest to understand and use), and extensibility (the ability
              to extend its functionality to meet evolving community needs).
            </p>
            <p>
              Currently, Moloch is on version 2.0. Version 1.0 of Moloch was
              built specifically for grant giving communities. Moloch v.2 is a
              more flexible framework that allows communities to hold multiple
              tokens, make investments, give grants, trade tokens, and more. To
              learn more about the changes in Moloch from v.1 to v.2 check out
              the{' '}
              <a
                href="https://github.com/MolochVentures/moloch"
                rel="noopener noreferrer"
                target="_blank"
              >
                changelog
              </a>
              .
            </p>
          </div>
          <div className="Section" id="Summon">
            <h2>Summon a Dao</h2>
            <p>
              Summoning a DAO is pretty easy. And by easy we mean the three step
              webform found here. Most users should stick to this simple form,
              but we do have some ways to get fancier with your DAO.
            </p>
            <h3>The 1...2...3’s of DAO summoning </h3>

            <h4>Step 1: DAO Type...</h4>
            <p>
              The first step is to choose the type of DAO you want to form.
              We’ve created a selection of the most common types of DAOs. Each
              type of DAO comes with some presets for the type of currency the
              DAO should use along with standard voting and grace periods that
              we think make sense for that particular type of DAO (don’t worry
              you can change these).{' '}
            </p>

            <p>The standard types of DAOs are: </p>
            <ul>
              <li>
                Grants - collect funds and give them out to deserving recipients
              </li>
              <li>
                Ventures - raise a pool of funds from members and then make
                investments in DAI or ETH in exchange for a project's tokens.{' '}
              </li>
              <li>
                Guilds - band together with other professionals to coordinate on
                projects and share the bounties from clients.
              </li>
              <li>
                Clubs - plan and pay for activities with old friends and new
                friends.
              </li>
              <li>Nonprofits - raise money from donors to support a cause.</li>
              <li>Products - gather resources to build a new product.</li>
            </ul>

            <h4>Step 2: Give the DAO Some Character...</h4>
            <p>
              Choose a name for the DAO and describe (briefly) it’s mission,
              purpose, manifesto, whatever. If this is the hardest part of
              summoning, you’re definitely doing something right.
            </p>

            <h4>Step 3: Check yourself...</h4>
            <p>
              Check the presets (and that the DAO name and description) are all
              good. We’ll get into what each of the presets means in more detail
              below. If one of the presets doesn’t make sense for your community
              you can change them just by editing the colored text.
            </p>
            <p>
              When you’re ready. Hit the “summon button” which will start the
              process of creating your DAO. You’ll likely see MetaMask or
              another wallet provider pop up to ask for you to approve the
              transaction and pay the gas fees to create your new DAO. If you’re
              an Ethereum n00b, this is a totally normal part of the process.
            </p>

            <h4>Step 3 ½: Boost your DAO and deploy your DAO interface...</h4>
            <p>
              While DAOhaus is building your DAO, you can check out some of the
              boosts packages you can buy to make your DAO more awesome. We’ll
              talk more about boosts later (and you can always buy boosts
              post-summoning).
            </p>
            <p>
              As soon as your DAO is built, you’ll need to deploy a DAO
              interface. This will be the front-end site for interacting with
              your new DAO smart contracts. This will require authorizing
              another transaction via your Web3 wallet (it’ll be a lot cheaper
              this time).
            </p>
            <p>
              That’s it. Now comes the hard part...building a successful magical
              internet community.
            </p>

            <h3>Hard Mode</h3>
            <p>
              We’ve built in a Hard Mode for those DAO experts out there who
              know exactly what they want. Via Hard Mode you can additionally
              toggle between Moloch v1 and v2, pick a non-standard ERC-20 as
              your deposit token, and set your own period duration.
            </p>
            <p>
              If you really want to get into the weeds and need some help
              designing and picking the right form for your DAO, the experts at
              <a
                href="https://daoshop.raidguild.org/"
                rel="noopener noreferrer"
                target="_blank"
              >
                DAOshop
              </a>{' '}
              are also here to help. A consultation starts at 200 $DAI, but for
              DAOs planning on legal wrappers or large token holdings, that can
              be a bargain.
            </p>
          </div>
          <div className="Section" id="Interact">
            <h2>Interacting with DAOs</h2>
            <h4>Where to start</h4>
            <p>
              We hope that you’ll end up a member of many DAOs. So rather than
              bookmarking a million DAO sites, we’ve built an awesome profile
              page where you can see all of the DAOs you’ve joined. You can also
              check any open votes, etc. on this page to make sure you don’t
              miss anything important.
            </p>
            <p>
              In the future this is also where you can see how many boosts and
              $HAUS you’ve got.
            </p>

            <h4>Finding the Right DAO</h4>
            <p>
              If you’re new to the DAO space you can search for and see all of
              the DAOs created on DAOhaus on the{' '}
              <Link to="/explore">Explore page</Link>. Feel free to sort by
              membership size, DAO type, or other factors.
            </p>

            <h4>Joining a DAO</h4>
            <p>
              Joining a DAO means joining a new magical internet community. Some
              DAOs are pretty choosy about who they let in, while others are
              open to anyone willing to contribute work or pay some DAI / wETH.
            </p>
            <p>
              The first step to joining a DAO is usually to create a membership
              proposal where you’ll pledge some amount of “tribute” in exchange
              for a certain number of shares.
            </p>
            <p>
              To create a proposal, visit the DAO’s pokemol and follow these
              steps:
            </p>
            <ol>
              <li>Click the “proposals” button at the bottom.</li>
              <li>
                Then click the big “new proposal” button on the proposal page.
              </li>
              <li>Choose the “member” proposal type.</li>
              <li>
                Enter a proposal name (probably “your name” + membership
                proposal), how many shares you want, how much tribute you’re
                giving, a short description of “why you” and a link to any
                supporting info.
              </li>
            </ol>
            <p>
              Before you become a full-fledged member, a current member of the
              DAO will have to sponsor your proposal, then the members will need
              to vote you in, and, finally, someone will need to process your
              proposal.
            </p>
            <p>
              *Note* you’ll also have to approve the DAO to spend your DAI /
              wETH / other token before your membership proposal can be
              processed.
            </p>
            <p>
              As a reminder, tribute means the DAI, wETH, or other token that
              the DAO requires to be deposited into the DAO for a new member to
              join. A DAO will often list the minimum amount of tribute to be
              requested and how many DAO shares that translates into.
            </p>

            <h4>Creating a proposal</h4>
            <p>
              Creating a proposal in a DAO is also pretty easy and open to
              anyone (DAO members and non-members alike).
            </p>
            <p>
              To create a proposal go to your DAO’s pokemol and follow these few
              steps:
            </p>
            <ol>
              <li>Click the “proposals” button at the bottom.</li>
              <li>
                Then click the big “new proposal” button on the proposal page.
              </li>
              <li>Choose the type of proposal you want to submit.</li>
              <li>
                Fill in the following information (differs some depending on
                proposal type):
              </li>
              <ul>
                <li>Proposal name (just like it sounds)</li>
                <li>
                  Link to more info (link to a google doc or anything w/ more
                  info)
                </li>
                <li>
                  Applicant address (your wallet address or whoever’s getting
                  the shares, loot, or funds)
                </li>
                <li>Tribute offered (money you’re putting in)</li>
                <li>Payment requested (money you want out)</li>
                <li>Shares requested (voting shares you want)</li>
                <li>Loot requested (economic only shares you want)</li>
              </ul>
              <li>Submit your proposal.</li>
            </ol>

            <p>
              For special types of proposals like a Whitelist proposal or a
              Guildkick proposal you’ll submit a slightly different set of
              information.
            </p>

            <p>Whitelist proposals need the following info: </p>
            <ul>
              <li>Token ticker (e.g. TKN)</li>
              <li>Description</li>
              <li>Token address</li>
            </ul>

            <p>GuildKick proposals need the following info: </p>
            <ul>
              <li>Address of member you want to permanently remove</li>
            </ul>

            <h4>Life of a proposal (and a bit on voting)</h4>
            <p>
              After someone creates a proposal, it will need to go through the
              following steps before the life of the proposal is complete:
            </p>

            <ol>
              <li>Someone submits the proposal using the steps above. </li>
              <li>
                After one DAO period a member of the DAO can sponsor the
                proposal (and make a proposal deposit). A proposal must be
                sponsored before it goes to a vote.
              </li>
              <li>
                One period after the proposal is sponsored, the members vote on
                the proposal during the voting period.
              </li>
              <li>
                There’s a grace period after the voting proposal during which
                anyone who voted “no” on the proposal (or didn’t vote at all)
                can rage quit.
              </li>
              <li>
                The proposal is ready to be processed, which is a step
                regardless of whether the proposal passed or failed, since this
                step will give the sponsor back a portion of the deposit and the
                processor her or his own little reward.{' '}
              </li>
            </ol>

            <p>
              If the proposal passed, then the applicant will be able to
              withdraw the funds granted to them. If the proposal fails any
              tribute offered will be returned to the applicant.
            </p>

            <p>
              One big thing to note re: Moloch DAOs is that votes can pass with
              a single “yes” vote if there aren’t any no votes. Moloch’s don’t
              care about quorums, just that the number of “yes” votes &gt;
              “number of “no” votes at the end of the voting period. If no one
              votes or the vote ties, it will auto-fail. The proposal will also
              fail if more than ~30% of the DAO rage quits during the proposal’s
              grace period.
            </p>
          </div>

          <div className="Section" id="Other">
            <h2>wETH</h2>
            <p>
              You might have noticed this currency called wETH. If you’re not
              familiar with wETH, it’s just wrapped ETH (i.e. ETH that’s been
              magically turned into an ERC-20 token). Since Moloch’s can only
              accept ERC-20 tokens at the moment (and ETH doesn’t make the cut),
              wETH is the closest a DAO can get.
            </p>

            <p>
              The best place to get some wETH is{' '}
              <a
                href="https://wrapeth.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://wrapeth.com/
              </a>
              .
            </p>

            <h2>Boosts</h2>
            <p>
              Boost are how you can level-up your DAO. Boosts are like magical
              mana that you can buy and then give to a DAO. The DAO can then use
              those boosts to buy upgrades for itself, such as a custom
              front-end, telegram tie-ins, etc. A lot of these upgrades require
              a monthly payment of boosts to keep going, so don’t skimp.
            </p>
            <p>
              To make it simple, we’ve bundled boosts / upgrades into some cool
              starter packs for people to buy.
            </p>
          </div>
          <div className="Section" id="Glossary">
            <h2>DAO Glossary</h2>
            <p>
              Each Moloch DAO uses several standard parameters or inputs to
              manage how the DAO operates and decides to accept and use funds.
              There are also some terms that are helpful to learn.
            </p>

            <h4>
              Each Moloch DAO uses several standard parameters or inputs to
              manage how the DAO operates and decides to accept and use funds.
              There are also some terms that are helpful to learn.
            </h4>
            <p>
              Select a currency, or “deposit token” to serve as the main
              currency for your DAO. This will likely be the currency members
              contribute when joining and people will receive when the DAO
              decides to spend money. Currently wETH and DAI are available
              through the DAO pre-sets. DAI makes sense for DAOs that need a
              stable store of value, while wETH makes more sense for DAOs that
              can benefit from the appreciation in ETH prices.{' '}
            </p>
            <p>
              In Moloch v2 the DAO members can vote to accept additional types
              of ERC-20 tokens and the DAO can hold up to 100 different ERC-20
              tokens at any one time.{' '}
            </p>

            <h4>Delegate Key</h4>
            <p>
              This allows you to assign your voting shares to another ethereum
              address. This doesn’t mean delegated voting (if you’re thinking
              liquid democracy), but just allows a user to use one wallet
              address for voting and another for economic rights.{' '}
            </p>

            <h4>Grace Period </h4>
            <p>
              The grace period is the period of time after the voting ends, but
              before the proposal can be processed (and the applicant can get
              their funds). This is important when it comes to rage quitting,
              which is described below. Again, Venture DAOs and Grant DAOs
              typically want longer grace periods, while a Club might be cool
              with a short grace period.{' '}
            </p>

            <h4>Loot</h4>
            <p>
              Loot is essentially a non-voting, economic share of the DAOs
              tokens. If you just have loot, you won’t be able to vote on
              proposals, but you can withdraw that loot into your own wallet.{' '}
            </p>

            <h4>Period Duration</h4>
            <p>
              This is the base period that the DAO uses to tell internal time.
              The default is to use a 1 hour period, but via Hard Mode you can
              choose anything between 1 second and 10^18 seconds (not
              recommended for mortals).
            </p>

            <h4>Pokemol</h4>
            <p>
              Pokemol is short for “pocket moloch.” This is basically the
              front-end for your specific DAO. While DAOhaus can connect you to
              tons of different DAOs, a pokemol represents the site where the
              real DAO action happens.
            </p>

            <h4>Proposals</h4>
            <p>
              Proposals are basically what they sound like. These are proposed
              decisions for the DAO to make. The standard types of proposals
              are:
            </p>
            <ul>
              <li>
                Membership Proposals - a new applicant proposes submitting a
                certain amount of tribute in exchange for a certain number of
                shares and/or loot.{' '}
              </li>
              <li>
                Spending Proposals - a proposal to send some of the DAO tokens
                to an applicant.
              </li>
              <li>
                Whitelist Proposals - a proposal to add a new token to the DAO’s
                approved tokens list. Molochs do have a limit on the number of
                tokens you can have in the DAO, so don’t get token crazy.
              </li>
              <li>
                GuildKick Proposals - a proposal to kick out a member of the
                DAO. *Warning* once a member is kicked out they can’t be added
                as a member ever again.
              </li>
            </ul>

            <h4>Process Proposals</h4>
            <p>
              After a DAO proposal is voted on by the members, a member will
              need to process the proposal. The DAO might give a reward to the
              processor to reimburse them for their trouble (this comes out of
              the deposit made by the sponsor). After a proposal has been
              processed the applicant will get their tribute back (if the
              proposal failed) or be able to access the shares or withdraw the
              tokens granted to them (if a proposal passed).
            </p>

            <h4>Rage Quit</h4>
            <p>
              This is part of the magic of Moloch. Rage Quit allows a member or
              loot holder of the DAO to leave the DAO with all or part of their
              share of the tokens. So image a DAO that has 100 DAI, 50 Shares,
              and 50 Loot (shares). That means if you own 10 shares of the DAO
              and rage quit all of your shares, you’d leave with 10 DAI.
            </p>

            <h4>Shares</h4>
            <p>
              Shares are granted to members in order to allow them to vote on
              proposals in the DAO. Shares also represent a claim on the tokens
              held in the DAO.
            </p>

            <h4>Sponsor</h4>
            <p>
              Before a proposal can go for a vote, it needs a current member of
              the DAO to sponsor it. The sponsor will need to deposit some
              tokens (a proposal deposit) in order to sponsor a proposal to make
              sure that they don’t sponsor spam-y proposals.
            </p>

            <h4>Trade</h4>
            <p>
              Another term that basically is exactly what you think it would be.
              This is a quasi-proposal type that allows you to swap one DAO
              token for another.
            </p>

            <h4>Tribute</h4>
            <p>
              This refers to the DAI, wETH, or other tokens you send to a DAO in
              order to join as a new member or get more shares.
            </p>

            <h4>Vote</h4>
            <p>
              Voting is one of the core activities of a DAO. In the Moloch
              framework, all voting happens after a proposal has been sponsored
              in the wait for it…”voting period.” Voting is a simple “yes” /
              “no” choice where you vote all of your shares for one of those
              options.
            </p>

            <h4>Voting Period</h4>
            <p>
              The voting period is how long members will have to vote on a
              proposal once it’s been sponsored. Venture DAOs and Grant DAOs
              that may give out large amounts of capital typically use 7 day
              voting periods. Other DAOs may choose to have shorter voting
              periods, so that funds can be accessed quicker.
            </p>
          </div>
          <div className="Section" id="xDAI">
            <h2>xDAI Quick Start</h2>
            <p>
              Ethereum Mainnet is extremely secure, but lately the transaction
              fees have been too high due to high usage of the network. Slightly
              less secure, but exponentially faster and cheaper, the xDAI
              network offers a strong alternative until Eth 2.0 arrives.
            </p>
            <h4>Network Comparison</h4>
            <img src={xDAIComparisonChart} alt="comparison of main vs xdai" />
            <p>
              There are tradeoffs with any network switch. In the case of xDAI,
              you get far better usability for your community, but at the cost
              of a slightly less secure network (less decentralized) and slight
              change in user experience as you need to bridge tokens from Main
              onto the xDAI network, and back again if you need access to a
              token not yet on xDAI. For more on why we've chosen xDAI over
              other Layer 2 solutions, read our{' '}
              <a
                href="https://medium.com/daohaus-club/daohaus-xdai-dapp-migration-83dca1fc590a"
                rel="noopener noreferrer"
                target="_blank"
              >
                article on Medium
              </a>
              .
            </p>
            <p>
              We’ve prepared the following tips and tricks to using DAOhaus on
              xDAI, but please feel free to hop into our{' '}
              <a
                href="https://discord.gg/MEYmdJF"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord
              </a>{' '}
              and ask us anything.
            </p>
            <h2>How to xDAI</h2>
            <p>
              <strong>Important!</strong> This guide is for summoning new DAOs
              on xDAI or interacting with DAOs fully running on xDAI. If your
              DAO is on Mainnet and you're looking to migrate all activity to
              xDAI, follow the suggested Migrate DAO to xDAI process here.
            </p>
            <h4>1. Bridge some DAI to xDAI</h4>
            <p>
              Where Eth is the native token on Ethereum Mainnet, xDAI is native
              token on xDAI network. To bridge some Dai to xDAI, visit the
              bridge on Mainnet. Transactions are very cheap on xDAI so you
              shouldn't need much.{' '}
            </p>
            <p>
              <a
                href="https://dai-bridge.poa.network/"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://dai-bridge.poa.network/
              </a>
            </p>
            <p>
              <strong>Note:</strong> You can always bridge xDAI back to Dai by
              visiting the same bridge while on the xDAI network instead of
              Mainnet.
            </p>
            <h4>2. Switch to xDAI network</h4>
            <p>
              Add xDAI as a network by clicking 'Custom RPC' in the network
              dropdown in Metamask, and filling in the following details:
              accompanying screenshot
            </p>

            <ul>
              <li>Network Name: xdai </li>
              <li>New RPC URL: https://dai.poa.network/</li>
              <li>ChainID: 100 </li>
              <li>Symbol: xDAI </li>
              <li>Block Explorer URL: https://blockscout.com/poa/xdai</li>
            </ul>

            <p>
              You are now on the xDAI network with some xDAI to run transactions
              like summoning a DAO or voting in an existing one.
            </p>
            <h4>3. Get Wrapped xDAI (wxDAI)</h4>
            <p>
              A lot of DAOs use a wrapped version of the native token (wETH) to
              submit proposals. The equivalent on xDAI is wrapped xDAI (wxDAI).
              Visit Wrapeth.com while on xDAI network to wrap and unwrap xDAI as
              needed.
            </p>
            <h4>4. Bridge back to Main (when necessary)</h4>
            <p>
              Whenever you need to take tokens back to Mainnet for whatever
              reason, you simply visit the bridge while on xDAI network and
              bridge your xDAI back to DAI.
            </p>
            <p>
              <a
                href="https://dai-bridge.poa.network/"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://dai-bridge.poa.network/
              </a>
            </p>
          </div>
          <div className="Section" id="#xDAIMigrate">
            <h2>Migrate DAO from Mainnet to xDAI</h2>
            <p>
              The xDAI bridge currently only accepts DAI to xDAI transfers. For
              that reason, migrating is only recommended for DAOs who are only
              holding DAI in their bank.
            </p>
            <p>
              <strong>Note:</strong> A Multitoken bridge is on its way. We're
              helping build it so it's coming fast ;). We'll update this guide
              when it is usable.
            </p>
            <h4>1. Put a hold on Mainnet activity</h4>
            <p>
              When ready to start migrating, tell your community to hold off on
              submitting new proposals until the migration to xDAI is complete.
              Depending on the length of your DAO's voting period, it'll take at
              least that long to get the state mirrored on xDAI. **Important!
              Before starting the migration, make sure all proposals are
              processed and there are no proposals in Queue, Voting, Grace,
              Ready for Processing.**{' '}
            </p>
            <h4>2. Summon the DAO on xDAI</h4>
            <p>
              Visit DAOhaus on xDAI and summon your DAO. Typically you would
              want to mirror the same settings as the original DAO on mainnet,
              aside from the token contracts. https://xdai.daohaus.club/summon{' '}
            </p>
            <h4>3. Submit Proposals to the xDAI DAO</h4>
            <p>
              Once the DAO is summoned on xDAI, you basically just have to get
              all exact Shares and Loot allocated to the exact same members as
              the one on mainnet. We are working on a migration tool to ease
              this process, but for now the easiest way to do this to submit
              Member Proposals for each member and setting appropriate Shares
              and Loot as found on mainnet. > screenshot of funding proposal >
              screenshot of member cards in dao?{' '}
            </p>
            <p>
              **Important! Be sure to follow proposals on xDAI and ensure they
              all get voted on by someone so that they pass.** Once all
              proposals have been submitted, sponsored, voted on, and processed,
              your xDAI DAO is now in sync with your Mainnet DAO. Other than the
              tokens!
            </p>
            <h4>4. Migrate DAO Funds from Main to xDAI</h4>
            <p>
              Here are two paths to migrating funds from the dao bank on mainnet
              to the dao on xDAI. Trusting a member is fast and easy. Using a
              multisig is more trustless, but VERY hard and time-consuming.
            </p>
            <h4>A. Trusting a Member</h4>
            <p>
              The quickest, easiest way to migrate funds is to submit a Funding
              Proposal that sends all the DAI in the Mainnet DAO to a trusted
              member. The trusted member then simply goes to the{' '}
              <a
                href="https://dai-bridge.poa.network/"
                rel="noopener noreferrer"
                target="_blank"
              >
                xDAI Bridge
              </a>{' '}
              on Mainnet to bridge the DAI to xDAI. Switch to xDAI network and
              visit Wrapeth.com to wrap the xDAI into wxDAI. Once wrappd, you
              can send the wxDAI to the DAO's contract address.
            </p>
            <h4>B. Using Multisigs</h4>
            <p>
              <strong>
                Not recommended unless you know EXACTLY what you're doing. ALL
                of your funds can be lost.
              </strong>
            </p>
            <p>
              You'll need two multisigs. One on Mainnet and one on xDAI. Gnosis
              Safe is great but does not have an interface yet on xDAI, so
              you'll have to get cozy with Etherscan until there is an interface
              available.
            </p>
            <p>
              <a
                href="https://help.gnosis-safe.io/en/"
                rel="noopener noreferrer"
                target="_blank"
              >
                View Gnosis Safe Help
              </a>
            </p>
            <p>Alternate Receiver Help</p>
            <p>
              <a
                href="https://www.xdaichain.com/for-users/converting-xdai-via-bridge/alternate-receiver-send-dai-to-another-xdai-address"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://www.xdaichain.com/for-users/converting-xdai-via-bridge/alternate-receiver-send-dai-to-another-xdai-address
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Help;
