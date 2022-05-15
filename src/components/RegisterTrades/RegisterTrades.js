import React , { useState } from "react";
import { useToken } from "../../useToken";
import RegisterStockTrade from "./StockTrades";
import RegisterMFTrade from "./MFTrades";

export default function RegisterAllTrades(props) {
    const [form,setForm] = useState('stock');

    const handleFormChange = (e) => {
        setForm(e.target.value);
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
                    
                </div>
                {form === 'stock' ? <RegisterStockTrade /> : <RegisterMFTrade />}
            </div>
        </div>
    )
}