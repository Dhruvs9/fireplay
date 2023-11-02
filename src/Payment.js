import React,{ useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link } from "react-router-dom"
import CurrencyFormat from 'react-currency-format'
// import { loadStripe } from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer'
import axios from './axios'

function Payment() {
    const [{basket, user}, ] = useStateValue();
    // const history = useHistory();

    // const stripe = useStripe();
    // const elements = useElements();

    const[succeded, setSucceded] = useState(false);
    const[processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    // const [clientSecret, setclientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            // setclientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        // const payload = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement)
        //     }
        // }).then(({ paymentIntent }) => {
        //     //payment intent = payment confirmation
        //     setSucceded(true);
        //     setError(null);
        //     setProcessing(false);

        //     history.replaceState('/orders')
        // })

        //const payload = await stripe
    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
                {/* payment delivery address */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 room</p>
                        <p>My home</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review item and Delivery</h3>
                    </div>
                    <div className='payment_items'>
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
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payament_priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                <>
                                <p>
                                    Subtotal ({basket?.length} items): <strong>{value}</strong>
                                </p>
                                <small className="subtotal_gift">
                                    <input type="checkbox" />This order contains a Gift
                                </small>
                                </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeperator={true}
                                prefix={"₹"}
                            />
                            <button disabled={processing || disabled || succeded}>
                                <span>{processing ? <p>processing</p> :
                                "Buy Now"}</span>
                            </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
