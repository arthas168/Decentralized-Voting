$(document).ready(function () {
    const ContractAddress = "0x85c13a874d779ab5dC4cF9e4d785085AD9F7E4Ae"; //Ropsten contract address

    const ContractABI = [
        {
            "constant": false,
            "inputs": [],
            "name": "addHillaryVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "addTrumpVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "resetVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getHillaryVotes",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getTrumpVotes",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getWinner",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    let contract = web3.eth.contract(ContractABI).at(ContractAddress);

    //Invoke when voter votes for candidate 1
    $(".trump-btn").click(function () {
        contract.addTrumpVote(function(err,res) {});
    });

    //Invoke when voter votes for candidate 1
    $(".reset").click(function () {
        contract.reset(function(err,res) {});
    });

    //Invoke when voter votes for candidate 2
    $(".hillary-btn").click(function () {
        contract.addHillaryVote(function(err,res) {});
    });

    //Get info about winner
    $(".result").click(function() {

        //Get votes of each candidate
        let hillaryVotes = 0;
        contract.getHillaryVotes(function(err,res)
        {
            hillaryVotes = res;
        });
        let trumpVotes = 0;
        contract.getTrumpVotes(function(err,res)
        {
            trumpVotes = res;
        });

        contract.getWinner(function(err,res)
        {
            alert(res + " " + "trump " + trumpVotes + " : " + "hillary " + hillaryVotes);
        });
    });
});
