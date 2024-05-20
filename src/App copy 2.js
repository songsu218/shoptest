/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/my_reset.css';
import './css/App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import ShopAll from './pages/ShopAll';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Company from './pages/Company';
import Ceo from './pages/Ceo';
import Organization from './pages/Organization';
import Ci from './pages/Ci';

import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  // useCallback(() => {}, []);
  const getProductList = useCallback(async (category) => {
    // api 호출 함수
    let url = `http://localhost:4000/products`;
    if (category) {
      url += `?category=${category}`;
    }
    let respons = await fetch(url);
    let data = await respons.json();
    setProducts(data);
  }, []);

  // const getProductList = async () => {
  //   // api 호출 함수
  //   let url = `http://localhost:4000/products?category=new`;
  //   let respons = await fetch(url);
  //   let data = await respons.json();
  //   setProducts(data);
  // };

  // // useEffect(()=>{})
  // // useEffect(()=>{},[])
  // // useEffect(()=>{},[변수, ])
  // // useEffect(()=>{},[변수, 변수, ...])
  // // useEffect(()=>{return ()=>{컴포넌트가 제거될 때 1차 실행되는 곳}},[]])
  // useEffect(() => {
  //   getProductList();
  // }, []);

  // console.log(products);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main products={products} getProductList={getProductList} />} />
        <Route
          path="/shopall"
          element={
            <ShopAll
              products={products}
              setProducts={setProducts}
              getProductList={getProductList}
            />
          }
        />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/company" element={<Company />}>
          <Route path="ceo" element={<Ceo />} />
          <Route path="organization" element={<Organization />} />
          <Route path="ci" element={<Ci />} />
        </Route>
        <Route path="*" element={<h1>페이지가 없습니다.</h1>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
