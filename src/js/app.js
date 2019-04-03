$(document).ready(function () {
    //contract info
    const ContractAddress = "0x5fb6d44bbe6b5cf76c61eaf6eef2a88911153872"; //Ropsten contract address

    const ContractABI = [
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
            "constant": false,
            "inputs": [],
            "name": "resetVote",
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
            "name": "addHillaryVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ];

    let contract = web3.eth.contract(ContractABI).at(ContractAddress);

    //Hide divs
    $(".countdown-timer").hide();
    $(".calculating-result-div").hide();
    $(".resetting-div").hide();

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
            contract.addTrumpVote(function (err, res) {
                console.log("voted for djt");
                console.log(res);
            });
        } catch (e) {
            alert("Voting hasn't started yet!")
        }
    });

    //Invoke when voter votes for candidate 2
    $(".hillary-btn").click(function () {
        try {
            contract.addHillaryVote(function (err, res) {
                console.log("voted for hrc");
                console.log(res);
            });
        } catch (e) {
            alert("Voting hasn't started yet!")
        }
    });

    function initTimer() {
        document.getElementById('timer').innerHTML =
            "01" + ":" + "20";
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
        initResltCalculationsTimer();
        setTimeout(returnStartButton, 60000);
    }


    function returnStartButton() {
        getResults();
        $(".calculating-result-div").hide();
        $(".countdown-timer").hide();
        $(".resetting-div").show();
        resetPoints();
    }

    async function getResults() {
        let votesForTrump = 0;
        let votesForHillary = 0;
        //Get votes of each candidate
        await contract.getTrumpVotes(function (err, res) {
            votesForTrump = res.c[0];
            console.log(res.c[0]);
        });
        console.log(votesForTrump);
        await contract.getTrumpVotes(function (err, res) {
            votesForHillary = res.c[0];
            console.log(res.c[0]);
        });
        console.log(votesForHillary);

        alert("trump " + votesForTrump + " : " + "hillary " + votesForHillary);
    }

    function resetPoints() {
        $(".calculating-result-div").hide();
        contract.resetVote(function (err, res) {
            console.log("reseted");
            console.log(res);
        });
        setTimeout(showStartButton, 5000);
    }

    function showStartButton() {
        $(".calculating-result-div").hide();
        $(".resetting-div").hide();
        $(".start-btn-div").show();
        $(".trump-btn").show();
        $(".hillary-btn").show();
    }
});
