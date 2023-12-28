"use client"
import Home from './pages/home/page'
import React from "react"

export default function App() {

//contact query
//vignesh@onelabventures.com





// var requestOptions = {
//       method: 'GET',
//       redirect: 'follow',
//       headers: {
//         Authorization: "Bearer 3YvOGBxfpVp5rBLAJM6OHIYtUUNXVT9xgENN5C0vswNA1wuIfMoMRqSQe8jh",
//         "Content-Type": "application/json"
//       },
//       "Access-Control-Allow-Origin":"*"
//     };
    
//     async function g() {
//       console.log("from g");
//       let r = await fetch("https://cricket.sportmonks.com/api/v2.0/countries?api_token=3YvOGBxfpVp5rBLAJM6OHIYtUUNXVT9xgENN5C0vswNA1wuIfMoMRqSQe8jh&filter[name]=Sri%20Lanka", requestOptions);
    
//       if (r.ok) {
//         let s = await r.text();
//         console.log(s, "p");
//       } else {
//         console.error("Request failed with status:", r.status);
//       }
//     }
// g()

  return( <>
  {/* <div className="flex justify-between">
  {s?.map((e,i)=>(<>
  <p>{e.title}</p>
<img className="h-[45px] w-[45px]" src={e.image}/>
  </>))}
  </div> */}
  <Home />
  </>)
}
