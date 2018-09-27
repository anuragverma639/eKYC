// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import "bootstrap/dist/css/bootstrap.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import robustKYC_Customer from '../../build/contracts/robustKYC_Customer.json'

// Robust KYC is our usable abstraction, which we'll use through the code below.
var RobustKYC = contract(robustKYC_Customer);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var image_hash = "";
var document1_hash = "";

var document2_hash = "";

var document3_hash = "";

window.App = {
  start: function () {
    var self = this;

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

  customer_details: function () {
    var id = parseInt(document.getElementById("customer_id").innerHTML);
    var contract_instance;
    RobustKYC.deployed().then(function (instance) {
      contract_instance = instance;
      return contract_instance.getDetails(id);

    }).then(function (res) {
      console.log(res);
      console.log(web3.toUtf8(res[1]));
      var str = web3.toUtf8(res[1]);
      console.log(str);
      document.getElementById("name").value = str;
      document.getElementById("email").value = web3.toUtf8(res[2]);
      if(res[3]!=0)
      document.getElementById("phone_no").value = (res[3]);
      
      document.getElementById("address").value = web3.toUtf8(res[4]);

    }).then(function () {
      return contract_instance.getOtherDetails(id);
    }).then(function (res2) {

      console.log(res2[1]);
      document.getElementById("blood_group").value = web3.toUtf8(res2[1]);

    }).then(function () {
      return contract_instance.getImage(id);
    }).then(function (res3) {

      console.log(res3[1]);
      var str = web3.toUtf8(res3[1]) + web3.toUtf8(res3[2]);
      image_hash=str;
      let url = `https://ipfs.io/ipfs/${str}`
      console.log(`Url --> ${url}`)
      document.getElementById("url").href = url
      document.getElementById("output").src = url

      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
    }).then(function () {
      return contract_instance.getDocuments(id);
    }).then(function (res3) {

      console.log(res3);
      var str1 = web3.toUtf8(res3[1]) + web3.toUtf8(res3[2]);
      var str2 = web3.toUtf8(res3[3]) + web3.toUtf8(res3[4]);
      var str3 = web3.toUtf8(res3[5]) + web3.toUtf8(res3[6]);
    
      document1_hash=str1;
      document2_hash=str2;
      document3_hash=str3;
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

  addDetails: function () {
    var contract_instance;
    document.getElementById("loading").removeAttribute("hidden");
    document.getElementById("add_details_button").setAttribute("disabled", "disabled");
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone_no = document.getElementById("phone_no").value;
    var address = document.getElementById("address").value;
    var blood_group = document.getElementById("blood_group").value;
    var id = parseInt(document.getElementById("customer_id").innerHTML);
    var image_full = image_hash;
    var first_half_image = image_full.substr(0, 23);
    var second_half_image = image_full.substr(23);
    var document1_full=document1_hash;
    var first_half_document1=document1_full.substr(0,23);
    var second_half_document1=document1_full.substr(23);
    var document2_full=document2_hash;
    var first_half_document2=document2_full.substr(0,23);
    var second_half_document2=document2_full.substr(23);
    var document3_full=document3_hash;
    var first_half_document3=document3_full.substr(0,23);
    var second_half_document3=document3_full.substr(23);

    RobustKYC.deployed().then(function (instance) {
      contract_instance = instance;
      return contract_instance.add_Details(id, name, email, phone_no, address, blood_group, first_half_image, second_half_image, { from: account, gas: 1000000 });
    }).then(function (result) {
      console.log(result);
      
    }).then(function () {
      return contract_instance.add_documents(id,first_half_document1,second_half_document1,first_half_document2,second_half_document2,first_half_document3,second_half_document3,{from : account, gas:1000000});

    }).then(function(res){
      console.log(res);
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");
      document.getElementById("success_add").removeAttribute("hidden");
    });

  },

  updateDetails: function () {
    document.getElementById("loading").removeAttribute("hidden");
    document.getElementById("update_details_button").setAttribute("disabled", "disabled");

    var contract_instance;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone_no = document.getElementById("phone_no").value;
    var address = document.getElementById("address").value;
    var id = parseInt(document.getElementById("customer_id").innerHTML);
    var blood_group = document.getElementById("blood_group").value;
    var image_full = image_hash;
    console.log(image_full);
    var first_half_image = image_full.substr(0, 23);
    var second_half_image = image_full.substr(23);
    var document1_full=document1_hash;
    var first_half_document1=document1_full.substr(0,23);
    var second_half_document1=document1_full.substr(23);
    var document2_full=document2_hash;
    var first_half_document2=document2_full.substr(0,23);
    var second_half_document2=document2_full.substr(23);
    var document3_full=document3_hash;
    var first_half_document3=document3_full.substr(0,23);
    var second_half_document3=document3_full.substr(23);


    RobustKYC.deployed().then(function (instance) {
      contract_instance = instance;
      return contract_instance.update_Details(id, name, email, phone_no, address, blood_group, first_half_image, second_half_image, { from: account, gas: 1000000 });
    }).then(function (result) {
      console.log(result);
     
    }).then(function () {
     
      return contract_instance.update_documents(id,first_half_document1,second_half_document1,first_half_document2,second_half_document2,first_half_document3,second_half_document3,{from : account, gas:1000000});

    }).then(function (res) {
      console.log(res);
      
      App.customer_details();
      App.refreshBankAStatus(id);
      App.refreshBankBStatus(id);
      document.getElementById("loading").setAttribute("hidden", "hidden");
      document.getElementById("success_update").removeAttribute("hidden");
      document.getElementById("update_details_button").removeAttribute("disabled");


    });
  },

  upload: function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
        document.getElementById("url").href = url
        document.getElementById("output").src = url
        image_hash = result[0].hash;
      })
    }
    const photo = document.getElementById("photo");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File

  },

  uploadDocument1: function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
        document.getElementById("url_document1").href = url
        document.getElementById("output_document1").src = url
        document1_hash = result[0].hash;
      })
    }
    const photo = document.getElementById("document1");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File

  },
  uploadDocument2: function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
        document.getElementById("url_document2").href = url
        document.getElementById("output_document2").src = url
        document2_hash = result[0].hash;
      })
    }
    const photo = document.getElementById("document2");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File

  },
  uploadDocument3: function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
        document.getElementById("url_document3").href = url
        document.getElementById("output_document3").src = url
        document3_hash = result[0].hash;
      })
    }
    const photo = document.getElementById("document3");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File

  },

  login: function (type) {
    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    const url = "http://beta.aetlo.com/api/v1/claim_managers/sign_up";

    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        localStorage.setItem('customer_id', data.id);
        console.log(data);
        location.replace('/' + type + '.html')
      })

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
  if (document.getElementById("customer_id")) {
    document.getElementById("customer_id").innerHTML = localStorage.getItem('customer_id');
    App.customer_details();
  }

});
