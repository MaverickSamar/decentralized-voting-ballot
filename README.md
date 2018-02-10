# Voting Ballot DApp

Built a voting ballot application with 4 NFL Teams such that there is a chairperson who is authorized to register voters. Voters have the permission to vote only after the registration process.

<small> The smart contract used is based on the example in solidity docs </small>


## Business Logics handled
1. Chairperson registers accounts to vote
2. No other account can register accounts to vote
3. Can't register already registered user
4. Unregistered account can't vote
5. Registered accounts cannot vote twice
6. Can't vote a person who is not there

## Business logic to be included 
1. State change rules
2. Save start time as a state variable

## Prerequisite
1. Ganache
2. NodeJs
3. Metamask
4. Truffle

## Instruction for truffle testing
1. Clone the repository to a local folder
2. Start Ganache 
3. Go to the cloned folder using command line
4. Execute truffle compile
5. Execute truffle migrate
6. Execute truffle test

This should print the following in the console

 Contract: BallotContract
    ✓ contract deployment
    ✓ valid users registration 
    ✓ valid voting
    ✓ validate winner
    ✓ valid votes
    ✓ should NOT accept unautherized registeration
    ✓ should NOT register already registered user
    ✓ should NOT vote from unautherized voting
    ✓ should NOT vote twice
    ✓ should NOT vote unknown person


  10 passing



## Instruction for DApp

1. Now to start the nodeJs server execute npm run dev
2. This should start the front end of the application at localhost:3000
3. The contract is deployed when the page is loaded from the account that is active in the metamask and that account becomes the chairperson. Lets assume that this account as Account 1 in metamask.
4. Now go the the Ganache GUI and copy the second account listed and paste in the address box and hit register. (Note: the account in Metamask should be Account 1)
5. Repeat the step 4 for other accounts and please keep in mind that you should not change the Metamask account while registering
6. Now to cast vote from the account 2 change the account in Metamask from account 1 to account 2 and then click vote.
7. To vote from any account switch to that account in metamask and then click vote
8. Finally, after voting you can click declare winner

Note: Don't refresh the web page as it deploys a new contract using the current account. You may have to repeat from registration  







