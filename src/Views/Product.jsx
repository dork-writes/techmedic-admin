import React, { useContext, useEffect, useReducer} from 'react'
import { context } from '../Context/Context';
import { Link, useLocation } from 'react-router-dom';
import Reviews from './Reviews';

const initialState = {base64: '', name: '', price: '', inStock: '', description: '', error: ''};
const reducer = (state, action) => {
  switch(action.type)
  {
      case 'changeImage':
          return {...state, base64: action.payload};
      case 'changeName':
          return {...state, name: action.payload};
      case 'changePrice':
          return {...state, price: action.payload};
      case 'changeStock':
          return {...state, inStock: action.payload};
      case 'changeDesc':
          return {...state, description: action.payload};
      case 'changeError':
          return {...state, error: action.payload}
      default:
          throw new Error();
  }
}

export default function Product() {
    const {pathname} = useLocation();
    const [authtoken] = useContext(context);
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeState = ({name, inStock, price, picture, description}) =>
    {
        dispatch({type: 'changeName', payload: name});
        dispatch({type: 'changeStock', payload: inStock});
        dispatch({type: 'changeDesc', payload: description});
        dispatch({type: 'changePrice', payload: price});
        dispatch({type: 'changeImage', payload: picture});
    }

    useEffect(() =>
    {
      const getResponse = async() =>
      {
          let response = await fetch(`http://localhost:5000/api/products/getproduct/${pathname.split('/')[pathname.split('/').length - 1]}`, {
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
          response.error ? document.title = response.error : changeState(response);
      }
  
      getResponse();
    }, [authtoken, pathname]);

  return (
    <div className={`bg-[#10101000] text-[#edededcd] flex flex-col justify-center h-[100%] py-5`}>
        <div className='mx-auto w-[90%] md:w-[90%] xl:w-[60%]'>
            <Link to = "/products"><button className = "bg-[#13a388] shadow-sm px-5 py-2 rounded-md my-4 hover:bg-[#13a388dd] transition-all ml-auto block">Go Back</button></Link>
            <div className='font-[ropa] mx-auto px-3 md:px-7 pt-7 pb-5 bg-[#ededed22] rounded-md grid lg:grid-cols-2'>
                <img className = "rounded-md w-[100%]" src = {state.base64} alt = {state.name + " picture"} />
                <br className='lg:hidden' />
                <div className='lg:px-8'>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-2xl'>{state.name}</p>
                        <p className='font-bold text-2xl text-[#13a388]'>Rs. {state.price.toLocaleString()}</p>
                    </div>
                    <br />
                    <p className='text-xl'>{state.description}</p>
                    <p className='w-fit text-lg'>Remaining In Stock: {state.inStock}</p>
                </div>
                <div className='text-2xl text-[#13a388]'>
                   <br />
                    Reviews
                    <Reviews productid = {pathname.split('/')[pathname.split('/').length - 1]}/>
                </div>
            </div>
        </div>
    </div>
  )
}
