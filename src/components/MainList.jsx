/** @format */

import ListCard from './ListCard';

const MainList = ({ products }) => {
  return (
    <section className="mainlist">
      <h2>신상품 리스트가 들어가는 곳</h2>
      <a href="#">View All</a>
      <ul className="listCon">
        {products.map((product, i) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MainList;
