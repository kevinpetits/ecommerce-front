import React, { useContext, useEffect } from 'react';
import ProductContext from '../../context/products/productContext';
import {Link} from 'react-router-dom';

const Cart = () => {

    const productContext = useContext(ProductContext);
    const {cart, totalQuantity, subtotal, reduceQty, removeFromCart, getSubTotal, addToCart, cleanCart} = productContext;

    useEffect(() => {
        getSubTotal();
        //eslint-disable-next-line
    }, [totalQuantity]);

    return (
        <div className="cart-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="cart-page-inner">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        {
                                            cart.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="img">
                                                        <Link to={`/product/${item.id}`}><img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/${item.associatedModel.src}`} alt={item.name} />
                                                        <p>{item.name}</p></Link>
                                                    </div>
                                                </td>
                                                <td>${item.price}</td>
                                                <td>
                                                    <div className="qty">
                                                        <button className="btn-minus" onClick={() => reduceQty(item.id)}><i className="fa fa-minus"></i></button>
                                                        <input type="text" value={item.quantity} disabled />
                                                        <button className="btn-plus" onClick={() => addToCart(item)}><i className="fa fa-plus"></i></button>
                                                    </div>
                                                </td>
                                                <td>${(Math.round((item.price * item.quantity) * 100) / 100).toFixed(2)}</td>
                                                <td><button onClick={() => removeFromCart(item.id)}><i className="fa fa-trash"></i></button></td>
                                            </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cart-page-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="cart-summary">
                                    <button className="btn-clear-cart" onClick={() => cleanCart()}>Remove all items<i className="fa fa-trash" style={{marginLeft: "5px"}}></i></button>
                                        <div className="cart-content">
                                            <h1>Cart Summary</h1>
                                            <p>Sub Total<span>${(Math.round(subtotal * 100) / 100).toFixed(2)}</span></p>
                                            <p>Shipping Cost<span>$1</span></p>
                                            <h2>Grand Total<span>${(Math.round((subtotal + 1) * 100) / 100).toFixed(2)}</span></h2>
                                        </div>
                                        <div className="cart-btn">
                                            <Link to="/checkout"><button>Checkout</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
