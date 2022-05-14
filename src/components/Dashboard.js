import React from 'react';
import useToken from '../useToken';


export default function Dashboard() {
    const { token, setToken } = useToken();
    return(
        <h2>Dashboard</h2>
    );
}
