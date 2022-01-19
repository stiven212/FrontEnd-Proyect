import {ajax} from "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

export default function producto1 () {
         var parametros = {
             amount: "512",
            //  amountWithoutTax: "500000",
            amountWithTax:"500",
            Tax: '12',
            email: 'stiven.lopez@gmail.com',
             clientTransactionId: "Pruebasx00",
            responseUrl: "http://127.0.0.1:5500/aprobado.html",
            cancellationUrl: "http://127.0.0.1:5500/cancel.html"
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
                 document.getElementById('status').innerHTML = respuesta.responseJSON.message;

             }
         });


    }


{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}


