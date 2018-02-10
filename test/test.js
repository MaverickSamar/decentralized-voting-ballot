let Ballot = artifacts.require("./Ballot.sol");

let ballotInstance;

let _amount = [6534, 1234, 123];

let _voting = {
	"winner": 0,
	"one": 1,
	"two": 2,
	"three": 3
}

contract('BallotContract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("contract deployment", function() {
    return Ballot.deployed().then(function (instance) {
      ballotInstance = instance;
      assert(ballotInstance !== undefined, 'Ballot contract should be defined');
    });
  });

  //Test case 2
  it("valid users registeration", function() {
    return ballotInstance.register(accounts[1], { from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'balance should be equal');
      return ballotInstance.register(accounts[2], { from: accounts[0]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'balance should be equal');
      return ballotInstance.register(accounts[3], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'balance should be equal');
      return ballotInstance.register(accounts[4], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'balance should be equal');
      return ballotInstance.register(accounts[5], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'balance should be equal');
    });
  });

  //Test case 3
  it("valid voting", function() {
    return ballotInstance.vote(_voting.winner, {from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'voting is done');
      return ballotInstance.vote(_voting.one, {from: accounts[1]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'voting is done');
      return ballotInstance.vote(_voting.two, {from: accounts[2]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'voting is done');
      return ballotInstance.vote(_voting.three, {from: accounts[3]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'voting is done');
      return ballotInstance.vote(_voting.winner, {from: accounts[4]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'voting is done');
    });
  });

  //Test case 4
  it("validate winner", function () {
    return ballotInstance.winningProposal.call().then(function (result) {
      assert.equal(_voting.winner, result.toNumber(), 'expected winner');
    });
  });

  //Test case 5
  it("valid votes", function () {
    return ballotInstance.getCount.call().then(function (result) {
      assert.equal(3, result[0].toNumber(), 'expected winner');
      assert.equal(1, result[1].toNumber(), 'expected winner');
      assert.equal(1, result[2].toNumber(), 'expected winner');
      assert.equal(1, result[3].toNumber(), 'expected winner');
    });
  });

//Negative cases
  it("should NOT accept unautherized registeration", function () {
    return ballotInstance.register(accounts[6], { from: accounts[1]}).then(function (result) {
      assert.equal('0x00', result.receipt.status, 'should NOT accept unautherized registeration');
    });
  });

  it("should NOT register already registered user", function () {
    return ballotInstance.register(accounts[1], { from: accounts[0]}).then(function (result) {
      assert.equal('0x00', result.receipt.status, 'should NOT accept unautherized registeration');
    });
  });

  it("should NOT vote from unautherized voting", function () {
    return ballotInstance.vote(1, {from: accounts[6]}).then(function (result) {
      assert.equal('0x00', result.receipt.status, 'should NOT vote from unautherized voting');
    });
  });

  it("should NOT vote twice", function () {
    return ballotInstance.vote(1, {from: accounts[1]}).then(function (result) {
      assert.equal('0x00', result.receipt.status, 'should NOT vote twice');
    });
  });

  it("should NOT vote unknown person", function () {
    return ballotInstance.vote(4, {from: accounts[5]}).then(function (result) {
      assert.equal('0x00', result.receipt.status, 'should NOT vote unknown person');
    });
  });

});
