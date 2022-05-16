import React from "react";

class RegisterBondTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_no: "",
            name: "",
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
            name: this.state.name,
            quantity: this.state.quantity,
            price: this.state.price,
            trade_date: this.state.trade_date,
            trade_type: this.state.trade_type
        }
        console.log(data);
        fetch(`${process.env.REACT_APP_API_URL}portfolio/register-bond-trade/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            },
            body: JSON.stringify(data)
        }).then( function(response) {
            if (response.status === 200) {
                alert("success");
            } else if (response.status === 201) {
                alert("success");
            } else {
                alert("fail");
            }

        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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
                <h1>Register Bond Trade</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Account No:</label>

                        <select  name="account_no" >
                        <option value="">Select Account No</option>
                        {this.state.accountData.map((account, index) => {
                                return (
                                    <option key={index} value={account.account_no} onClick={this.assignAccountNo}>{account.account_no}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input type="text" className="form-control" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Trade Date:</label>
                        <input type="date" className="form-control" name="trade_date" value={this.state.trade_date} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Trade Type:</label>
                        <select className="form-control" name="trade_type" onChange={this.handleChange}>
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default RegisterBondTrade;