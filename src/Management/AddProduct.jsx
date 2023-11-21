import React, { useContext, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../Context/Context';

const initialState = {base64: '', name: '', price: '', inStock: '', description: '', error: ''};
const reducer = (state,action) => {
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

export default function AddProduct() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authtoken] = useContext(context);

  const getBase64 = (file) => 
  {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        dispatch({type: 'changeImage', payload: reader.result});
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  const handleSubmit = async(e) =>
  {
    e.preventDefault();
    const {name, inStock, base64, price, description} = state;
    let response = await fetch('http://localhost:5000/api/products/addproduct', {
        method: "POST",
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({name, inStock, price, description, picture: base64})
    });
    
    response = await response.json();
    console.log(response);
    response.error ? dispatch({type: 'changeError', payload: Array.isArray(response.error) ? response.error[0].msg : response.error.msg}) : navigate('/products');
  }
  
  return (
    <div className='bg-[#10101000] text-[#edededdd] py-10 px-3 flex flex-col justify-center'>
         <h1 className = "text-3xl text-center pb-8 font-[ropa] text-[#13a388]">TECH<span className = "text-[#edededdd]">MEDIC</span><em>&nbsp;Admin</em></h1>
        <form onSubmit = {handleSubmit} className = "bg-[#ededed22] px-5 pt-10 pb-5 rounded-md w-[99%] md:w-[80%]  xl:w-[40%] mx-auto">
            <h1 className = "mx-auto w-fit text-2xl font-bold text-[#13a388]">Adding a new product</h1>
            <div className = "w-[20%] mb-10 border-b-4 rounded-sm border-[#13a388] ml-auto mr-auto">
                    &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className = "text-gray-400 bg-[#10101045] rounded-md px-2 pt-2 pb-3 w-[100%] sm:w-fit">
                <label className = "block pb-2" htmlFor='product-image'>Product Image </label>
                <input onChange={(e)=>{getBase64(e.currentTarget.files[0])}} /*dispatch({type: 'changeImage', payload: e.currentTarget.value})*/ type = "file"  accept="image/jpeg, image/png, image/jpg" name = "product-image" alt = "productimage"/>
            </div><br />
            <div>
                <input value = {state.name} onChange={(e)=>{dispatch({type: 'changeName', payload: e.currentTarget.value})}} name="name" className = "bg-[#10101045] w-[100%] rounded-md py-2 px-2 focus:outline-0 mx-auto text-[#edededcc]" placeholder='Name'/>
            </div><br />
            <div>
                <input value = {state.price} onChange={(e)=>{dispatch({type: 'changePrice', payload: e.currentTarget.value})}} name="price" className = "bg-[#10101045] w-[100%] rounded-md py-2 px-2 focus:outline-0 mx-auto text-[#edededcc]" type = 'number' placeholder='Price'/>
            </div><br />
            <div>
                <input value = {state.inStock} onChange={(e)=>{dispatch({type: 'changeStock', payload: e.currentTarget.value})}} name="inStock" className = "bg-[#10101045] w-[100%] rounded-md py-2 px-2 focus:outline-0 mx-auto text-[#edededcc]" type = 'number' placeholder='Number Available'/>
            </div><br />
            <div>
                <textarea value = {state.description} onChange={(e)=>{dispatch({type: 'changeDesc', payload: e.currentTarget.value})}} name="description" className = "bg-[#10101045] w-[100%] rounded-md py-2 px-2 focus:outline-0 mx-auto text-[#edededcc]" type = 'number' placeholder='Description'/>
            </div><br />
            <p className = "w-[98%] md:w-[80%] pt-3 text-[#ff1169] text-sm">{state.error}</p>
            <Link to = "/products"><button className='bg-[#ff4a59] w-fit py-2 px-5 block ml-auto rounded-md shadow-sm hover:bg-[#ff4a59dd] transition-all'>Go Back</button></Link>
            <button className='py-2 px-5 bg-[#13a388] mt-3 rounded-md hover:bg-[#13a388dd] transition-all shadow-sm w-fit block ml-auto'>Add Product</button>
        </form>

    </div>
  )
}
