import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home.scss'
import Fade from 'react-reveal/Fade'
import $ from 'jquery'
import CountdownProduct from '../components/home/CountdownProduct'
import FeaturedProduct from '../components/home/FeaturedProduct'
import About from '../components/home/About'
import Articles from '../components/home/Articles'
import {
  FaSearch,
  FaStreetView,
  FaLongArrowAltRight,
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
} from 'react-icons/fa'
import Slider from 'react-slick'

function Home(props) {
  //搜尋bar切換狀態 0=地點 1=分類 2=時間
  const [searchbar, setsearchbar] = useState(0)

  //存放倒數結束5筆商品資料
  const [ProductEndlist, setProductEndlist] = useState('')

  //存放精選3筆商品資料
  const [ProductFeaturedlist, setProductFeaturedlist] = useState('')
  //存放6筆最新文章資料
  const [articleslist, setarticleslist] = useState('')
  //存放中間輪播banner資料
  const [slickBannerData, setslickBannerData] = useState('')
  //存放中間輪播banner-多圖資料
  const [slickBannerImgData, setslickBannerImgData] = useState('')

  //存放搜尋bar-地點搜尋內容
  let searchBarCity, searchBarArea, searchBarAddress, searchBarLocationData
  //存放搜尋bar-名稱搜尋內容
  let searchBarCategory1, searchBarCategory2, searchBarName, searchBarActiveData
  //存放搜尋bar-時間搜尋內容
  let searchBarStartTime, searchBarEndTime, searchBarTimeData

  //找出精選3筆商品
  async function homeProductFeaturedlist(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      'http://localhost:5000/homeproductfeaturedlist/',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    // console.log('3筆商品', data)
    setProductFeaturedlist(data)
  }

  //找出中間banner商品資料
  async function homeslickBannerData(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/homeslickbannerdata/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('1筆商品', data)
    setslickBannerData(data)
  }
  //找出中間banner商品(多圖)資料
  async function homeslickBannerImgData(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      'http://localhost:5000/homeslickbannerimgdata/',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    // console.log('4張圖片', data)
    setslickBannerImgData(data)
  }

  //找出倒數結束5筆商品
  async function homeProductEndlist(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/homeproductendlist/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('5筆商品', data.length)
    setProductEndlist(data)
  }

  //找出6筆最新文章
  async function homeArticleslist(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/homearticleslist/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('6筆文章', data)
    setarticleslist(data)
  }

  //地點搜尋bar
  const location = (
    <div id="location-search" className="search-bar">
      <select id="city" ref={(input) => (searchBarCity = input)}>
        <option value="">請選擇</option>
        <option value="">新北市</option>
        <option value="1">台北市</option>
        <option value="">基隆市</option>
        <option>連江縣</option>
        <option>宜蘭縣</option>
        <option>新竹市</option>
        <option>新竹縣</option>
        <option>桃園市</option>
        <option>苗栗縣</option>
        <option>臺中市</option>
        <option>彰化縣</option>
        <option>南投縣</option>
        <option>嘉義市</option>
        <option>嘉義縣</option>
        <option>雲林縣</option>
        <option>臺南市</option>
      </select>
      <select id="area" ref={(input) => (searchBarArea = input)}>
        <option>請選擇</option>
        <option value="大安區">大安區</option>
        <option value="中正區">中正區</option>
        <option value="大同區">大同區</option>
        <option value="中山區">中山區</option>
        <option value="松山區">松山區</option>
        <option value="信義區">信義區</option>
        <option value="士林區">士林區</option>
        <option value="北投區">北投區</option>
        <option value="內湖區">內湖區</option>
        <option value="南港區">南港區</option>
        <option value="文山區">文山區</option>
      </select>
      <input
        ref={(input) => (searchBarAddress = input)}
        type="text"
        id="location-bar"
        placeholder="請輸入活動地址...."
        className="form-control"
      />
      <Link
        to=""
        id="local-btn"
        className="search-btn btn btn-warning "
        onClick={() => {
          searchBarLocationData = {
            City: searchBarCity.value,
            Address: searchBarAddress.value,
          }
          window.location.href = `/productlist?loc=${searchBarCity.value}&keyword=${searchBarAddress.value}`
          // console.log(searchBarLocationData)
        }}
      >
        <FaSearch className="fonticon" />
        搜尋
      </Link>
      <a
        href="/map"
        id="location-btn"
        className="location-search-btn btn btn-danger"
      >
        <FaStreetView className="fonticon" />
        定位搜尋
      </a>
    </div>
  )

  //分類搜尋bar
  const activename = (
    <div id="activename-search" className="search-bar">
      <select id="category1" ref={(input) => (searchBarCategory1 = input)}>
        <option value="">主分類</option>
        <option value="">文藝展覽</option>
        <option value="">手作課程</option>
        {/* <option value="愛上戶外">愛上戶外</option>
        <option value="親子專區">親子專區</option>
        <option value="紓壓生活">紓壓生活</option>
        <option value="藝文手作">藝文手作</option> */}
      </select>
      <select id="category2" ref={(input) => (searchBarCategory2 = input)}>
        <option value="">次分類</option>
        <option value="3">精油香氛</option>
        <option value="4">植感花藝</option>
        <option value="5">浪漫金工</option>
        <option value="6">手作皮革</option>
        <option value="7">木作雕刻</option>
      </select>
      <input
        ref={(input) => (searchBarName = input)}
        type="text"
        id="activename-bar"
        placeholder="請輸入活動名稱...."
        className="form-control"
      />
      <Link
        id="active-btn"
        className="search-btn btn btn-warning"
        onClick={() => {
          searchBarActiveData = {
            Category2: searchBarCategory2.value,
            Name: searchBarName.value,
          }
          window.location.href = `/productlist?cat=${searchBarCategory2.value}&keyword=${searchBarName.value}`
          // console.log(searchBarActiveData)
        }}
      >
        <FaSearch className="fonticon" />
        搜尋
      </Link>
    </div>
  )
  //時間搜尋bar
  const time = (
    <div id="time-search" className="search-bar">
      <div className="time-title">搜尋時間內活動：</div>
      <input
        type="date"
        id="time1"
        className="form-control"
        ref={(input) => (searchBarStartTime = input)}
      />
      <FaLongArrowAltRight className="fonticon arrow" />
      <input
        type="date"
        id="time2"
        className="form-control"
        ref={(input) => (searchBarEndTime = input)}
      />
      <Link
        id="active-btn"
        className="search-btn btn btn-warning "
        onClick={() => {
          searchBarTimeData = {
            StartTime: searchBarStartTime.value,
            EndTime: searchBarEndTime.value,
          }
          window.location.href = `/productlist?startDate=${searchBarStartTime.value}&endDate=${searchBarEndTime.value}`
          console.log(searchBarTimeData)
        }}
      >
        <FaSearch className="fonticon" />
        搜尋
      </Link>
    </div>
  )
  //搜尋bar顯示控制
  const searchbarDisplay = () => {
    if (searchbar == 0) {
      return location
    } else if (searchbar == 1) {
      return activename
    } else if (searchbar == 2) {
      return time
    }
  }
  //搜尋bar上方切換鈕控制
  const localbtnChangeClass = searchbar == 0 ? 'btn active' : 'btn'
  const activenamebtnChangeClass = searchbar == 1 ? 'btn active' : 'btn'
  const timebtnChangeClass = searchbar == 2 ? 'btn active' : 'btn'

  //輪播-精選
  var activitys = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  //輪播-大banner
  var banner = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    fade: true,
    cssEase: 'linear',
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 2000,
          fade: true,
          cssEase: 'linear',
          autoplaySpeed: 5000,
        },
      },
    ],
  }

  //輪播-時限
  var countdowns = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
        },
      },
    ],
  }

  //精選3筆商品顯示
  let ProductFeatured = Array.from(ProductFeaturedlist)
  const ProductFeatureddisplay = ProductFeatured.map((item, index) => {
    return (
      <>
        <FeaturedProduct
          item={item}
          addWishlistCheck={props.addWishlistCheck}
        />
      </>
    )
  })

  //中間banner商品多圖顯示
  let slickBannerImg = Array.from(slickBannerImgData)
  const slickBannerImgdisplay = slickBannerImg.map((item, index) => {
    return (
      <>
        <img
          className="slick-banner-img"
          src={`http://localhost:5000/images/multiImages/${item.productImgs}`}
        />
      </>
    )
  })
  //中間banner商品顯示
  let slickBanner = Array.from(slickBannerData)
  const slickBannerdisplay = slickBanner.map((item, index) => {
    return (
      <>
        <a href={`/product/${item.productId}`} className="home-slick-banner">
          <Fade right>
            <div className="black-bg">
              <div className="content">
                <p className="slick-banner-title">{item.productName}</p>
                <p className="slick-banner-local">
                  <FaMapMarkerAlt />
                  {item.productAddress}
                </p>
                <p className="slick-banner-text">{item.productContent}</p>
              </div>
            </div>
          </Fade>
          <Fade>
            <Slider {...banner}>{slickBannerImgdisplay}</Slider>
          </Fade>
        </a>
      </>
    )
  })

  //倒數結束5筆商品顯示
  let ProductEnd = Array.from(ProductEndlist)
  const ProductEnddisplay = ProductEnd.map((item, index) => {
    return (
      <>
        <CountdownProduct
          item={item}
          addWishlistCheck={props.addWishlistCheck}
        />
      </>
    )
  })

  //最新6筆最新文章顯示
  let articles = Array.from(articleslist)
  const Articlesdisplay = articles.map((item, index) => {
    return (
      <>
        <Articles item={item} />
      </>
    )
  })

  //置頂按鈕
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn()
    } else {
      $('#back-to-top').fadeOut()
    }
  })
  // scroll body to 0px on click
  $('#back-to-top').click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    )
    return false
  })

  //網頁載入時執行
  useEffect(() => {
    homeProductEndlist() //倒數活動
    homeslickBannerData() //banner
    homeslickBannerImgData() //banner多圖
    homeProductFeaturedlist() //精選活動
    homeArticleslist() //精選文章
    setInterval(() => {}, 1000)
  }, [])

  return (
    <>
      <div className="banner">
        <div className="video">
          <video
            src="http://localhost:5000/images/home/test.mp4"
            loop
            autoPlay
            muted
          ></video>
        </div>
        <div className="container">
          <div className="banner-title">
            <img src="http://localhost:5000/images/home/title.png" />
          </div>

          <div className="searchbar-chang-btn">
            <div className="btnList">
              <div
                id="location"
                className={localbtnChangeClass}
                onClick={() => {
                  setsearchbar(0)
                }}
              >
                地點搜尋
              </div>
              <div
                id="activename"
                className={activenamebtnChangeClass}
                onClick={() => {
                  setsearchbar(1)
                }}
              >
                活動名稱
              </div>
              <div
                id="time"
                className={timebtnChangeClass}
                onClick={() => {
                  setsearchbar(2)
                }}
              >
                活動時間
              </div>
            </div>
            {searchbarDisplay()}
          </div>
        </div>
      </div>

      {/* 關於我們 */}
      <About />

      <div className="home-activity">
        <div className="container">
          <Fade top>
            <div className="title">
              <span className="line"></span>
              <span className="txt">精選活動</span>
              <span className="line"></span>
            </div>
          </Fade>
          <Fade bottom>
            <div className="activity-main">
              <Slider {...activitys}>{ProductFeatureddisplay}</Slider>
            </div>
          </Fade>
          <Fade>
            <a href="/productlist?sort=comdesc" className="more-activity-btn">
              查看更多活動
            </a>
          </Fade>
        </div>
      </div>
      {/* ----------------------slick-banner------------------------- */}
      {slickBannerdisplay}
      {/* ----------------------------------------------------------- */}
      <div className="home-countdown">
        <div className="container">
          <Fade top>
            <div className="title">
              <span className="line"></span>
              <span className="txt">即將結束</span>
              <span className="line"></span>
            </div>
          </Fade>
          <Fade bottom>
            <div className="countdown-main">
              <Slider {...countdowns}>{ProductEnddisplay}</Slider>
            </div>
          </Fade>
          <a href="/productlist?sort=prec" className="more-countdown-btn">
            查看更多活動
          </a>
        </div>
      </div>
      {/* ----------------------------------------------- */}

      <div className="home-blog">
        <div className="container">
          <Fade top>
            <div className="title">
              <span className="line"></span>
              <span className="txt">精選文章</span>
              <span className="line"></span>
            </div>
          </Fade>
          <Fade>
            <div className="home-blog-content">{Articlesdisplay}</div>
          </Fade>
          <Fade>
            <a href="/blog" className="more-blog-btn">
              查看更多文章
            </a>
          </Fade>
        </div>
      </div>
      <a
        id="back-to-top"
        href="#"
        class="btn  btn-lg back-to-top"
        role="button"
      >
        <i class="fas fa-chevron-up"></i>
      </a>
    </>
  )
}

export default withRouter(Home)
