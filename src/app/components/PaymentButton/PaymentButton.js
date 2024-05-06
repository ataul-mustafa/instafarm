
import axios from "axios"
import { load } from '@cashfreepayments/cashfree-js'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { globalContext } from "@/Context API/ContextProvider";


function PaymentButton({ checkoutData }) {
    const router = useRouter()

    const { userData, setLoading, setCartData } = useContext(globalContext);

    let initializeSDK = async function () {
        const cashfree = await load({
            mode: "sandbox",
        });
        return cashfree;
    };

    // const cashfreePromise = initializeSDK();



    const getSessionId = async (orderData) => {
        try {
            console.log(orderData)
            let { data } = await axios.post("/api/order/payment", {orderData})
            console.log(data)
            const returnData = {
                sessionId: '',
                order_id: ''
            }
            if (data.payment_session_id && data.order_id) {

                console.log(data)
                returnData.order_id = data.order_id
                returnData.sessionId = data.payment_session_id;
            }

            return returnData;

        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error)
        }
    }

    const verifyPayment = async (orderId) => {
        try {

            let res = await axios.post("/api/order/verify", {
                orderId
            })

            if (res && res.data) {
                toast.success("payment verified");
                router.push('/order-success')
            }

        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error)
        }
    }

    const handleClick = async (e) => {
        setLoading(true)
        try {
            const orderData = {
                // orderId: cartData[0]._id,
                cartData: checkoutData.products,
                orderAmount: checkoutData.totalAmount, 
                customerName: userData.name,
                customerEmail: userData.email,
                customerPhone: checkoutData.phone,
                orderNote: checkoutData.deliveryAdd
              };


            if (!checkoutData.deliveryAdd || !checkoutData.phone) {
                toast.error('Delivery address or Phone no. missing');
            } else {
                const cashfree = await initializeSDK();
                const { sessionId, order_id } = await getSessionId(orderData);

                if (sessionId && order_id) {
                    const checkoutOptions = {
                        paymentSessionId: sessionId,
                        redirectTarget: "_modal",
                    };

                    await cashfree.checkout(checkoutOptions)
                    toast.success("payment success");
                    // router.push('/order-success')

                    // console.log("payment initialized");
                    // verifyPayment(order_id);

                    const { data } = await axios.post('/api/order', {
                        ...checkoutData
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('jwtToken')
                        }
                    })
                    toast.success(data.message)
                    setCartData([])
                    router.push('/order-success')
                } else {
                    // Handle case when sessionId or order_id is missing
                    console.error("Session ID or order ID is missing");
                }
            }
        } catch (error) {
            console.error("Error in handleClick:", error);
        }

        setLoading(false)

    };

    return (
        <>
            <button onClick={handleClick}>
                Order and Pay now
            </button>
        </>
    )
}

export default PaymentButton
