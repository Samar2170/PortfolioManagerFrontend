import React from "react";
import useToken from "../../useToken";

class RegisterBA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_no: "",
            bank_name: "",
            bank_code: "",
            balance: "",

            token: JSON.parse(localStorage.getItem("token"))
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            bank_name: this.state.bank_name,
            bank_code: this.state.bank_code,
            balance: this.state.balance

        }
        fetch(`${process.env.REACT_APP_API_URL}portfolio/bank-accounts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then ( function(response) {
            if (response.status === 201) {
                alert("Account Created Successfully");
            }else if (response.status === 200) {
                alert("Account Creation Successful");
            }  else {
                alert("Account Creation Failed");
            }
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>Register Bank Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Account Number</p>
                        <input type="text" name="account_no" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>Bank Name</p>
                        <input type="text" name="bank_name" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>Bank Code</p>
                        <input type="text" name="bank_code" onChange={this.handleChange} />
                    </label>
                    <label>
                        <p>Balance</p>
                        <input type="text" name="balance" onChange={this.handleChange} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                        </div>
                </form>

            </div>
        )
    }
}
export default RegisterBA;