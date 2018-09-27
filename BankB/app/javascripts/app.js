// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import "bootstrap/dist/css/bootstrap.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import RobustKYC_BankB from '../../build/contracts/RobustKYC_BankB.json'

// Robust KYC is our usable abstraction, which we'll use through the code below.
var RobustKYC = contract(RobustKYC_BankB);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    RobustKYC.setProvider(web3.currentProvider);
    console.log(web3.eth.accounts);
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      console.log(accounts);
      web3.personal.unlockAccount(account, "testing");
    });
  },

  verify_name_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.name_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },

  verify_email_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.email_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },

  verify_phone_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.phone_no_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },

  verify_address_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.address_details_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },

  verify_blood_group_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.blood_group_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },

  verify_image_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.image_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },


  verify_document1_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.document1_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {

      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },
  verify_document2_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.document2_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {

      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },
  verify_document3_by_bankB: function (status) {
    var id = document.getElementById("customerId").value;
    document.getElementById("loading").removeAttribute("hidden");

    RobustKYC.deployed().then(function (instance) {
      return instance.document3_by_BankB(id, status, { from: account, gas: 1000000 });
    }).then(function (result) {

      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");

    });
  },


  

  customer_details_by_Id: function () {
    var id = document.getElementById("customerId").value;
    var contract_instance;
    RobustKYC.deployed().then(function (instance) {
      contract_instance = instance;
      return instance.getDetails(id, { from: account });

    }).then(function (result) {
      console.log(result);
      document.getElementById("name").value = web3.toAscii(result[1]).replace(/\u0000/g, '');
      document.getElementById("email").value = web3.toAscii(result[2]).replace(/\u0000/g, '');
      if(result[3]!=0)
      document.getElementById("phone_no").value = (result[3]);
      
      document.getElementById("address").value = web3.toAscii(result[4]).replace(/\u0000/g, '');


    }).then(function () {
      return contract_instance.getOtherDetails(id, { from: account });
    }).then(function (res2) {
      document.getElementById("blood_group").value = web3.toAscii(res2[1]).replace(/\u0000/g, '');

    }).then(function () {
      return contract_instance.getImage(id);
    }).then(function (res3) {

      console.log(res3[1]);
      var str = web3.toUtf8(res3[1]) + web3.toUtf8(res3[2]);

      let url = `https://ipfs.io/ipfs/${str}`
      console.log(`Url --> ${url}`)
      document.getElementById("url").href = url
      document.getElementById("output").src = url

      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
    }).then(function () {
      return contract_instance.getDocuments(id);
    }).then(function (res4) {

      console.log(res4[1]);
      var str1 = web3.toUtf8(res4[1]) + web3.toUtf8(res4[2]);
      var str2 = web3.toUtf8(res4[3]) + web3.toUtf8(res4[4]);
      var str3 = web3.toUtf8(res4[5]) + web3.toUtf8(res4[6]);


      let url1 = `https://ipfs.io/ipfs/${str1}`
      console.log(`Url --> ${url1}`)
      document.getElementById("url_document1").href = url1
      document.getElementById("output_document1").src = url1
      let url2 = `https://ipfs.io/ipfs/${str2}`
      console.log(`Url --> ${url2}`)
      document.getElementById("url_document2").href = url2
      document.getElementById("output_document2").src = url2
      let url3 = `https://ipfs.io/ipfs/${str3}`
      console.log(`Url --> ${url3}`)
      document.getElementById("url_document3").href = url3
      document.getElementById("output_document3").src = url3

      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
    });
  },


  refreshBankBStatus: function (id) {
    var contract_instance;
    RobustKYC.deployed().then(function (instance) {
      contract_instance = instance;
      return contract_instance.get_details_by_BankB(id, { from: account });
    }).then(function (result) {

      if (result[0] == 1) {
        document.getElementById("name_bankB").innerHTML = "Verified";
        document.getElementById("name_bankB").className = "badge progress-bar-success";
      } else if (result[0] == 2) {
        document.getElementById("name_bankB").innerHTML = "Rejected";
        document.getElementById("name_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("name_bankB").innerHTML = "Unverified";
        document.getElementById("name_bankB").className = "badge progress-bar-primary";

      }

      if (result[1] == 1) {
        document.getElementById("email_bankB").innerHTML = "Verified";
        document.getElementById("email_bankB").className = "badge progress-bar-success";

      } else if (result[1] == 2) {
        document.getElementById("email_bankB").innerHTML = "Rejected";
        document.getElementById("email_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("email_bankB").innerHTML = "Unverified";
        document.getElementById("email_bankB").className = "badge progress-bar-primary";


      }

      if (result[2] == 1) {
        document.getElementById("phone_bankB").innerHTML = "Verified";
        document.getElementById("phone_bankB").className = "badge progress-bar-success";

      } else if (result[2] == 2) {
        document.getElementById("phone_bankB").innerHTML = "Rejected";
        document.getElementById("phone_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("phone_bankB").innerHTML = "Unverified";
        document.getElementById("phone_bankB").className = "badge progress-bar-primary";


      }

      if (result[3] == 1) {
        document.getElementById("address_bankB").innerHTML = "Verified";
        document.getElementById("address_bankB").className = "badge progress-bar-success";

      } else if (result[3] == 2) {
        document.getElementById("address_bankB").innerHTML = "Rejected";
        document.getElementById("address_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("address_bankB").innerHTML = "Unverified";
        document.getElementById("address_bankB").className = "badge progress-bar-primary";

      }



    }).then(function () {
      return contract_instance.get_other_details_by_BankB(id, { from: account });
    }).then(function (res2) {
      if (res2 == 1) {
        document.getElementById("blood_group_bankB").innerHTML = "Verified";
        document.getElementById("blood_group_bankB").className = "badge progress-bar-success";

      } else if (res2 == 2) {
        document.getElementById("blood_group_bankB").innerHTML = "Rejected";
        document.getElementById("blood_group_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("blood_group_bankB").innerHTML = "Unverified";
        document.getElementById("blood_group_bankB").className = "badge progress-bar-primary";

      }
    }).then(function () {
      return contract_instance.get_image_details_by_BankB(id);
    }).then(function (res3) {
      if (res3 == 1) {
        document.getElementById("image_bankB").innerHTML = "Verified";
        document.getElementById("image_bankB").className = "badge progress-bar-success";

      } else if (res3 == 2) {
        document.getElementById("image_bankB").innerHTML = "Rejected";
        document.getElementById("image_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("image_bankB").innerHTML = "Unverified";
        document.getElementById("image_bankB").className = "badge progress-bar-primary";

      }
    }).then(function () {
      return contract_instance.get_documents_details_by_BankB(id);
    }).then(function (res4) {
      if (res4[0] == 1) {
        document.getElementById("document1_bankB").innerHTML = "Verified";
        document.getElementById("document1_bankB").className = "badge progress-bar-success";

      } else if (res4[0] == 2) {
        document.getElementById("document1_bankB").innerHTML = "Rejected";
        document.getElementById("document1_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("document1_bankB").innerHTML = "Unverified";
        document.getElementById("document1_bankB").className = "badge progress-bar-primary";

      }

      if (res4[1] == 1) {
        document.getElementById("document2_bankB").innerHTML = "Verified";
        document.getElementById("document2_bankB").className = "badge progress-bar-success";

      } else if (res4[1] == 2) {
        document.getElementById("document2_bankB").innerHTML = "Rejected";
        document.getElementById("document2_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("document2_bankB").innerHTML = "Unverified";
        document.getElementById("document2_bankB").className = "badge progress-bar-primary";

      }

      if (res4[2] == 1) {
        document.getElementById("document3_bankB").innerHTML = "Verified";
        document.getElementById("document3_bankB").className = "badge progress-bar-success";

      } else if (res4[2] == 2) {
        document.getElementById("document3_bankB").innerHTML = "Rejected";
        document.getElementById("document3_bankB").className = "badge progress-bar-danger";

      } else {
        document.getElementById("document3_bankB").innerHTML = "Unverified";
        document.getElementById("document3_bankB").className = "badge progress-bar-primary";

      }
    });

  },

  refreshBankAStatus: function (id) {
    var contract_instance;
    RobustKYC.deployed().then(function (instance) {
      contract_instance = instance;
      return instance.get_details_by_BankA(id, { from: account });
    }).then(function (result) {

      if (result[0] == 1) {
        document.getElementById("name_bankA").innerHTML = "Verified";
        document.getElementById("name_bankA").className = "badge progress-bar-success";
      } else if (result[0] == 2) {
        document.getElementById("name_bankA").innerHTML = "Rejected";
        document.getElementById("name_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("name_bankA").innerHTML = "Unverified";
        document.getElementById("name_bankA").className = "badge progress-bar-primary";

      }

      if (result[1] == 1) {
        document.getElementById("email_bankA").innerHTML = "Verified";
        document.getElementById("email_bankA").className = "badge progress-bar-success";

      } else if (result[1] == 2) {
        document.getElementById("email_bankA").innerHTML = "Rejected";
        document.getElementById("email_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("email_bankA").innerHTML = "Unverified";
        document.getElementById("email_bankA").className = "badge progress-bar-primary";


      }

      if (result[2] == 1) {
        document.getElementById("phone_bankA").innerHTML = "Verified";
        document.getElementById("phone_bankA").className = "badge progress-bar-success";

      } else if (result[2] == 2) {
        document.getElementById("phone_bankA").innerHTML = "Rejected";
        document.getElementById("phone_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("phone_bankA").innerHTML = "Unverified";
        document.getElementById("phone_bankA").className = "badge progress-bar-primary";


      }

      if (result[3] == 1) {
        document.getElementById("address_bankA").innerHTML = "Verified";
        document.getElementById("address_bankA").className = "badge progress-bar-success";

      } else if (result[3] == 2) {
        document.getElementById("address_bankA").innerHTML = "Rejected";
        document.getElementById("address_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("address_bankA").innerHTML = "Unverified";
        document.getElementById("address_bankA").className = "badge progress-bar-primary";

      }




    }).then(function () {
      return contract_instance.get_other_details_by_BankA(id, { from: account });
    }).then(function (res2) {
      if (res2 == 1) {
        document.getElementById("blood_group_bankA").innerHTML = "Verified";
        document.getElementById("blood_group_bankA").className = "badge progress-bar-success";

      } else if (res2 == 2) {
        document.getElementById("blood_group_bankA").innerHTML = "Rejected";
        document.getElementById("blood_group_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("blood_group_bankA").innerHTML = "Unverified";
        document.getElementById("blood_group_bankA").className = "badge progress-bar-primary";

      }
    }).then(function () {
      return contract_instance.get_image_details_by_BankA(id);
    }).then(function (res3) {
      if (res3 == 1) {
        document.getElementById("image_bankA").innerHTML = "Verified";
        document.getElementById("image_bankA").className = "badge progress-bar-success";

      } else if (res3 == 2) {
        document.getElementById("image_bankA").innerHTML = "Rejected";
        document.getElementById("image_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("image_bankA").innerHTML = "Unverified";
        document.getElementById("image_bankA").className = "badge progress-bar-primary";

      }
    }).then(function () {

      return contract_instance.get_documents_details_by_BankA(id);
    }).then(function (res4) {
      if (res4[0] == 1) {
        document.getElementById("document1_bankA").innerHTML = "Verified";
        document.getElementById("document1_bankA").className = "badge progress-bar-success";

      } else if (res4[0] == 2) {
        document.getElementById("document1_bankA").innerHTML = "Rejected";
        document.getElementById("document1_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("document1_bankA").innerHTML = "Unverified";
        document.getElementById("document1_bankA").className = "badge progress-bar-primary";

      }

      if (res4[1] == 1) {
        document.getElementById("document2_bankA").innerHTML = "Verified";
        document.getElementById("document2_bankA").className = "badge progress-bar-success";

      } else if (res4[1] == 2) {
        document.getElementById("document2_bankA").innerHTML = "Rejected";
        document.getElementById("document2_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("document2_bankA").innerHTML = "Unverified";
        document.getElementById("document2_bankA").className = "badge progress-bar-primary";

      }

      if (res4[2] == 1) {
        document.getElementById("document3_bankA").innerHTML = "Verified";
        document.getElementById("document3_bankA").className = "badge progress-bar-success";

      } else if (res4[2] == 2) {
        document.getElementById("document3_bankA").innerHTML = "Rejected";
        document.getElementById("document3_bankA").className = "badge progress-bar-danger";

      } else {
        document.getElementById("document3_bankA").innerHTML = "Unverified";
        document.getElementById("document3_bankA").className = "badge progress-bar-primary";

      }
    });

  },





};

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));
  }
  App.start();


});
