const URL = process.env.REACT_APP_API_SERVER_URL;
const IAMPORT = process.env.REACT_APP_IAMPORT;

async function requestPayment({ albumInfo, amount, userInfo }) {
  const IMP = window.IMP;
  IMP.init(IAMPORT);

  const { email, name } = userInfo;
  const { title, _id: albumId } = albumInfo;

  try {
    IMP.request_pay({
      pg: "kakaopay",
      pay_method: "kakaopay",
      merchant_uid: albumId + new Date().getTime(),
      name: title,
      amount: amount,
      buyer_email: email,
      buyer_name: name,
    }, async function (rsp) {
      if (rsp.success) {
        const amountToBePaid = amount;
        const { imp_uid, merchant_uid } = rsp;

        const res = await fetch(`${URL}/musics/payment/${merchant_uid}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ imp_uid, amountToBePaid, albumId }),
        });

        const result = await res.json();

        console.log(result);
      } else {
        console.log("fail");
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export default requestPayment;
