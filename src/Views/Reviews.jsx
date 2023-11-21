import React, { useContext, useEffect, useState } from 'react'
import { context } from '../Context/Context';

export default function Reviews(props) {
  
    const {productid} = props;
    const [authtoken] = useContext(context);
    const [reviews, setReviews] = useState([]);
    const [empty, setEmpty] = useState('');

    useEffect(() =>
    {
      const getResponse = async() =>
      {
          let response = await fetch(`http://localhost:5000/api/reviews/getReview/${productid}`, {
              method: "GET",
              mode: "cors", 
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken
              },
              redirect: "follow",
              referrerPolicy: "no-referrer", 
          });
          
          response = await response.json();
          let revs = [];
          response.error ? setEmpty(response.error) : revs = [];
          !response.error ? revs = await Promise.all(response.reviews.map(async r =>
            {
                response = await fetch(`http://localhost:5000/api/auth/getusername/${r.User}`, {
                    method: "GET",
                    mode: "cors", 
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authtoken
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer", 
                });
                
                response = await response.json();
                r.User = response;
                console.log(r);
                return r;
            }
            )) : revs = [];
            

            console.log(revs);
            setReviews(revs);      
        }
        
        getResponse();
    },[productid, authtoken]);

  return (
    <div>
      <div className='text-lg py-2 text-[#ededed8d]'>
        {empty}
      </div>
      {reviews.map(r =>
      {
        return (
            <div key = {r._id} className = "text-[#edededaf] text-lg">
                <p className='text-xl text-[#edededc2]'><span className='text-sm rounded-2xl bg-[#13a388] border border-[#13a388] text-[#13a388]'>---</span>&nbsp; {r.User}</p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{r.Review}
            </div>
        );
      })}
    </div>
  )
}
