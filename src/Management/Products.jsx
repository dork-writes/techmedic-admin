import React, { useContext, useEffect, useState } from 'react'
import { context } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Products() {

  const navigate = useNavigate();
  const [authtoken] = useContext(context);
  const [products, setProducts] = useState([]);

  useEffect(() =>
  {
    const getResponse = async() =>
    {
        let response = await fetch('http://localhost:5000/api/products/getproducts', {
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
        response.error ? document.title = "Unexpected Error" : setProducts(response.products);

    }

    getResponse();
  }, [authtoken]);

  return (
    <div className='bg-[#10101000] text-[#edededdd] py-2 px-2'>
    <Navbar />
    <div className = "bg-[transparent] text-[#edededdd] flex flex-col justify-center py-10 h-[95vh]">
        <h1 className='mx-auto mt-3 text-lg md:text-xl lg:text-2xl font-semibold py-3'>Products</h1>
        <div className='border-b-2 border-[#13a388] mx-5 mt-5 font-[ropa] font-semibold py-3 grid grid-cols-3 justify-items-center text-lg'>
            <div>Name</div>
            <div>Price (Rs.)</div>
            <div>Remaining</div>
        </div>
      {products.map(r => {
        return (
            <Link to = {`/products/${r._id}`} key = {r._id} className='font-[ropa] hover:text-[#13a388] cursor-pointer py-3 grid grid-cols-3 justify-items-center text-lg mx-5'>
                <div>{r.name}</div>
                <div>{r.price.toLocaleString()}</div>
                <div>{r.inStock ? r.inStock : 'Out of Stock'}</div>
            </Link>
        );
      })}
    <button onClick = {() => {navigate('/add-product')}} className='mt-8 bg-[#13a388] w-fit mx-auto px-5 py-2 rounded-md hover:bg-[#13a388cc] transition-all'>Add a new product</button>
    </div>
    </div>
)
}
