import styles from "./AddBank.module.css"

import Container from "../UI/Container"

import useHttp from "../../hooks/useHTTP"
import { useCallback, useState } from "react"
import { useEffect } from "react"

const AddBank = (props) => {

    // const [responseData,setResponseData] = useState(null)

    // const processDateFormats = useCallback((rawdata) => {
    //     console.log(rawdata)
    //     setResponseData(rawdata)
    // },[])

    // const {sendRequest:getDateFormats, isloading, error, resetError}=useHttp(processDateFormats)

    // useEffect(()=>{
    //     const dateFormatConfig = {url:"127.0.0.1:5000/dateformats", method:"GET"}
    //     getDateFormats(dateFormatConfig)
    // })

    const sendRequestFunction = async() => {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
      
        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');
      
        headers.append('GET', 'OPTIONS');
        const response = await fetch('http://localhost:5000/dateformats', {
            mode:'no-cors'
        })
        const rawdata = await response.json()
        console.log(rawdata)
    } 

    sendRequestFunction()

    return (<Container>
        {/* {error?error:responseData} */}

    </Container>)

}

export default AddBank