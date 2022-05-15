import React from "react";
import useToken from "../../useToken";

class RegisterStockTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_no: "",
            symbol: "",
            quantity: "",
            price: "",
            trade_date: "",
            trade_type:"BUY",
            token: JSON.parse(localStorage.getItem("token")),
            accountData:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}portfolio/demat-accounts/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                accountData: data
            })
        })
    }

    onMount() {
        const { token } = this.state;
        if (!token) {
            this.props.history.push("/login");
        }

        

    }
    handleSubmit(e) {
        e.preventDefault();
        const { token } = this.state;
  
        const data = {
            account_no: this.state.account_no,
            symbol: this.state.symbol,
            quantity: this.state.quantity,
            price: this.state.price,
            trade_date: this.state.trade_date,
            trade_type: this.state.trade_type
        }
        fetch(`${process.env.REACT_APP_API_URL}portfolio/register-stock-trade/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then ( function(response) {
            if (response.status === 201) {
                alert("Trade Registered Successfully");
            } else if (response.status === 200) {
                alert("Trade Registration Successful");
            } 
            else {
                alert("Trade Registration Failed");
            }
        }
        )
    }
    handleChange = e => {
        console.log(e.target.value, e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    assignAccountNo = (e) => {
        console.log(e.target.value);
        this.setState({
            account_no: e.target.value
        })
    }
    render() {
        return (
            <div>
                <h1>Register Stock Trade</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Account Number</p>
                        <select name="account_no">
                            <option value="">Select Account No</option>
                            {this.state.accountData.map((account, index) => {
                                return (
                                    <option key={index} value={account.account_no} onClick={this.assignAccountNo}>{account.account_no}</option>
                                )
                            })}
                        </select>
                    </label>
                    <label>
                        <p>Symbol</p>
                        <input type="text" name="symbol" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>Quantity</p>
                        <input type="text" name="quantity" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>Price</p>
                        <input type="text" name="price" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>Trade Date</p>
                        <input type="text" name="trade_date" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>TRADE TYPE</p>
                        <select name="trade_type" onChange={this.handleChange}>
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                        </select>
                    </label>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        )
    }
        
}
export default RegisterStockTrade;