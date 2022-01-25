import $ from "jquery";

export default function PayPhone(data, value) {
  const cost = value * 100;
  var parametros = {
    amount: cost,
    //amountWithoutTax: cost,
    amountWithTax: cost - cost * 0.12,
    Tax: cost * 0.12,
    clientTransactionId: data,
    //  clientTransactionId: "Pruebasx0077",
    responseUrl: "http://localhost:3000/cart",
    cancellationUrl: "http://localhost:3000/cart",
  };

  $.ajax({
    data: parametros,
    url: "https://pay.payphonetodoesposible.com/api/button/Prepare",
    type: "POST",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer PsOS72uS_xCQdtX5eRPZR_dSq527d3pUUfqnRVEZdM6SYQa_aXNXjfpBvw5sMM22E8QPgy3qqF2Q15n2ldKgYB5zE88QcddpFbPkWzhCW2-_N6LClXxQm91U7wNLuhNBWb4--O-denfvSe-zyeHCkG00Ps9lN983tyAbF52EZnujkUp2Mpz4QNZpFKeHGz6BH0Nk3sp5uXUDs5gYWFXFfUzBViIowmSUEqx3Q3vyPxXNcdcoX1t3Jtssk38oeQKuzMjpQeYijqskQRheQAPw_K2Nh648Kk3Rt1xUDdeKURM52t3iTH-IVxXWcqNAbr5ukPaveQ"
      );
    },

    success: function SolicitarPago(respuesta) {
      location.href = respuesta.payWithCard;
    },
    error: function (respuesta) {
      alert("Error en la llamada " + respuesta.responseJSON.message);
      // document.getElementById('status').innerHTML = respuesta.responseJSON.message;
    },
  });
}

export function Confirmation(router) {
  const parametros = {
    id: router.query.id,
    clientxId: router.query.clientTransactionId,
  };

  $.ajax({
    data: parametros,
    url: "https://pay.payphonetodoesposible.com/api/button/Confirm",
    type: "POST",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer PsOS72uS_xCQdtX5eRPZR_dSq527d3pUUfqnRVEZdM6SYQa_aXNXjfpBvw5sMM22E8QPgy3qqF2Q15n2ldKgYB5zE88QcddpFbPkWzhCW2-_N6LClXxQm91U7wNLuhNBWb4--O-denfvSe-zyeHCkG00Ps9lN983tyAbF52EZnujkUp2Mpz4QNZpFKeHGz6BH0Nk3sp5uXUDs5gYWFXFfUzBViIowmSUEqx3Q3vyPxXNcdcoX1t3Jtssk38oeQKuzMjpQeYijqskQRheQAPw_K2Nh648Kk3Rt1xUDdeKURM52t3iTH-IVxXWcqNAbr5ukPaveQ"
      );
    },
    success: function Confirmation(respuesta) {
      var estado = respuesta.transactionStatus;
      alert("pago procesado");
    },
    error: function (respuesta) {
      alert("Error en la llamada " + respuesta);
    },
  });
}
