import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { getNativeSelectUtilityClasses, TextField } from '@mui/material';

function App() {
  const [amount, setAmount] = useState(0);
  const [currencyOne, setCurrencyOne] = useState("");
  const [currencyTwo, setCurrencyTwo] = useState("");
  const [conversion, setConversion] = useState(0)
  const [value, setValue] = useState(0)
  const [valueOne, setValueOne] = useState(0)
  const [valueTwo, setValueTwo] = useState(0)
  const [valueThree, setValueThree] = useState(0)
  const [valueFour, setValueFour] = useState(0)
  const [valueFive, setValueFive] = useState(0)
  const [valueSix, setValueSix] = useState(0)
  const [shouldSwap, setSwap] = useState(false)
  const [converted, hasConverted] = useState(false);
  const [visible, setVisible] = useState(false);
  const timer = useRef()
  

  const myHeaders = new Headers();
myHeaders.append("apikey", "lC6ECBYzPOtNefANshjWrPsx06CK9kcu");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

  async function convertCurrency() {
    try {
      if (amount <= 0) {
          alert("Enter a value greater than zero");
          return;
      }
      // API fetch request functions
      const req = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=${amount}`, requestOptions)
      const res = await req.json();
      const compare = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyOne}&from=${currencyTwo}&amount=1`, requestOptions);
      const compareRes = await compare.json()
      const data = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=5`, requestOptions);
      const dataRes = await data.json()
      const dataOne = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=10`, requestOptions);
      const dataOneRes = await dataOne.json();
      const dataTwo = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=50`, requestOptions);
      const dataTwoRes = await dataTwo.json()
      const dataThree = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=100`, requestOptions);
      const dataThreeRes = await dataThree.json()
      const dataFour = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=500`, requestOptions);
      const dataFourRes = await dataFour.json()
      const dataFive = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=1000`, requestOptions);
      const dataFiveRes = await dataFive.json()

      //Manipulating DOM
      setConversion(`${amount} ${currencyOne} = ${res.result.toFixed(2)} ${currencyTwo}`)
      setValue(`1.00 ${currencyTwo} = ${compareRes.result.toFixed(2)} ${currencyOne}`)
      setValueOne(`5.00 ${currencyOne} = ${dataRes.result.toFixed(2)} ${currencyTwo}`)
      setValueTwo(`10.00 ${currencyOne} = ${dataOneRes.result.toFixed(2)} ${currencyTwo}`);
      setValueThree(`50.00 ${currencyOne} = ${dataTwoRes.result.toFixed(2)} ${currencyTwo}`);
      setValueFour(`100.00 ${currencyOne} = ${dataThreeRes.result.toFixed(2)} ${currencyTwo}`);
      setValueFive(`500.00 ${currencyOne} = ${dataFourRes.result.toFixed(2)} ${currencyTwo}`);
      setValueSix(`1000.00 ${currencyOne} = ${dataFiveRes.result.toFixed(2)} ${currencyTwo}`);
      hasConverted(true)
    } catch(error) {
     setVisible(true);
     return;
    }
    
  }

  if (visible == true) {
    timer.current = setTimeout(function() {
      setVisible(false);
    }, 5000);
  } else {
    clearTimeout(timer.current)
  }

  function swap() {
    if (amount <= 0) {
      alert("Enter a value greater than zero");
      return;
    }
    convertCurrency()
    if (!shouldSwap) {
      setCurrencyTwo(currencyOne)
    setCurrencyOne(currencyTwo)
    setSwap(true)
    } else {
      setCurrencyTwo(currencyOne)
    setCurrencyOne(currencyTwo)
    setSwap(false)
    }
  }


  return (
    <>
    {
     visible &&
     <div className='flex'>
     <div className='error-msg'> 
     <p className='msg' style={{marginTop: 15}}>There was an error processing your request</p>
     </div>
     </div>
     }
    <div id='flex'>
    <div className='converting-container'>
    <div className='amount'>
      <TextField onChange={e => setAmount(e.target.value)} type="number" id="outlined-basic" label="Amount" variant="outlined" />
      </div>
      <div className='from amount'>
      <TextField value={currencyOne} onChange={e => setCurrencyOne(e.target.value)} id="filled-basic" placeholder='Currency Code (USD)' label="From" variant="filled" />
      </div>
      <div className='icon-container'>
      <i onClick={() => swap()} className='icon material-icons'>sync_alt</i>
      </div>
      <div className='amount'>
      <TextField value={currencyTwo} onChange={e => setCurrencyTwo(e.target.value)} id="filled-basic" placeholder='Currency Code (GBP)' label="To" variant="filled" />
      </div>
      <div className='convert-btn'>
      <Button onClick={() => convertCurrency()} variant="text">Convert</Button>
      </div>
      </div>
      </div>
      <div id='result-flex'>
      <div className='result-container'>
        <div className='result-modal-top-flex'>
        <div className='result-modal-top'>
          {
            converted ?
            <>
            <h4 className='conversion-text first-text' style={{color: "black"}}>{conversion}</h4>
          <h4 className='conversion-text' style={{color: "black"}}>{value}</h4>
            </>
           : "Enter the currency you want to convert to"
          }
          </div>
          </div>
          <div>
          <h4 className='five-conversion-text' style={{color: "black"}}>{valueOne}</h4>
          <h4 className='ten-conversion-text' style={{color: "black"}}>{valueTwo}</h4>
          <h4 className='fifty-conversion-text ten-conversion-text' style={{color: "black"}}>{valueThree}</h4>
          <h4 className='hundred-conversion-text ten-conversion-text' style={{color: "black"}}>{valueFour}</h4>
          <h4 className='five-hundred-conversion-text ten-conversion-text' style={{color: "black"}}>{valueFive}</h4>
          <h4 className='thousand-conversion-text ten-conversion-text' style={{color: "black"}}>{valueSix}</h4>
          </div>
      </div>
      </div>
    </>
  );
}

export default App;
