import React from 'react'
import './Checkout.css'
// import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from "./StateProvider"
import Upload from './Upload'
import Projects from './Projects'

function Checkout() {
    const [{ basket, user} ] = useStateValue();
    
    return (
        <div className="checkout">
            <div className="checkout_left">
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout_title">Your projects</h2>
                    {basket.map(item => (
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
                <div>
                    <Upload />
                </div>
                <div>
                    <Projects />
                </div>
            </div>
            
            {/* <div className="checkout_right">
                <Subtotal />
                            
            </div> */}
        </div>
    )
}

export default Checkout
