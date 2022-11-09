import React, { useState } from 'react';

const ShowBoughtStocks = (props) => {
    const stock = props.stock;
    const userDetails = { ...props.userDetails };

    let currentPrice = props.stockData[props.stockData.findIndex((s) => s.name === stock.name)].price;

    let ind = userDetails.boughtStock.findIndex((s) => { return (s.name === stock.name) });

    const sellHandler = () => {
        if (0 === quantity) return;
        let temp = { ...userDetails.boughtStock[ind] };
        console.log(temp);
        temp.buyPrice = temp.price;
        delete temp.price;
        if (quantity === userDetails.boughtStock[ind].quantity)
            userDetails.boughtStock.splice(ind, 1);
        else
            userDetails.boughtStock[ind].quantity -= quantity;
        ind = props.stockData.findIndex((s) => s.name === temp.name);
        temp.sellPrice = props.stockData[ind].price;
        temp.quantity = quantity;
        temp.sellDate = new Date().toLocaleDateString();
        userDetails.money += temp.sellPrice * temp.quantity;

        userDetails.soldStock.push(temp);

        props.setInvesetedMoney(prevValue => prevValue - stock.price * temp.quantity);
        props.setUserDetails(userDetails);

        setQuantity(0);
    }
    const [quantity, setQuantity] = useState(0);
    const increamentQuantity = () => { setQuantity(quantity => userDetails.boughtStock[ind].quantity > quantity ? quantity + 1 : quantity); }
    const decreamentQuantity = () => { setQuantity(quantity => quantity > 0 ? quantity - 1 : 0); }

    return (
        <tr>
            <td>{stock.name}</td>
            <td>{stock.buyDate}</td>
            <td><h4 style={{ display: 'inline' }}>{stock.price}$</h4></td>
            <td><h4 style={{ display: 'inline' }}>{currentPrice}$</h4></td>
            <td><h4 style={{ display: 'inline' }}>{Math.round((currentPrice - stock.price) * (stock.quantity)*100)/100}$</h4></td>
            <td><h4 style={{ display: 'inline' }}>{stock.quantity}</h4></td>
            <td><button onClick={sellHandler}>sell</button></td>
            <td>
                <div className="w3-show-inline-block">
                    <div className="w3-bar">
                        <button className="w3-btn w3-black" onClick={increamentQuantity}>+</button>
                        <button className="w3-btn w3-teal" style={{ cursor: "default" }}>{quantity}</button>
                        <button className="w3-btn w3-border" onClick={decreamentQuantity}>-</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ShowBoughtStocks;