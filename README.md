# Decentralized Voting

    This dApp aims to serve as a voting platform based on the ethereum blockchain.
    It is to be used in order to hold elections simillar to the presidential elections in the USA,
    in it's current 1.0 version it only supports a two-candidate election, but can easily with a few
    modifications be turned into a multi-candidate or multi-party election so it can be used for example in the
    parliamentary and the first part of the presidential elections in Bulgaria. It works really simple -
    the administrator (a government official or a hired, trusted IT specialist) deploys the smart contract,
    starts the vote on the morning of election day and after that the citizens have a fixed period of time
    during which they can vote for their preferred candidate (this can range from a few minutes for
    testing purposes to 12 hours which is the base election duration in most countries to even a few days
    in large countries with multiple timezones like the US). After the time for voting runs out, the contract
    calculates the results and makes them public for anyone to see. Once the results are generated the contract
    is permanently locked and cannot be reused. This is due to security reasons and for logging purposes,
    so that many years after the election the details and results are publicly accessible.
    
## User Stories

1. Administrator POV:
    The administrator deploys the contract, once it's deployed AND started by him, he can vote (keep in mind he is a citizen as well)
    by clicking on the button of the candidate he supports. During the voting process, the administrator doesn't have
    much else to do, except in the case of a failure/attack, in which he can invoke the circut breaker function.
    If he tries to vote more than once, he won't be able to do it.
    
2. Basic User POV:
    The user opens the homepage and if he tries to vote before the election has started or tries to start the vote
    himself, he'll get an error (even if he doesn't get an arror and the timer starts, neither he nor anyone else
    will be able to actually vote. The election DOES NOT start unless the administrator (contract owner) has started it).
    
    After the election has begun, the user can choose between two candidates and click the button for the one
    he's chosen to support. After he casts his vote he won't be able to revert it or vote again.
    
    After the election is over, anyone anywhere and at any time can view the results (notice: it may not work
    on the first click of the result button).

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```javascript
    truffle unbox pet-shop
    ```

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. Run the `liteserver` development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run dev
    ```
    
 6. Interact with the contract using MetaMask, Ganache or the local truffle
 network option. Don't forget to have fun!