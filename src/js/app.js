App = {
  web3Provider: null,
  contracts: {},
  names: new Array(),

  init: function() {
    // Load CANDIDATES
    $.getJSON('../proposals.json', function(data) {
      var proposalsRow = $('#proposalsRow');
      var proposalTemplate = $('#proposalTemplate');

      for (i = 0; i < data.length; i ++) {
        proposalTemplate.find('.panel-title').text(data[i].name);
        proposalTemplate.find('img').attr('src', data[i].picture);
        //proposalTemplate.find('.age').text(data[i].age);
        proposalTemplate.find('.party').text(data[i].party);
        proposalTemplate.find('.btn-vote').attr('data-id', data[i].id);

        proposalsRow.append(proposalTemplate.html());
        App.names.push(data[i].name);
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
        // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    }
    web3 = new Web3(App.web3Provider);


    return App.initContract();
  },

  initContract: function() {
      $.getJSON('Ballot.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var voteArtifact = data;
    App.contracts.info = TruffleContract(voteArtifact);

    // Set the provider for our contract
    App.contracts.info.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the voted pets
    // return App.markvoted();     // TOD
    return App.deploy();
  });
    //return App.bindEvents();
  },

  deploy : function(){
    App.contracts.info.deployed().then(function(instance) {
      App.contracts.instance = instance;
      console.log(App.contracts.instance);
       App.bindEvents();
    });
  },

  bindEvents: function() {
    $(document).on('click', '.btn-vote', App.handlevote);
    $(document).on('click', '#win-count', App.declareWinner);
    $(document).on('click', '#register', function(){ var ad = $('#enter_address').val(); console.log(ad); App.handleregister(ad);   });
  },

  // markvoted: function(voters, account) {
  //   var voteInstance;
  //   console.log(voteInstance);
  //   App.contracts.vote.deployed().then(function(instance) {
  //     voteInstance = instance;
  //     console.log(voteInstance.getCount.call());
  //     return voteInstance.getCount.call();
  //   }).then(function(proposals) {
  //     for ( i = 0; i < proposals.length ; i++) {
  //         console.log('hello');
  //         //$('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //         //$('.panel-proposal').eq(i).find('#vote-count').text(proposals[i] + " ");
  //
  //
  //
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  //     },

handleregister: function(addr){

    //event.preventDefault();

    App.contracts.instance.register(addr).then( function(result){
      if(result.receipt.status == '0x01')
        alert(addr + " is registered successfully")
      else
        alert(addr + " is not registered successfully")
    }).catch( function(err){
      console.log(err.message);
    })
},

// handling the vote
  handlevote: function(event) {
    event.preventDefault();

    var proposalId = parseInt($(event.target).data('id'));
    console.log("proposal id "+proposalId);
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("account id "+account);
      App.contracts.instance.vote(proposalId, {from: account}).then(function(result) {
        if(result.receipt.status == '0x01')
          alert(account + " voting done successfully")
        else
          alert(account + " voting not done successfully")
      })
      // .then(function(result) {
      //   return App.markvoted();
      // }).catch(function(err) {
      //   console.log(err.message);
      // });

    });
  },


  declareWinner : function() {
    App.contracts.instance.winningProposal().then(function(result){
      alert(App.names[result] + "  is the winner ! :)");
    }).catch(function(err){
      console.log(err.message);
    })
  }


};




$(function() {
  $(window).load(function() {
    App.init();
    console.log('starting app.js');
  });
});
