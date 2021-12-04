import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import requestMyMusics from "../api/requestMyMusics";
import requestMyFundings from "../api/requestMyFundings";
import { occurError } from "../reducers/noticeSlice";
import MyMusics from "../components/MyMusics";
import MyFundings from "../components/MyFundings";

export default function MyList() {
  const dispatch = useDispatch();
  const [myMusics, setMyMusics] = useState([]);
  const [myFundings, setMyFundings] = useState([]);

  useEffect(() => {
    async function getMyMusics() {
      try {
        const { data, message } = await requestMyMusics();

        if (data) {
          return setMyMusics(data);
        }

        dispatch(occurError(message));
      } catch (err) {
        dispatch(occurError(err.message));
      }
    }

    async function getMyFundings() {
      try {
        const { data, message } = await requestMyFundings();

        if (data) {
          return setMyFundings(data);
        }

        dispatch(occurError(message));
      } catch (err) {
        dispatch(occurError(err.message));
      }
    }

    getMyMusics();
    getMyFundings();
  }, [dispatch]);

  return (
    <>
      <MyMusics myMusics={myMusics} />
      <MyFundings myFundings={myFundings} />
    </>
  );
}
