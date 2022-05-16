import React from "react";

class RegisterFD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_no: "",
            total_amount: 0,
            interest_rate: 0,
            start_date: "",
            maturity_date: "",
            maturity_amount: 0,
            ip_frequency: "",
            token: JSON.parse(localStorage.getItem("token")),
            accountData:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}portfolio/bank-accounts/`, {
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
        }
        ).catch(err => {
            console.log(err);
        }
        )
    }
    onMOunt() {
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
            total_amount: this.state.total_amount,
            interest_rate: this.state.interest_rate,
            start_date: this.state.start_date,
            maturity_date: this.state.maturity_date,
            maturity_amount: this.state.maturity_amount,
            ip_frequency: this.state.ip_frequency
        }
        console.log(data);
        fetch(`${process.env.REACT_APP_API_URL}portfolio/register-fd-trade/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then ( function(response) {
                if (response.status === 200) {
                    alert("FD Registered Successfully");
                    this.setState({
                        account_no: "",
                        total_amount: 0,
                        interest_rate: 0,
                        start_date: "",
                        maturity_date: "",
                        maturity_amount: 0,
                        ip_frequency: ""
                    })
                } else if (response.status === 201) {
                    alert("FD Registered Successfully");
                } else  {
                    alert("FD Registered Failed");
                }
            }
        )
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
                <h1>Register FD</h1>
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
                        <label>Total Amount:</label>
                        <input type="number" className="form-control" name="total_amount" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Interest Rate:</label>
                        <input type="number" step="0.01" className="form-control" name="interest_rate" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input type="date" className="form-control" name="start_date" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Maturity Date:</label>
                        <input type="date" className="form-control" name="maturity_date" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Maturity Amount:</label>
                        <input type="number" className="form-control" name="maturity_amount" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>IP Frequency:</label>
                        <select name="ip_frequency" className="form-control" onChange={this.handleChange}>
                            <option value="">Select IP Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="HalfYearly">Half Yearly</option>
                            <option value="Yearly">Yearly</option>
                            <option value="Maturity">Maturity</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default RegisterFD;

