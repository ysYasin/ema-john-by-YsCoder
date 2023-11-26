import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import CartSummary from "../CartSummary/CartSummary";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { ArrowRightIcon, WindowIcon } from "@heroicons/react/24/solid";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { totalProduct } = useLoaderData();
  const [currentPage, setCurrenPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPage = Math.ceil(totalProduct / pageSize);

  /**
   * tottal count | Done
   * TOTAL Pages
   * current page : ToDo
   * how many data should in a page:
   * set current page
   */

  const pButtons = [...Array(totalPage).keys()];

  useEffect(() => {
    fetch(
      `http://localhost:5400/products?page=${currentPage}&limit=${pageSize}`
    )
      .then((res) => res.json())
      .then((d) => setProducts(d));
  }, [currentPage, pageSize]);
  // function to get data from child component
  const [cart, setCart] = useState([]);

  function addToCard(product) {
    let newCart = [];
    const existingProduct = cart.find((pd) => pd === product._id);
    if (!existingProduct) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      existingProduct.quantity = existingProduct.quantity + 1;
      const remaininingPd = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaininingPd, existingProduct];
    }
    setCart(newCart);
    addToDb(product._id);
  }
  // get data from DB and set them on cart
  useEffect(() => {
    let savedCart = [];
    const savedProductIds = getShoppingCart();
    let ids = [];
    for (const str in savedProductIds) {
      ids.push(str);
    }
    fetch(`http://localhost:5400/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: ids }),
    })
      .then((res) => res.json())
      .then((cardProducrs) => {
        const storedCart = getShoppingCart();
        for (let id in storedCart) {
          const addedProduct = cardProducrs.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            addedProduct.quantity = storedCart[id];
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);
  //   console.log(cart);
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div>
      <div className="shopping-sector ">
        <div className="shoping-cards-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              addToCard={addToCard}
            ></Product>
          ))}
        </div>
        <div className="order-summary">
          <CartSummary cart={cart} handleClearCart={handleClearCart}>
            <Link to="/orders">
              <button
                style={{ background: "#F90" }}
                className="flex w-full mb-2 items-center rounded-md text-white justify-between"
              >
                Review Order <ArrowRightIcon className="h-6 w-6 text-white" />
              </button>
            </Link>
          </CartSummary>
        </div>
      </div>
      <div className="text-cen">
        <h1 className="tect-xl">urrent page is{currentPage + 1}</h1>
        <button
          disabled={`${currentPage < 1 ? "disabled" : ""}`}
          onClick={() => {
            setCurrenPage(currentPage - 1);
          }}
        >
          prevvius
        </button>
        {pButtons &&
          pButtons.map((page) => {
            return (
              <button
                key={page}
                onClick={() => {
                  setCurrenPage(page);
                }}
                className={`${
                  page === currentPage
                    ? `bg-[#f52c04] rounded-full border-none`
                    : ""
                }`}
              >
                {page + 1}
              </button>
            );
          })}
        <button
          disabled={`${currentPage === pButtons.length - 1 ? "disabled" : ""}`}
          onClick={() => {
            setCurrenPage(currentPage + 1);
          }}
        >
          next
        </button>
        <select
          className="select select-bordered w-xs max-w-xs"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default Shop;
