import Stock from './Stock';

const Stocks = (props) => {

    return (
        <>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Compnay Name</th>
                        <th scope="col">Price</th>
                        {props.cookies.hasOwnProperty('token') && <th scope="col">Quntity</th>}
                        {props.cookies.hasOwnProperty('token') && <th scope="col">Handle</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.stockData.map((stock, id) => {
                        return (
                            <Stock name={stock.name} price={stock.price} cookies={props.cookies} key={id} id={id} handleSetCookie={props.handleSetCookie} userDetails={props.userDetails} setUserDetails={props.setUserDetails} />
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
export default Stocks;