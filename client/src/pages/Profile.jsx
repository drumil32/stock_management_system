import { Navigate } from 'react-router-dom';
import ShowBoughtStocks from "./ShowBoughtStocks";
import React, { useEffect, useState } from 'react';

const Profile = (props) => {

    const [currentMoney, setCurrentMoney] = useState(0);
    const [invesetedMoney, setInvesetedMoney] = useState(0);

    useEffect(() => {

        let temp = 0, temp1 = 0;
        props.userDetails.boughtStock.forEach((stock) => {
            temp += stock.quantity * stock.price;

            let ind = props.stockData.findIndex((s) => { return (s.name === stock.name) });

            temp1 += props.stockData[ind].price * stock.quantity;
        });

        setInvesetedMoney(temp);
        setCurrentMoney(temp1);

    }, []);

    if (undefined === props.cookies.token) {
        window.alert(`please login first`);
        return <Navigate to='/Home' />;
    } else {

        return (
            <>
                <table className="table table-dark">

                    <thead>
                        <tr>
                            <th scope="col">Money In Your Account</th>
                            <th scope="col">Invested Money</th>
                            <th scope="col">Current Money</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><h4 style={{ display: 'inline' }}>{Math.round(props.userDetails.money * 100) / 100}$</h4></td>
                            <td><h4 style={{ display: 'inline' }}>{Math.round(invesetedMoney*100)/100}$</h4></td>
                            <td><h4 style={{ display: 'inline' }}>{Math.round(currentMoney*100)/100}$</h4></td>
                        </tr>
                    </tbody>
                </table>

                <div>

                    <table className="table table-dark">

                        <thead>
                            <tr>
                                <th colSpan="9" scope="col" style={{ fontSize: `30px`, textAlign: 'center' }}>Your Bought Stock</th>
                            </tr>
                            <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Buy Price</th>
                                <th scope="col">Current Price</th>
                                <th scope="col">Profit</th>
                                <th scope="col">Quntity</th>
                                <th scope="col">Sell</th>
                                <th scope="col">sepcify quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.userDetails.boughtStock.map((stock, id) => {
                                return <ShowBoughtStocks key={id} userDetails={props.userDetails} stockData={props.stockData} stock={stock} setUserDetails={props.setUserDetails} setInvesetedMoney={setInvesetedMoney} setCurrentMoney={setCurrentMoney} />
                                // i put previous part at the end if you want some idea
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table table-dark">

                        <thead>
                            <tr>
                                <th colSpan="8" scope="col" style={{ fontSize: `30px`, textAlign: 'center' }}>Your Sold Stock</th>
                            </tr>
                            <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Buy Date</th>
                                <th scope="col">Buy Price</th>
                                <th scope="col">Sell Date</th>
                                <th scope="col">Sell Price</th>
                                <th scope="col">Profit</th>
                                <th scope="col">Quntity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.userDetails.soldStock.map((stock, id) => {
                                return <tr key={id}>
                                    <td>{stock.name}</td>
                                    <td>{stock.buyDate}</td>
                                    <td>  <h4 style={{ display: 'inline' }}> {stock.buyPrice} $</h4></td>
                                    <td>{stock.sellDate}</td>
                                    <td>  <h4 style={{ display: 'inline' }}> {stock.sellPrice} $</h4></td>
                                    <td> <h4 style={{ display: 'inline' }}>{Math.round(((stock.sellPrice - stock.buyPrice) * stock.quantity) * 100) / 100}$</h4></td>
                                    <td><h4 style={{ display: 'inline' }}>{stock.quantity}</h4></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );

    }

}


export default Profile;



// let currentPrice = stockDetails[stockDetails.findIndex((s) => s.name === stock.name)].price;
                                // return (
                                //     <p key={id} id={id}>
                                //         {stock.name} {stock.price} {currentPrice} {currentPrice - stock.price}
                                //         <button onClick={() => {
                                //             let ind = userDetails.boughtStock.findIndex((s) => { return (s.name === stock.name) });


                                //             let temp = { ...userDetails.boughtStock[ind] };
                                //             temp.buyPrice = temp.price;
                                //             delete temp.price;
                                //             userDetails.boughtStock.splice(ind, 1);
                                //             ind = stockDetails.findIndex((s) => s.name === temp.name);
                                //             temp.sellPrice = stockDetails[ind].price;
                                //             userDetails.money += temp.sellPrice;
                                //             userDetails.soldStock.push(temp);
                                //             reactLocalStorage.setObject('userDetails', {...userDetails});
                                //             props.setLoadIt([]);
                                //         }}>sell</button>
                                //     </p>
                                // )