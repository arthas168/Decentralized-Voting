$(document).ready(function () {
    //I know global variables are bad but I couldn't figure out something else
    let trumpVotes = 0;
    let hillaryVotes = 0;

    //contract info
    const ContractAddress = "0xEedfc6F577731b4B4D51D53fDC7c6837e6aa9A91"; //Ropsten contract address

    const ContractABI = [
        {
            "constant": false,
            "inputs": [],
            "name": "addCandidate1Vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "addCandidate2Vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "startVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
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
            "name": "getIsVotingInitiated",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
            "name": "isContractStopped",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voted",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    let contract = web3.eth.contract(ContractABI).at(ContractAddress);

    //Hide divs
    $(".countdown-timer").hide();
    $(".calculating-result-div").hide();
    $(".result").hide();
    $(".start-btn-div").hide();
    $(".vote-ended-div").hide();

    try {
        contract.getIsVotingInitiated(function (err, res) {
            if (res) {
                $(".vote-ended-div").show();
                $(".result").show();
                $(".trump-btn").hide();
                $(".hillary-btn").hide();
                $(".notice").hide();
            } else {
                $(".start-btn-div").show();
            }
        });
    }catch (e) {
        alert("Error. Please check if you've logged into MetaMask.");
    }

    //Attach Button Events
    //Invoke to start the vote
    $(".start").click(function () {
        try {
            contract.startVote(function (err, res) {
            });
            $(".start-btn-div").hide();
            initTimer();
            $(".countdown-timer").show();
        } catch (e) {
            alert("You do not have administrative (contract owner) rights!");
        }
    });

    //Invoke when voter votes for candidate 1
    $(".trump-btn").click(function () {
        try {
            contract.addCandidate1Vote(function (err, res) {
                console.log("voted for djt");
                console.log(res);
            });
        } catch (e) {
            alert("Voting hasn't started yet (or you're not logged in to MetaMask)!")
        }
    });

    //Invoke when voter votes for candidate 2
    $(".hillary-btn").click(function () {
        try {
            contract.addCandidate2Vote(function (err, res) {
                console.log("voted for hrc");
                console.log(res);
            });
        } catch (e) {
            alert("Voting hasn't started yet (or you're not logged in to MetaMask)!")
        }
    });

    function initTimer() {
        document.getElementById('timer').innerHTML =
            "04" + ":" + "30";
        startTimer();

        function startTimer() {
            var presentTime = document.getElementById('timer').innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if (s == 59) {
                m = m - 1
            }
            if (m == 0 && s == 0) {
                console.log("timer finished");
                calculateResult();
            }

            document.getElementById('timer').innerHTML =
                m + ":" + s;
            setTimeout(startTimer, 1000);
        }

        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) {
                sec = "0" + sec;
            }
            if (sec < 0) {
                sec = "59"
            }
            return sec;
        }
    }

    function initResltCalculationsTimer() {
        document.getElementById('calc-timer').innerHTML =
            "01" + ":" + "00";
        startTimer();

        function startTimer() {
            var presentTime = document.getElementById('calc-timer').innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if (s == 59) {
                m = m - 1
            }
            if (m == 0 && s == 0) {
                console.log("calc timer finished");
                calculateResult();
            }

            document.getElementById('calc-timer').innerHTML =
                m + ":" + s;
            setTimeout(startTimer, 1000);
        }

        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) {
                sec = "0" + sec;
            }
            if (sec < 0) {
                sec = "59"
            }
            return sec;
        }
    }

    function calculateResult() {
        $('.countdown-timer').hide();
        $('.start-btn-div').hide();
        $('.calculating-result-div').show();
        $(".hillary-btn").hide();
        $(".trump-btn").hide();
        $(".notice").hide();
        initResltCalculationsTimer();
        setTimeout(returnStartButton, 60000);
    }

    function returnStartButton() {
        $(".calculating-result-div").hide();
        $(".countdown-timer").hide();
        $(".result").show();
        showEndDiv();
    }

    $(".result").click(function () {
        //Get votes of each candidate
        contract.getTrumpVotes(function (err, res) {
            trumpVotes = res.c[0];
        });

        contract.getHillaryVotes(function (err, res) {
            hillaryVotes = res.c[0];
        });
        if (trumpVotes === hillaryVotes && trumpVotes === 0) {
            alert("No votes were casted.");
        } else if (trumpVotes > hillaryVotes) {
            alert("The winner is Donald J. Trump! Vote result is " + trumpVotes + ":" + hillaryVotes);
        } else if (hillaryVotes > trumpVotes) {
            alert("The winner is Hillary R. Clinton! Vote result is " + hillaryVotes + ":" + trumpVotes);
        } else if (trumpVotes === hillaryVotes && trumpVotes > 0) {
            alert("It's a tie! Good luck America... " + trumpVotes + ":" + hillaryVotes);
        }
    });

    function showEndDiv() {
        $(".calculating-result-div").hide();
        $(".vote-ended-div").show();
    }
});
