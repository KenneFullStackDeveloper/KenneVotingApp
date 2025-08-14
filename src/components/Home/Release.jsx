import React, { useState, useEffect } from 'react';

const Apptest = () =>{
   
    const[counter,setCounter] = useState(5)
    const[val,setVal] = useState(counter)

    console.log("render")

  const handleChange = (e) => {
      const newValue = e.target.value;
      setCounter(newValue);
      setVal(newValue) ; // vue que lorsque deux usestate se suivent et se dependent et comme ils sont asynchrone alors le resulta 
                        // ne serra pas celui attendu puisqu'ils s'execute en parrallele 
                        // donc si on fait setVal(counter) il prendre l'anciene valeur de counter en memoire car 
                        // setCounter() et setVal() s'execute en meme temps
  };

  const clearInput = () => {
     setCounter(0) // ici counter = 0
     setVal(counter) // ici counter = l'anciene valeur en memoire = 5

 
  }

  useEffect(() => {
    setVal(counter);
},[counter]);


    return (
        <>
            <input  value={counter} onChange={handleChange} placeholder='counter...'/>
            <p>count:{val}</p>
            <button type='button' onClick={clearInput}>clear</button>
        </>
    )
}

export default Apptest;