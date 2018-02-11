module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    dev_truffle: {
      host: "localhost",
      port: 9545,
      network_id: "*" // Match any network id
    },
    dev_ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }


};
