/** @format */
import { useEffect, useState } from 'react';
import ListCard from '../components/ListCard';

const ShopAll = () => {
  const [products, setProducts] = useState([]);
  const getProductList = async () => {
    // 전체 상품 가져오기
    let url = `http://localhost:4000/products`;
    let respons = await fetch(url);
    let data = await respons.json();
    setProducts(data);
  };

  const getNewtList = async () => {
    let url = `http://localhost:4000/products?category=new`;
    let respons = await fetch(url);
    let data = await respons.json();
    setProducts(data);
  };

  const getToptList = async () => {
    let url = `http://localhost:4000/products?category=top`;
    let respons = await fetch(url);
    let data = await respons.json();
    setProducts(data);
  };

  const getLowPrice = () => {
    products.sort((a, b) => {
      return a.price - b.price;
    });
    setProducts([...products]);
  };

  const getHighPrice = () => {
    products.sort((a, b) => {
      return b.price - a.price;
    });
    setProducts([...products]);
  };

  const getDisCountPrice = () => {
    products.sort((a, b) => {
      return b.discount - a.discount;
    });
    setProducts([...products]);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <main className={`mw shopall`}>
      <h2>ShopAll</h2>
      <nav>
        <button onClick={getProductList}>모든상품</button>
        <button onClick={getNewtList}>신상품</button>
        <button onClick={getToptList}>인기상품</button>
        <button onClick={getLowPrice}>낮은가격순</button>
        <button onClick={getHighPrice}>높은가격순</button>
        <button onClick={getDisCountPrice}>높은할인율</button>
      </nav>
      <ul className="listCon">
        {products.map((product, i) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ShopAll;
