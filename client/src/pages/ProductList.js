import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import '../styles/ProductList.scss'

import AsideBar from '../components/product/AsideBar'
import ProductListMainContent from '../components/product/ProductListMainContent'
import ProductSearchResult from '../components/product/ProductSearchResult'
import ProductSearchResultSort from '../components/product/ProductSearchResultSort'
import ProductListPageBar from '../components/product/ProductListPageBar'

import { getProductListAsync } from '../actions/product/getProductList'

import ReactStars from 'react-rating-stars-component'

function ProductList(props) {
  const { productListData, getProductListAsync } = props
  const [date, setDate] = useState(new Date())
  const searchParams = new URLSearchParams(props.location.search)
  // const currentpage = searchParams.get('page')
  const currentPage = !!searchParams.get('page') ? +searchParams.get('page') : 1
  const perPage = 5
  const cat = !!searchParams.get('cat')
    ? searchParams
        .get('cat')
        .split(',')
        .map((item, index) => {
          return item
        })
    : !!searchParams.get('cat')

  const loc = !!searchParams.get('loc')
    ? searchParams
        .get('loc')
        .split(',')
        .map((item, index) => {
          return item
        })
    : !!searchParams.get('loc')

  console.log(loc, cat)

  useEffect(() => {
    getProductListAsync()
    setDate(new Date())
  }, [])

  let length
  if (!!loc && !!cat) {
    length =
      [...loc].length >= [...cat].length ? [...loc].length : [...cat].length
  } else if (!!loc) {
    length = [...loc].length
  } else if (!!cat) {
    length = [...cat].length
  } else {
    length = 0
  }

  const count = productListData.filter((item, index) => {
    if (length === 0) {
      return item
    } else {
      for (let i = 0; i < length; i++) {
        if (item.categoryId === +cat[i] || item.locationParentId === +loc[i]) {
          return item
        }
      }
    }
  })

  const display = count.map((item, index) => {
    if (
      index >= currentPage * perPage - perPage &&
      index < currentPage * perPage
    ) {
      return (
        <>
          <div className="product-list-search-info" key={item.productId}>
            <a href={`/product/${item.productId}`}>
              <div className="row">
                <div className="col-sm-5 col-lg-4">
                  <img
                    src={`http://localhost:5000/images/product/${item.productImg}`}
                    alt=""
                  />
                </div>
                <div className="col-sm-7 col-lg-8 px-15">
                  <div className="product-detail">
                    <div className="product-label"></div>
                    <h3>{item.productName}</h3>
                    <p className="product-description">{item.productContent}</p>
                    <div className="product-place">
                      <i className="fas fa-map-marker-alt"></i>
                      {item.locationName}
                    </div>
                    <div className="product-time">
                      <i className="far fa-calendar"></i>
                      最早可使用日期：
                      {date >= new Date(item.productEndingDate)
                        ? new Date(item.productEndingDate).toLocaleDateString()
                        : '今日'}
                    </div>
                    <div className="product-footer ">
                      <div className="product-star">
                        <ReactStars
                          value={3}
                          count={5}
                          size={20}
                          half={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          color2={'#ffd700'}
                          edit={false}
                        />
                      </div>
                      <span className="divider"></span>
                      <div className="product-booked-number">
                        6.7K+ 個已訂購
                      </div>
                      <div className="product-price">
                        <span>TWD </span>
                        <h4>{item.productPrice}</h4>
                        <span> 起</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </>
      )
    }
  })
  // console.log(display)

  // 測試

  // console.log(count)
  // console.log(length)
  // console.log(count.length)
  // console.log({ ...count[0] }.categoryId)

  return (
    <>
      <div className="container product-content">
        <div className="row">
          <AsideBar cat={cat} loc={loc} />
          <ProductListMainContent>
            {cat || loc ? (
              <ProductSearchResult productnumbers={count.length} />
            ) : (
              ''
            )}
            <ProductSearchResultSort />
            {/* -------商品列表區域------ */}
            {display}
            {/* -------商品列表區域------ */}
            <ProductListPageBar
              productnumbers={count.length}
              currentpage={currentPage}
            />
          </ProductListMainContent>
        </div>
      </div>
    </>
  )
}

// 將redux中的store的state(狀態)
// 對應到這個元件中的props中
const mapStateToProps = (store) => {
  return { productListData: store.productReducer.productListData }
}

// 綁定store的dispatch方法到這個元件的props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ addValue, minusValue }, dispatch)
// }

// 高階元件的樣式，必要的
export default withRouter(
  connect(mapStateToProps, {
    getProductListAsync,
  })(ProductList)
)
