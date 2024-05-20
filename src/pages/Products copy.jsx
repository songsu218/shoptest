/** @format */

import 'swiper/css';
import 'swiper/css/pagination';
import style from '../css/Detail.module.css';

import { useEffect, useState } from 'react';
import { Tab, Tabs, Button, Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useNavigate, useParams } from 'react-router-dom';

import ListCard from '../components/ListCard';
import { addItem } from '../store/cartStore';
import { useDispatch } from 'react-redux';

const Products = () => {
  const { id } = useParams();
  // console.log('상품아이디---', id);

  const [products, setProducts] = useState(null);
  const [similarList, setSimilarList] = useState([]);
  const [count, setCount] = useState(1);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const getProductList = async () => {
    // id가 일치하는 상품 가져오기
    let url = `http://localhost:4000/products/${id}`;
    let respons = await fetch(url);
    let data = await respons.json();
    setProducts(data);

    let url2 = `http://localhost:4000/products?category=${data.category}`;
    let respons2 = await fetch(url2);
    let data2 = await respons2.json();
    setSimilarList(data2);
  };

  useEffect(() => {
    getProductList();
  }, [id]);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main className={`mw`}>
      <h2>상품상세페이지</h2>
      <section className={`${style.productCon}`}>
        <div className={style.imgCon}>
          <img src={`/img/${products?.img}`} alt={`${products?.title}`} />
        </div>
        <div className={style.pInfo}>
          <p>상품명 : {`${products?.title}`}</p>
          <p>가격 : {`${Number(products?.price).toLocaleString()}`} 원</p>
          <p>할인률 : {`${products?.discount}`} %</p>
          <div className={style.count}>
            <span>수량</span>
            {count === 1 ? (
              <button onClick={decrement} disabled>
                -
              </button>
            ) : (
              <button onClick={decrement}>-</button>
            )}
            <span>{count}</span>
            <button onClick={increment}>+</button>
          </div>
          <button
            onClick={() => {
              handleShow();
            }}
          >
            장바구니
          </button>
        </div>
      </section>
      <section className={`${style.pDesc}`}>
        <Tabs defaultActiveKey="Description" id="fill-tab-example" className="mb-3">
          <Tab eventKey="Description" title="Description">
            Description 영역이다
          </Tab>
          <Tab eventKey="Aditional" title="Aditional information">
            Aditional 영역
          </Tab>
          <Tab eventKey="Reviews" title="Reviews">
            Reviews 영역
          </Tab>
        </Tabs>
      </section>
      <section>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {similarList.map((p) => (
            <SwiperSlide key={p.id}>
              <ListCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>장바구니에 추가되는 상품 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          추가되는 상품 정보를 다시 보여줄 수도 있습니다.
          <p>{products?.title}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addItem({
                  id: products.id,
                  title: products.title,
                  img: products.img,
                  price: products.price,
                  category: products.category,
                  discount: products.discount,
                  count: count,
                })
              );
              navigate('/cart');
            }}
          >
            장바구니 추가
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Products;
