/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import BeerInfo from '../components/Modals';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import { AiOutlineDown } from  'react-icons/ai'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '100%',
      overflowY: 'auto',
      maxHeight: '100vh',
    },
  };

export default function Frontend() {

    const [results, setResults] = useState([])
    const [sorted, setSorted] = useState([])
    const [fetched, setFetched] = useState(false)
    const [openModal, setOpenModal ] = useState(false);
    const [activeProduct, setActiveProduct ] = useState({});
    const [allBeer, setAllBeer ] = useState([]);
    const [currentOrder, setCurrentOrder ] = useState('name');
    const [pageMin, setPageMin ] = useState(0);
    const [pageMax, setPageMax ] = useState(50);
    const [abvFilter, setAbvFilter ] = useState({
        min: 0,
        max: '',
    })
    const [ibuFilter, setIbuFilter ] = useState({
        min: 0,
        max: '',
    })
    const [filterText, setFilterText] = useState('')



    useEffect(() => {
        if(!fetched){
            Form()
            setFetched(true)
        }
    }, [fetched])

    function prepareModal(productInfo) {
        console.log('loop?')
        console.log(productInfo)
        setActiveProduct(productInfo);
        setOpenModal(true);
      }

  async function Form() {
    try {
      const baseUrl = 'http://localhost:3000/'
      const res = await fetch(
        baseUrl,
        {
          method: 'GET'
        }
      )

      console.log('oi')
      const response = await res.json();

      setAllBeer(response)

      setResults(response)  


    } catch(error) {
      console.log(error)
    }
  }

    useEffect(() => {

      let order = paginate(results)

      setSorted(order)
    },[results])

    function sortABV(){
        let order = [...results]

        
        order.sort((a, b) => {
            return a.abv - b.abv;
        });

        setResults(order)

        setCurrentOrder('abv')
    }

    function sortIBU(){
        let order = [...results]
        
        order.sort((a, b) => {
            return a.ibu - b.ibu;
        });
      
        setResults(order)
        // order = paginate(order)

        // setSorted(order)
        setCurrentOrder('ibu')
    }

    function sortCategory(){
        let order = [...results]
        
        order.sort((a, b) => {  

            if(!a.category){
                return 1
            }

            if(!b.category){
                return -1
            }

            let fa = a.category.toLowerCase(),
                fb = b.category.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        setResults(order)
        // order = paginate(order)

        // setSorted(order)
        setCurrentOrder('category')
    }

  function sortName(){
    console.log('entreou no sort', results);
    let order = [...results]
    

    order.sort((a, b) => {
        if(!a.name){
            return 1
        }

        if(!b.name){
            return -1
        }

        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    setResults(order)

    // order = paginate(order)

    // setSorted(order)
    setCurrentOrder('name')
  }

  function handleFilter(){

    let order = [...allBeer]
    
    setPageMax(50)
    setPageMin(0)
    setCurrentOrder('')

    if(filterText){
        let filter = order.filter((beer) => {
            if(!beer.category){
                beer.category = ''
            }
            if(beer.name){
                return (beer.name.toLowerCase().includes(filterText.toLowerCase()) || beer.category.toLowerCase().includes(filterText.toLowerCase()));
            }
        })

        order = filter
    }

    if(ibuFilter.max){
        let filter = order.filter((beer) => {
            return (beer.ibu > ibuFilter.min && beer.ibu < ibuFilter.max)
        })

        order = filter
    }

    if(abvFilter.max){
        let filter = order.filter((beer) => {
            return (beer.abv > abvFilter.min && beer.abv < abvFilter.max)
        })

        order = filter
    }

    setResults(order) 

    let prodSorted = paginate(order)

    console.log(abvFilter, ibuFilter, filterText)
    console.log(order)
    console.log(prodSorted)

    setSorted(prodSorted)
  }

  function paginate(itens, max=pageMax, min=pageMin){
    var filtered = itens.filter(function(value, index, arr){ 
        return (min <= index && index < max);
    });
    return filtered
  }

  function  handlePagination(type){
    let order = [...results]
    var maxValue, minValue

    if(type === 'previous'){
      maxValue = pageMax-50
      minValue = pageMin-50 
    }

    if(type === 'next'){
      maxValue = pageMax+50
      minValue = pageMin+50
    }

    if(type === 'last'){
      maxValue = results.length
      minValue = results.length-50
    }
    
    if(type === 'first'){
      maxValue = 50
      minValue = 0
    }    

 
    setPageMax(maxValue)
    setPageMin(minValue) 

    let filtered = paginate(order, maxValue, minValue)
    console.log('pagemin', pageMin, 'pageMax:', pageMax)
    console.log('filtrador e:', filtered)
    console.log('os filtrados são:', results)
    setSorted(filtered)

    

  }

  // useEffect(() => {
  //   let filtered = paginate(results)
  //   setSorted(filtered)
  // },[setPageMin])


  return (  
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Frontend Test
        </h1>
        <div className={styles.options}>
          <Link href='/'>
            <a>
                Go to Backend Test
            </a>
          </Link>
        </div>
      </main>
      <div>
      <div className={styles.tabletitle}>Beer List</div>
      <div className={styles.tablesubtitle}>click to show address and description</div>

      <div className={styles.tablehead}>        

        <div style={{display: 'flex'}}>
            <div style={{width: '50%', textAlign: 'center'}}>
                <p>ABV Range</p>
                <input type='number' style={{width: '20%'}} onChange={(e) => setAbvFilter({...abvFilter, min: e.target.value})}/> {'to '}  
                <input type='number' style={{width: '20%'}} onChange={(e) => setAbvFilter({...abvFilter, max: e.target.value})}/>
            </div>

            <div style={{width: '50%', textAlign: 'center'}}>
                <p>IBU Range</p>
                <input type='number' style={{width: '20%'}} onChange={(e) => setIbuFilter({...ibuFilter, min: e.target.value})}/> {'to '} 
                <input type='number' style={{width: '20%'}} onChange={(e) => setIbuFilter({...ibuFilter, max: e.target.value})}/>
            </div>
        </div>
        <div style={{display: 'block', justifyContent: 'space-evenly'}}>
            <input style={{margin: '40px auto', display: 'block', fontSize: '1.5rem'}} placeholder='Search for...' onChange={(e) => setFilterText(e.target.value)}/>
            <button style={{    display: 'flex', margin: '20px auto 40px', fontSize: '1.2rem'}} onClick={() => handleFilter()}>Filter List</button>    
        </div>

        <div style={{display: 'flex', margin: '30px', justifyContent: 'center'}}>
            <div style={{fontWeight: '600', cursor: 'pointer'}} onClick={() => {handlePagination('first') }}>{'<first page>'}</div>
            {pageMin > 0 && <div style={{fontWeight: '600', cursor: 'pointer'}} onClick={() => handlePagination('previous')}>{'<previous page>'}</div>}
            {pageMax < results.length && <div style={{fontWeight: '600', cursor: 'pointer'}}  onClick={() => handlePagination('next')}>{'<next page>'}</div>}
            <div style={{fontWeight: '600', cursor: 'pointer'}} onClick={() => {handlePagination('last') }}>{'<last page>'}</div>
        </div>       

        {sorted.length ?
          <>            
            <div className={styles.tableitenstitle}>
              <div onClick={() => sortName()} style={{cursor: 'pointer'}}>Name {currentOrder == 'name' &&<AiOutlineDown/>}</div>
              <div onClick={() => sortCategory()} style={{cursor: 'pointer'}}>Category{currentOrder == 'category' && <AiOutlineDown/>}</div>
              <div onClick={() => sortABV()} style={{cursor: 'pointer'}}>ABV{currentOrder == 'abv' && <AiOutlineDown/>}</div>
              <div onClick={() => sortIBU()} style={{cursor: 'pointer'}}>IBU{currentOrder == 'ibu' &&<AiOutlineDown/>}</div>              
              <div>Website</div>
            </div> 

            {sorted.map((beer, index) => (
              <div key={index} className={styles.tableitens} onClick={() => prepareModal(beer)}>
                <div>{beer.name}</div>
                <div>{beer.category}</div>
                <div>{beer.abv.toFixed(2)}</div>
                <div>{beer.ibu}</div>                
                <div>{beer.website}</div>
              </div>
            ))}
            </>
          : 
          <>
            <p>No beer found</p>
          </>
        }
      </div>
      </div>    
        {openModal && <BeerInfo
          openModal={openModal}
          setOpenModal={setOpenModal}
          activeProduct={activeProduct}
        />
        }
      <ToastContainer position="bottom-left"/>  
    </div>
  )
}
