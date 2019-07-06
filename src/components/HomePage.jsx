import React, { Component } from "react";
import "./styles/HomePage.css";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Portis from "@portis/web3";
import Web3 from "web3";

const square = { width: 250, height: 250 };

const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);
var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
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
		"name": "INITIAL_SUPPLY",
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
		"name": "decimals",
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
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
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
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "inadd",
				"type": "address"
			},
			{
				"name": "out",
				"type": "address"
			},
			{
				"name": "_val",
				"type": "uint256"
			}
		],
		"name": "approve1",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom1",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
];
var token = new web3.eth.Contract(abi ,'0x36b6885d29545abe0a17b464f3e88b253b77242f');

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet_add: "",
      category: ""
    };
  }

  onHandleClick(text, name) {
    console.log("wallet...............");
    console.log(text);
    this.setState({
      wallet_add: text
    });
    var num;
    var url = "http://localhost:4000/Category/" + text;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        num = response.data.length;
        if (num > 0) {
          name = response.data[0].category;
        }
        this.setState({
          category: name
        });

        if (num == 0) {
          var url = "http://localhost:4000/Category";

          fetch(url, {
            method: "POST", // or 'PUT'
            mode: "cors",
            body: JSON.stringify({
              wallet_address: this.state.wallet_add,
              category: name
            }), // data can be `string` or {object}!
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.body)
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
          if (name === "JobSeeker") {
            this.props.history.push(
              "/JobSeekerRegistration",
              //{},
              [this.state]
            );
          } else {
            this.props.history.push(
              "/CompanyRegistration",
              //{},
              [this.state]
            );
          }
        } else {
          if (name === "JobSeeker") {
            this.props.history.replace(
              "/jobseeker/profile",
              //{},
              [this.state]
            );
          } else {
            this.props.history.replace(
              "/company/profile",
              //{},
              [this.state]
            );
          }
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Container text>
            <Header>
              <h1>Geth-Hired</h1>
              <h2>Sign In as</h2>
            </Header>
          </Container>
          <div className="circles">
            <div className="circle-one">
              <Segment circular style={square}>
                <Header as="h2" icon>
                  <Icon name="user" />
                  <Header.Subheader style={{ fontSize: 18 }}>
                    Looking for jobs?
                  </Header.Subheader>
                  <Button
                    primary
                    type="button"
                    onClick={async () => {
                      var candidateAddress = await portis.provider.enable();
                      var app = await token.methods.approve1('0x27f2186329adB37458685C27E2DeB176ACFbc4f2',String(candidateAddress),1000).send({from:String(candidateAddress)});
                      var trans = await token.methods.transferFrom1('0x27f2186329adB37458685C27E2DeB176ACFbc4f2',String(candidateAddress),1000)
                                                      .send({from:String(candidateAddress)});
                      console.log(app);
                      console.log(trans);                              
                      console.log(candidateAddress[0]);
                      sessionStorage.setItem("LoggedUser", candidateAddress[0]);
                      if (candidateAddress.length > 0) {
                        this.onHandleClick(
                          String(candidateAddress[0]),
                          "JobSeeker"
                        );
                        // this.props.history.push(
                        //   "/JobSeekerRegistration",
                        //   //{},
                        //   [this.state]
                        // );
                      }
                    }}
                  >
                    Job Seeker
                  </Button>
                </Header>
              </Segment>
            </div>
            <div className="circle-two">
              <Segment circular style={square}>
                <Header as="h2" icon>
                  <Icon name="graduation cap" />
                  <Header.Subheader style={{ fontSize: 18 }}>
                    Are you a Validator?
                  </Header.Subheader>
                  <Button
                    primary
                    type="button"
                    onClick={async () => {
                      var companyAddress = await portis.provider.enable();
                      console.log(companyAddress);
                      sessionStorage.setItem("LoggedUser", companyAddress[0]);
                      if (companyAddress.length > 0) {
                        this.onHandleClick(
                          String(companyAddress[0]),
                          "Company"
                        );
                        // withRouter(({ history, location }) =>
                        //   this.props.history.push(
                        //     "/CompanyRegistration",
                        //     location.state
                        //   )
                        // );
                      }
                    }}
                  >
                    Company
                  </Button>
                </Header>
              </Segment>
            </div>
          </div>
        </header>
        <div>
          <AddExtraContent />

          <HeaderFooter />
        </div>
      </div>
    );
  }
}

const AddExtraContent = () => <div className="content">Add Content Here</div>;

const HeaderFooter = () => (
  <div className="footer">
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

export default HomePage;
