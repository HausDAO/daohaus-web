import React from 'react';

import './Help.scss';

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
              <a href="#Pledge">Pledge to join a Dao</a>
            </li>
            <li>
              <a href="#Pokemol-Intro">Pokemol Intro</a>
            </li>
            <li>
              <a href="#Pokemol-Setup">Pokemol Account</a>
            </li>
            <li>
              <a href="#Proposals">Submit a Proposal</a>
            </li>
            <li>
              <a href="#Periods">Voting and Periods</a>
            </li>
            <li>
              <a href="#Rage">Ragequit</a>
            </li>
          </ul>
        </div>
        <div className="Sections">
          <div className="Section" id="Support">
            <h2>Support</h2>
            <p>
              Feel free to hit us up in our Support Group on Telegram. Ask us
              anything about daos. Let us know about bugs and features for
              improvement.
            </p>
          </div>
          <div className="Intro Section" id="WTF-Moloch">
            <h2>WTF is a Moloch?</h2>
            <p>
              For a brief introduction daos and Molochs specifically, you can
              catch up via the Moloch Primer for Humans on Medium
            </p>
            <a
              href="https://medium.com/odyssy/moloch-primer-for-humans-9e6a4f258f78"
              rel="noopener noreferrer"
            >
              Read on Medium
            </a>
          </div>
          <div className="Section" id="Summon">
            <h2>Summon a Dao</h2>
            <p>
              Most users should summon a dao through ‘Easy’ mode. ‘Hard’ mode is
              for custom implementations and is not recommended for average
              users.
            </p>
            <h3>Easy Mode</h3>
            <h4>Data</h4>
            <p>Provide a name & description for the dao.</p>
            <h4>Currency</h4>
            <p>
              Select a main Currency to accept as tribute. Currently wETH and
              DAI are available through Easy mode.
            </p>
            <h4>Periods</h4>
            <p>
              Larger daos with large amounts of funding typically use 7 days
              Voting and 7 Days Grace, meaning 14 days from when a proposal is
              submitted to when it can be processed.
            </p>
            <p>
              Smaller, faster daos use 3 days Voting, 2 Days Grace, meaning a
              total of 7 days from when a proposal is submitted to when it can
              be processed.
            </p>
            <h4>Next Steps</h4>
            <p>
              After the summoning transaction completes, your dao should be
              visible on the home page of Daohaus, where potential members can
              pledge tribute and request shares.
            </p>
            <h3>Hard Mode</h3>
            <p>
              In Hard Mode, all inputs are raw. For the currency, you need to
              input a contract address to an Erc20 compatible token. All amounts
              are in wei. If you really need to use Hard Mode and are running
              into issues, hit us up in the Support Group on Telegram.
            </p>
          </div>
          <div className="Section" id="Pledge">
            <h2>Pledge to a Dao</h2>
            <p>
              You can see all daos on the Daohaus home page. Navigate to a dao
              of your choosing, and click on a dao to view that dao’s page.
            </p>
            <p>
              Once on a dao’s page, click on ‘Pledge to Join’ to begin the
              Pledging process.
            </p>
            <h4>Data</h4>
            <p>
              Let the dao know your name (or psuedonym) and a little about
              yourself to help inform the dao if they should let you in.
            </p>
            <h4>Tribute</h4>
            <p>
              Tell the dao how much Tribute (Ex. 1 ETH) you’re willing to offer
              in exchange for Shares (Ex. 1 Share). You’re only approving a dao
              to take your tribute if they submit a proposal to accept you as a
              member. Your tribute will go into the proposal (like an escrow)
              and only fully go to the dao if your proposal passes. Otherwise,
              your tribute is returned to you.
            </p>
            <p className="Note">
              Note: If you do not have sufficient funds available, the proposal
              will fail.
            </p>
            <h4>Shares</h4>
            <p>
              Let the dao know how many Shares are you requesting. Typically,
              request 1 Share per 1 Tribute offered. (Ex. 10 tribute, should
              request 10 shares).
            </p>
          </div>
          <div className="Section" id="Pokemol-Intro">
            <h2>WTF is Pokemol?</h2>
            <p>
              A few minutes after a dao is initially summoned on Daohaus, your
              Pokemol should be available at:
            </p>
            <pre>https://pokemol.com/dao/[contract-address]</pre>
            <h4>Introduction to Pokemol and its Contract Wallets</h4>
            <p>
              Summon, Pledge, Ragequit and Update Delegate all happen on
              Daohaus. All other interactions such as submitting proposals and
              voting happen within its Pokemol.
            </p>
            <p>Pokemol uses contract wallets to improve your experience.</p>
            <ul>
              <li>
                Can be used in any device/browser (no special Extensions or
                Browsers needed)
              </li>
              <li>One click interactions (no need for signing)</li>
              <li>Can chain multiple transactions into one</li>
            </ul>
          </div>
          <div className="Section" id="Pokemol-Setup">
            <h2>Setup your Pokemol account</h2>
            <p>
              A few minutes after a dao is initially summoned on Daohaus, your
              Pokemol should be available at{' '}
            </p>
            <pre>https://pokemol.com/dao/[contract-address]</pre>
            <h4>1. Create a new Account</h4>
            <p>
              When you create an account, a new contract wallet is created for
              you. The private key is encrypted, and can only be decrypted by
              your account’s password.
            </p>
            <p className="Note">
              Note: We do not store your password and it cannot be recovered.
              Please write it down and keep it somewhere safe.
            </p>
            <h4>2. Deploy the wallet</h4>
            <p>
              After signing in for the first time, you’ll be prompted to send
              0.05 Eth to your new wallet’s address. This will be enough to
              deploy your wallet and have enough left for some ongoing
              participation. Send the Eth as instructed, and once the
              transaction completes, you’ll be prompted to Deploy your wallet to
              complete setup of your account. After deployment completes, your
              wallet’s status should say ‘Deployed’.
            </p>
            <h4>3. Update Delegate</h4>
            <p>
              Once a membership proposal passes, Shares are sent to the address
              you Pledged with. You need to give your contract wallet access to
              your Shares by updating its delegate key.
            </p>
            <ol>
              <li>
                In Pokemol, go to your ‘Account’ page and copy your contract
                wallet’s address to your clipboard.
              </li>
              <li>
                Then on Daohaus, Sign in with the account you Pledged (or
                Summoned) with that now has Shares.
              </li>
              <li>Go to the dao’s page and click ‘Update Delegate’</li>
              <li>Enter your Pokemol account address and hit ‘Submit’.</li>
            </ol>
            <p>
              Once the transaction completes, you should see your Shares listed
              in your Pokemol account. This means your Pokemol account can now
              use your Shares to submit votes and proposals.
            </p>
          </div>
          <div className="Section" id="Proposal">
            <h2>Submitting a Proposal</h2>
            <p>
              When someone Pledges to join your dao at Daohaus, their pledge
              will be displayed on the dao’s page. This Pledges let you know the
              following, to inform of what to submit as a proposal:
            </p>
            <ul>
              <li>How much Tribute was offered</li>
              <li>
                If they have enough funds to cover the tribute. If not, it will
                say ‘Insufficient Funds’.
              </li>
              <li>How many Shares were requested</li>
              <li>
                Applicant’s address to receive shares (You can click on a
                Pledger’s card to go to their profile to get their full address)
              </li>
              {/* Commented out until showing to the user
                            <li>Also a Name and a Note to reference for more information to dao members.</li>
                            */}
            </ul>
          </div>
          <div className="Section" id="Proposals">
            <h2>Submit a Proposal</h2>
            <h4>Requirements</h4>
            <p>
              To submit a proposal, you need enough dao Tokens (depending on the
              dao) in your wallet to cover the deposit (set at dao summoning)
              and that amount should be approved. You will also need a bit of
              Eth for gas.
            </p>
            <ol>
              <li>
                Sufficient balance of Tribute Tokens for a deposit (Eth, DAI, or
                whatever the dao uses as its Tribute currency).
              </li>
              <li>Tribute Tokens unlocked</li>
              <li>Enough Eth to run the transaction.</li>
            </ol>
            <h4>Title</h4>
            <p>
              Most daos use some kind of naming convention to differentiate
              proposals for their members. For example, a membership proposal
              could look like “Member #1: Psuedonym” and a Grant Proposal could
              look like “Grant #1: Project Name”
            </p>
            <h4>Description & Link</h4>
            <p>
              Provide some information about why someone should vote on this
              proposal. If it’s a membership proposal, provide some information
              on the Pledger. You can also add a link to an external website or
              document for more information.
            </p>
            <h4>Applicant</h4>
            <p>
              This is the address for where the Shares should go if the proposal
              passes. If it is a Membership Proposal that offers Tribute as
              well, then the funds for the Tribute should be in the same
              address.
            </p>
            <h4>Tribute</h4>
            <p>
              Enter the same amount of Tribute that the applicant offered in
              their Pledge. If it is a Grant Proposal, then just leave Tribute
              as ‘0’
            </p>
            <h4>Shares</h4>
            <p>
              Enter the same amount of Shares that the Pledger requested. If
              they entered an incorrect amount, feel free to enter the
              appropriate amount instead.
            </p>
          </div>
          <div className="Section" id="Periods">
            <h2>Voting and Proposal Periods</h2>
            <p>
              When a proposal is submitted successfully, it goes into the Queue
              while it waits on next Voting Period. The proposal will tell you
              how long until the next period.
            </p>
            <h4>Voting Period</h4>
            <p>A Proposal can be voted on once it moves to Voting period</p>
            <ol>
              <li>
                There is no quorum, so even if there is only one ‘Yes’ vote, and
                noone votes ‘No’, the proposal will pass.
              </li>
              <li>
                If noone votes at all or if the vote is tied, the proposal will
                fail
              </li>
            </ol>
            <h4>Grace Period</h4>
            <p>
              After Voting, a proposal moves to Grace period, which offers the
              chance for Members to show dissent through Ragequitting (See
              Ragequit for more info).
            </p>
            <h4>Processing Period</h4>
            <p>
              After Grace, a proposal moves to ‘Ready to Process’. Anyone (not
              just dao Members) can go to the proposal and click ‘Process’ to
              finalize the proposal. It is at this time that all functions of
              the proposal are executed (i.e., shares minted, tribute accepted,
              etc).
            </p>
            <p className="Note">
              Note: Proposals must be Processed in the order in which they were
              submitted.
            </p>
          </div>
          <div className="Section" id="Rage">
            <h2>Ragequit</h2>
            <p>
              Ragequit is basically just a withdraw function where you burn your
              Shares and get a proportional amount of Tribute. All Ragequits
              must happen from daohaus.
            </p>
            <ol>
              <li>
                At Daohaus, sign in with the Metamask/Web3 wallet that has
                Shares.
              </li>
              <li>Navigate to the dao’s page and click ‘Ragequit’</li>
              <li>
                Enter the amount of Shares you’d like to burn and click ‘Submit’
              </li>
              <li>
                After the transaction completes, your Shares will go down and a
                proportionate amount of Tribute Token will be withdrawn to the
                wallet.
              </li>
            </ol>
            <h4>For Grant Recipients</h4>
            <p>
              Typically, you should Ragequit all of your Shares. Depending on
              the dao, they might appreciate it if you leave some Shares in to
              use for voting/signaling, in which case you can remain as an
              ongoing Member. You should ask the dao how they feel about that
              first.
            </p>
            <h4>For Members</h4>
            <p>
              If a Member strongly disagrees with a proposal, and as long as
              they don’t have a ‘Yes’ vote on any open proposals, they can
              ragequit during this period to burn their Shares and withdraw
              their remaining Tribute before the proposal can be processed. You
              can Ragequit any amount. If you Ragequit ALL Shares, you’ll no
              longer be able to vote or submit proposals, essentially leaving
              the dao.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Help;
