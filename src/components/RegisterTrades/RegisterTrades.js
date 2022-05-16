import React , { useState } from "react";
import { useToken } from "../../useToken";
import RegisterStockTrade from "./StockTrades";
import RegisterMFTrade from "./MFTrades";
import RegisterBondTrade from "./BondTrades";
import RegisterFD from "./FD";


export default function RegisterAllTrades(props) {
    const [form,setForm] = useState('stock');

    const handleFormChange = (e) => {
        setForm(e.target.value);
    }
    const renderForm = () => {
        if(form === 'stock'){
            return <RegisterStockTrade />
        } else if(form === 'mf'){
            return <RegisterMFTrade />
        } else if (form === 'bond') {
            return <RegisterBondTrade />
        } else if (form === 'fd') {
            return <RegisterFD />
        }
    }

    return (
        <div>
            <h1>Register Trades</h1>
            <div className="register-trade-form">
                <div className="register-trade-form-select">
                    <label>
                        <input type="radio" name="form" value="stock" onChange={handleFormChange} checked={form === 'stock'} />
                        <p>Stock</p>
                    </label>
                    <label>
                        <input type="radio" name="form" value="mf" onChange={handleFormChange} checked={form === 'mf'} />
                        <p>MF</p>
                    </label>
                    <label>
                        <input type="radio" name="form" value="bond" onChange={handleFormChange} checked={form === 'bond'} />
                        <p>Bond</p>
                    </label>
                    <label>
                        <input type="radio" name="form" value="fd" onChange={handleFormChange} checked={form === 'fd'} />
                        <p>FD</p>
                    </label>


                </div>
                {/* {form === 'stock' ? <RegisterStockTrade /> : <RegisterMFTrade />} */}
                {
                    renderForm()                
                }
            </div>
        </div>
    )
}