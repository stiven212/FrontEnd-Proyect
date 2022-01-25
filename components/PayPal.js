import React, { useRef, useEffect, useState } from "react";

export default function Paypal(props) {
  const { totalPrice, setcheckout } = props;
  const paypal = useRef();

  const [valueToPay, setvalueToPay] = useState(0);

  console.log("valueToPay", valueToPay);
  // console.log('valueToPay', valueToPay);

  // XD
  // XD

  useEffect(() => {
    setvalueToPay(totalPrice);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table x7",
                amount: {
                  currency_code: "USD",
                  value: valueToPay,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          setcheckout(false);
        },
        onCancel: async (data) => {
          console.log(data);
          setcheckout(false);
        },
        onError: (err) => {
          console.log(err);
          setcheckout(false);
        },
      })
      .render(paypal.current);
  }, [totalPrice, valueToPay]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
