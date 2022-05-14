import React, { useState } from 'react';
import RegisterBA from "./RegisterBA";
import RegisterDA from "./RegisterDA";


export default function RegisterAll(props) {
    const [form, setForm] = useState('BA');

    const handleFormChange = (e) => {
        setForm(e.target.value);
    }
    return (
        <div>
            <h1>Register</h1>
            <div className="register-form">
                <div className="register-form-select">
                    <label>
                        <input type="radio" name="form" value="BA" onChange={handleFormChange} checked={form === 'BA'} />
                        <p>Bank Account</p>
                    </label>
                    <label>
                        <input type="radio" name="form" value="DA" onChange={handleFormChange} checked={form === 'DA'} />
                        <p>Debit Account</p>
                    </label>
                </div>
                {form === 'BA' ? <RegisterBA /> : <RegisterDA />}
            </div>
        </div>
    )
}