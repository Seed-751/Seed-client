import moment from "moment";

function transformTime(value) {
  return moment(value * 1000).format("mm:ss");
}

export default transformTime;
