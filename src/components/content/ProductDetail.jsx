import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../context/products/productContext';
import {useHistory} from 'react-router-dom';


const ProductDetail = (props) => {

    const productContext = useContext(ProductContext);
    const {addToCart, getProduct} = productContext;

    const [product, setProduct] = useState([]);

    const history = useHistory();

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if(props.match.params.id){
            async function fetchData() {
                const response = await getProduct(props.match.params.id);
                setProduct([response.data]);
              }
            fetchData();
        }
        //eslint-disable-next-line
    }, [props.match.params.id])

    const redirectToCart = (product, quantity = 1) => {
        addToCart(product, quantity);
        history.push('/cart');
    }

    return (
        <>
        {
            product.map(item => (
                <div className="product-detail" key={item.id}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10">
                                <div className="product-detail-top">
                                    <div className="row align-items-center">
                                        <div className="col-md-5">
                                            <div className="product-slider-single normal-slider">
                                                <img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/${item.src}`}  alt={item.product_name} />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="product-content">
                                                <div className="title"><h2>{item.product_name}</h2></div>
                                                
                                                <div className="price">
                                                    <h4>Price:</h4>
                                                    <p>${item.price}</p>
                                                </div>
                                                <div className="quantity">
                                                    <h4>Quantity:</h4>
                                                    <div className="qty">
                                                        <button className="btn-minus" onClick={() => setQuantity(quantity-1)} disabled={quantity === 1 ? true : false}><i className="fa fa-minus"></i></button>
                                                        <input type="text" value={quantity} disabled />
                                                        <button className="btn-plus" onClick={() => setQuantity(quantity+1)}><i className="fa fa-plus"></i></button>
                                                    </div>
                                                </div>
                                                <div className="p-size">
                                                    <h4>Size:</h4>
                                                    <div className="btn-group btn-group-sm">
                                                        <button type="button" className="btn">S</button>
                                                        <button type="button" className="btn">M</button>
                                                        <button type="button" className="btn">L</button>
                                                        <button type="button" className="btn">XL</button>
                                                    </div> 
                                                </div>
                                                <div className="p-color">
                                                    <h4>Color:</h4>
                                                    <div className="btn-group btn-group-sm">
                                                        <button type="button" className="btn">White</button>
                                                        <button type="button" className="btn">Black</button>
                                                        <button type="button" className="btn">Blue</button>
                                                    </div> 
                                                </div>
                                                <div className="action">
                                                    <button className="btn" onClick={() => redirectToCart(item, quantity)}><i className="fa fa-shopping-cart"></i>Add to Cart</button>
                                                    <button className="btn" onClick={() => redirectToCart(item)}><i className="fa fa-shopping-bag"></i>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row product-detail-bottom">
                                    <div className="col-lg-12">
                                        <ul className="nav nav-pills nav-justified">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" href="#specification">Specification</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" href="#reviews">Reviews</a>
                                            </li>
                                        </ul>
        
                                        <div className="tab-content">
                                            <div id="description" className="container tab-pane active">
                                                <h4>Product description</h4>
                                                <p>
                                                   {item.description}
                                                </p>
                                            </div>
                                            <div id="specification" className="container tab-pane fade">
                                                <h4>Product specification</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
        </>
    )
}

export default ProductDetail
