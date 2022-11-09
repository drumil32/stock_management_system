import React, { useState } from "react";

const Stock = (props) => {
    const [quantity, setQuantity] = useState(0);

    function helper() {
        if (0 === quantity) return;
        let userDetails = {...props.userDetails};
        if (userDetails.money >= props.price * quantity) {
            userDetails.money -= props.price * quantity;
            window.alert(`you successfully bought ${props.name} with price ${props.price} and quantity is ${quantity}`);
            
            userDetails.boughtStock.push({ name: props.name, price: props.price, quantity: quantity,buyDate:new Date().toLocaleDateString() });
            console.log(userDetails.boughtStock);
            props.setUserDetails(userDetails);
        } else {
            window.alert(`you doesn't have enough money to buy ${props.name} stock`);
        }
        setQuantity(0);
    }
    const increamentQuantity = () => { setQuantity(quantity => quantity + 1); }
    const decreamentQuantity = () => { setQuantity(quantity => quantity > 0 ? quantity - 1 : 0); }

    return (
        <tr>
            <td>{props.name}</td>
            <td>  <h4 style={{display: 'inline'}}> {props.price} $</h4></td>
            {props.cookies.hasOwnProperty('token') && <td><button onClick={helper}>Buy</button></td>}
            {props.cookies.hasOwnProperty('token') &&
                <td>
                    <div className="w3-show-inline-block">
                        <div className="w3-bar">
                            <button className="w3-btn w3-black" onClick={increamentQuantity}>+</button>
                            <button className="w3-btn w3-teal" style={{ cursor: "default" }}>{quantity}</button>
                            <button className="w3-btn w3-border" onClick={decreamentQuantity}>-</button>
                        </div>
                    </div>
                </td>
            }
        </tr>
    );
}
export default Stock;