import { occurError } from "../reducers/errorSlice";

import { ERROR } from "../constants";
const URL = process.env.REACT_APP_API_SERVER_URL;
const IAMPORT = process.env.REACT_APP_IAMPORT;

async function requestPayment({ albumInfo, amount, userInfo, dispatch, history }) {
  const token = localStorage.getItem("token");

  const IMP = window.IMP;
  IMP.init(IAMPORT);

  const { _id: userId, email, name } = userInfo;
  const { title, _id: albumId } = albumInfo;

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

      const res = await fetch(`${URL}/musics/payment/${merchant_uid}/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ imp_uid, amountToBePaid, albumId }),
      });

      const result = await res.json();

      if (result.success) {
        return history.push("/");
      }

      dispatch(occurError(result.message));
    } else {
      dispatch(occurError(ERROR.failPayment));
    }
  });

}

export default requestPayment;
