import React, { useState, useEffect, Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import 'react-tabs/style/react-tabs.scss'
import '../../styles/comment.scss'

import { getProductCommentAsync } from '../../actions/product/getProductComment'
import ProductListPageBar from './ProductListPageBar'
import ProductQanda from '../qanda/ProductQanda'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'

function CommentList(props) {
  const {
    productComment,
    getProductCommentAsync,
    productId,
    currentPage,
    productName,
    star,
    setStar,
    commentNum,
    setCommentNum,
  } = props
  const [tabIndex, setTabIndex] = useState(0)

  const data = productComment
  const perPage = 5

  console.log(data)
  // console.log({ ...data[0] }.memberName)
  let starsum = 0
  const display = data.map((item, index) => {
    const itemObj = { ...item }
    if (data.length === 0) {
      setStar(0)
      setCommentNum(0)
    } else {
      starsum += +itemObj.star
      setStar(Math.ceil(starsum / data.length))
      setCommentNum(data.length)
    }

    if (
      index >= currentPage * perPage - perPage &&
      index < currentPage * perPage
    ) {
      return (
        <>
          <div className="commentList d-flex row">
            <div className="col-md-2 col-sm-2">
              <div className="iconBox">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="commentBox col-md-10 col-sm-10">
              <h2 className="eventTitle">{itemObj.memberName} </h2>
              <ul className=" list-unstyled">
                <li>
                  星等
                  {itemObj.star}
                </li>
                <li>
                  <p className="">{itemObj.content}</p>
                </li>

                <li className="d-flex">
                  <SimpleReactLightbox>
                    <SRLWrapper>
                      <div className="commentImg">
                        <img
                          className="commentImgPhoto commentImghover"
                          src={`http://localhost:5000/images/comments/${itemObj.commentImg}`}
                          // this.state.data.commentImg
                          alt={itemObj.commentImg}
                        />
                      </div>
                    </SRLWrapper>
                  </SimpleReactLightbox>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    }
  })
  console.log(star)
  console.log(commentNum)
  useEffect(() => {
    getProductCommentAsync(props.match.params.id)
  }, [])

  return (
    <>
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(tabIndex) => setTabIndex(tabIndex)}
      >
        <TabList>
          <Tab>評價</Tab>
          <Tab>問與答</Tab>
        </TabList>
        <TabPanel>
          {data.length === 0 ? (
            <h2 className="eventTitle">暫無評論 </h2>
          ) : (
            display
          )}

          <ProductListPageBar
            currentPage={currentPage}
            productnumbers={data.length}
            perPage={5}
            moveto={2500}
          />
        </TabPanel>

        <TabPanel>
          <div>
            <div className="d-flex">
              <div className="eventDetailBox col-12 pl-3">
                <ProductQanda productNameNow={productName} />
              </div>
            </div>
          </div>

          <ProductListPageBar
            currentPage={currentPage}
            productnumbers={data.length}
            perPage={perPage}
            moveto={2500}
          />
        </TabPanel>
      </Tabs>
    </>
  )
}

const mapStateToProps = (store) => {
  return { productComment: store.productReducer.productComment }
}

export default withRouter(
  connect(mapStateToProps, { getProductCommentAsync })(CommentList)
)
