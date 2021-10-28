import React, { useEffect, useState, useContext } from 'react';
import { getCoinsMarket } from '../../services/api';
import TableComponent from '../../components/table/table';
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from '../../context/context';
import './home.css';

const Home = () => {

    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [, rerender] = useState();
    const [loading, setLoading] = useState(true);

    const context = useContext(AppContext);
    
  useEffect(() => {
    console.log("use-effect")
    const getCoinsMarketParams = {
      vs_currency: 'eur',
      per_page: 10,
      page: context.tablePage
    };

    async function fetchList(){
        setLoading(true);
        const res = await getCoinsMarket(getCoinsMarketParams);
        console.log(res)
        if(res.data)setList(res.data.map(k => {
            return {
                id: k.id,
                image: k.image,
                name: k.name,
                symbol: k.symbol,
                current_price: k.current_price,
                high_24h: k.high_24h,
                low_24h: k.low_24h
            }
        }));
        else if(res.error)setError(res.error)
        setLoading(false);
    }
    
    fetchList()
  }, [context.tablePage])

  function buildTableHeaderData() {
      return Object.keys(list[0]).filter(k => k !== 'id');
  }

  function handleNextTablePage() {
    context.tablePage = context.tablePage + 1;
    //setTablePageNo(prev => prev+1);
    rerender(context.tablePage)
  }

  function handlePrevTablePage() {
      if(context.tablePage === 1)return
      context.tablePage = context.tablePage - 1;
    //setTablePageNo(prev => prev-1);
    rerender(context.tablePage)
  }

    return(
        <div className="p-5">
            {loading ? <Spinner animation="border" variant="primary" className="spinner-center"/> 
            :
            list.length > 0 ? <TableComponent 
            headerData={buildTableHeaderData()} 
            tableData={list}
            incrementPageNo={handleNextTablePage}
            decrementPageNo={handlePrevTablePage}
            decrementButtonDisable={context.tablePage === 1}
            pageNo={context.tablePage}/> : <div style={{color: 'red'}}>{error}</div>}
        </div>
    )
}

export default Home;