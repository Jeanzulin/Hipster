import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/Payment.scss'
import { BsCheckCircle } from 'react-icons/bs'

//引入自訂元件

function paymentFinish(props) {
  //取得買家資訊
  const { buyerinfo } = props
  //前往訂單
  const nextOrder = () => {
    props.history.push('/memberuser/order')
  }
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="mt-5 prograssBar3"></div>
          <div className="p-5 mt-3 contentBox">
            <h1 className="mb-4">
              <BsCheckCircle />
              <span className="h2 pl-2">付款完成</span>
            </h1>
            <p className="infoemailbox">
              感謝使用文青地圖，預定憑證及使用詳情將寄至您的電子信箱
              <span className="infoemail">{buyerinfo.email}</span>
            </p>
            <div className="orderdetail">
              <div className="orderdetail-title d-flex justify-content-between">
                <h4>訂單明細</h4>
                <div>
                  <h6 className="">
                    訂單編號:{buyerinfo.orderId ? buyerinfo.orderId : ''}
                  </h6>
                  <h6 className="">
                    購買日期:{buyerinfo.buytime ? buyerinfo.buytime : ''}
                  </h6>
                </div>
              </div>
              <hr />
              {buyerinfo.product
                ? buyerinfo.product.map((item) => {
                    return (
                      <>
                        <div className="d-flex productbox">
                          <div className="productimgbox mr-2">
                            <img
                              className="productimg"
                              src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                            />
                          </div>
                          <div className="productinfo align-items-center">
                            <p className="infoname">{item.name}</p>
                            <p className="infoprice">NT${item.price}</p>
                            <p className="infodate">預定日期: {item.date}</p>
                          </div>
                        </div>
                        <hr />
                      </>
                    )
                  })
                : ''}
            </div>
            <button
              className="paymentButton"
              onClick={() => {
                nextOrder()
              }}
            >
              查看訂單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    buyerinfo: store.orderReducer.buyerData,
  }
}
const mapDispatchToProps = null
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(paymentFinish)
)
