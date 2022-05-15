import React from "react";

const NavOptions = {
    Dashboard: {
        path: '/dashboard',
        label: 'Dashboard'
    },
    Preferences: {
        path: '/preferences',
        label: 'Preferences'
    },
    Register : {
        path: '/register',
        label: 'Register'
    },
    RegisterTrades : {
        path:'/register-trades',
        label:'Register Trades'
    },
    StockHoldings : {
        path:'/stock-holdings',
        label:'Stock Holdings'
    },
    MFHoldings : {
        path:'/mf-holdings',
        label:'MF Holdings'
    }
}


const SideNav = (props) => {
    return (
        <div className="  top-0 pb-3 px-3 flex flex-col justify-between h-screen border bg-white transition duration-300 " >
            <ul className="space-y-2 tracking-wide mt-8">
                {Object.keys(NavOptions).map(key => (
                    <li key={key}>
                        <a href={NavOptions[key].path} className="relative flex text-blue-500 items-center hover:text-blue-700">{NavOptions[key].label}</a>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}
export default SideNav;