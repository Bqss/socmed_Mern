import {useState, useEffect} from 'react'
import moment, {Moment} from "moment";

const useMoment = (date : string | undefined) => {
  const [dateM, setDateM] = useState<Moment>();
  useEffect(() => {
    setDateM(moment(date))
  },[date]) 

  return {
    day: dateM?.format("ddd"),
    month: dateM?.format("MMMM"),
    year: dateM?.format("YYYY"),
    relative : dateM?.startOf("day").fromNow()
  }
}

export default useMoment