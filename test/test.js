let Ballot = artifacts.require("./Ballot.sol");

let ballotInstance;

let _voting = {
	"winner": 0,
	"one": 1,
	"two": 2,
	"three": 3
}

contract('Ballot Contract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract Deployment", function() {
    return Ballot.deployed().then(function (instance) {
      ballotInstance = instance;
      assert(ballotInstance !== undefined, 'Ballot contract should be defined');
    });
  });

  //Test case 2
  it("Valid User Registration", function() {
    return ballotInstance.register(accounts[1], { from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[2], { from: accounts[0]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[3], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[4], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[5], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
    });
  });

  //Test case 3
  it("Valid Voting", function() {
    return ballotInstance.vote(_voting.winner, {from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.one, {from: accounts[1]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.two, {from: accounts[2]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.three, {from: accounts[3]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.winner, {from: accounts[4]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
    });
  });

  //Test case 4
  it("Validate Winner", function () {
    return ballotInstance.winningProposal.call().then(function (result) {
      assert.equal(_voting.winner, result.toNumber(), 'Winner is validated with the expected winner');
    });
  });

  //Test case 5
  it("Valid Individual Votes", function () {
    return ballotInstance.getCount.call().then(function (result) {
      assert.equal(3, result[0].toNumber(), 'Individual vote is validated with expected vote count');
      assert.equal(1, result[1].toNumber(), 'Individual vote is validated with expected vote count');
      assert.equal(1, result[2].toNumber(), 'Individual vote is validated with expected vote count');
      assert.equal(1, result[3].toNumber(), 'Individual vote is validated with expected vote count');
    });
  });

//Negative cases
  it("Should NOT Accept Unauthorized Registration", function () {
  return ballotInstance.register(accounts[6], { from: accounts[1]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
    }).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
  });

  it("Should NOT Register Already Registered User", function () {
  return ballotInstance.register(accounts[1], { from: accounts[0]})
		.then(function (result) {
			throw("Condition not implemented in Smart Contract");
	}).catch(function (e) {
		if(e === "Condition not implemented in Smart Contract") {
			assert(false);
		} else {
			assert(true);
		}
	})
});

  it("Should NOT Accept Unauthorized User Vote", function () {
  return ballotInstance.vote(1, {from: accounts[7]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
    }).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
  });

  it("Should NOT Vote Again", function () {
  return ballotInstance.vote(1, {from: accounts[1]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
		}).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
	});

  it("Should NOT Vote Unknown Entity", function () {
    return ballotInstance.vote(4, {from: accounts[5]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
		}).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
	});
});
