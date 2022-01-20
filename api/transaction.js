import $ from "jquery";


export default function PayPhone () {
         var parametros = {
             amount: 5120.00,
            //  amountWithoutTax: "500000",
            amountWithTax:5000.00,
            Tax: 120.00,
            email: 'stiven.lopez@gmail.com',
             clientTransactionId: "Pruebasx0077",
            responseUrl: "http://127.0.0.1:3000/transaction",
            cancellationUrl: "http://127.0.0.1:3000/transaction"
         };

         $.ajax({
             data:parametros,
             url: 'https://pay.payphonetodoesposible.com/api/button/Prepare',
             type: 'POST',
             beforeSend: function(xhr){
                 xhr.setRequestHeader ('Authorization', 'Bearer PsOS72uS_xCQdtX5eRPZR_dSq527d3pUUfqnRVEZdM6SYQa_aXNXjfpBvw5sMM22E8QPgy3qqF2Q15n2ldKgYB5zE88QcddpFbPkWzhCW2-_N6LClXxQm91U7wNLuhNBWb4--O-denfvSe-zyeHCkG00Ps9lN983tyAbF52EZnujkUp2Mpz4QNZpFKeHGz6BH0Nk3sp5uXUDs5gYWFXFfUzBViIowmSUEqx3Q3vyPxXNcdcoX1t3Jtssk38oeQKuzMjpQeYijqskQRheQAPw_K2Nh648Kk3Rt1xUDdeKURM52t3iTH-IVxXWcqNAbr5ukPaveQ')
             },

             success: function SolicitarPago(respuesta){
                 location.href = respuesta.payWithCard;
             }, error: function(respuesta){
                 alert("Error en la llamada "+ respuesta.responseJSON.message);
                 console.log(respuesta)
                // document.getElementById('status').innerHTML = respuesta.responseJSON.message;

             }
         });


    }


{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}

