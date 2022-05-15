import React, { useState, useEffect } from 'react';
import useToken from '../../useToken';

export default function StockHoldings(props) {
    const [data,setData] = useState([]);
    const view = props.view;
    const token = JSON.parse(localStorage.getItem("token"));    
    const getSubUrl = () => {
        if (view === 'stock') {
            return 'portfolio/stock-holdings/';
        } else if (view === 'mf') {
            return 'portfolio/mf-holdings/';
        } else {
            return 'portfolio/mf-holdings/';
        }

    }
    useEffect(() => {
        console.log(token);
        fetch(`${process.env.REACT_APP_API_URL}${getSubUrl()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.json()).then(
            data => {
                console.log(data);
                setData(data);
            })
    },[])

    return (
        <div>
            <h1>Stock Holdings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item => (
                        <tr key={item.id}>
                            <td>{item.security.company_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.buy_price}</td>
                            <td>{item.total_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

