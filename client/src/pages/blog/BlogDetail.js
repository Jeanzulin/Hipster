import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync } from '../../actions/blog'

import author1 from '../../images/blog/author1.jpg'

function BlogDetail(props) {
  console.log('BlogDetail-props', props)
  const { blogData, getBlogDataAsync } = props
  const { articleId } = props.match.params
  const memberId = JSON.parse(localStorage.getItem('member')).id
  const memberImg = JSON.parse(localStorage.getItem('member')).img

  useEffect(() => {
    getBlogDataAsync()  
    console.log('componentDidMount') 
  }, [])    

  const showBlogDetail = blogData.map((item)=>{
    if(item.articleId==articleId){
    return (
      <>
        <div className="col-8" key={item.articleId}>
          <h1>{item.articleTitle}</h1>
          <p>{'發文日期:'+item.created_at}</p>
          <div className="blog-main-content" dangerouslySetInnerHTML={{__html: item.articleContent}}>        
          </div>
          <h3>相關文章</h3>
          <ul className="related-posts row">
            <li className="col-4">
              <img src={author1}/>
              <p>相關文章</p>
            </li>
            <li className="col-4">
              <img src={author1}/>
              <p>相關文章</p>
            </li>
            <li className="col-4">
              <img src={author1}/>
              <p>相關文章</p>
            </li>     
          </ul>
        </div>
        <aside className="col-4 blog-content-aside">
          {/* <button className="btn d-block">發表新文章</button> */}
          <div className="card">
            <p>作者資訊</p>
            <div className="blog-author-avatar">
              <img src={`http://localhost:5000/images/member/${item.memberImg}`} alt="author" className="d-block"/>
            </div>
            <h3 className="text-center">{item.memberName}</h3>
            <p className="text-center">發表文章數:999</p>
            <button className="btn d-block">看更多牠的文</button>
          </div>
          <div className="featured">
            <p>本月精選</p>
            <hr/>
            <div className="row">
              <div className="col-2">
                <img src={author1} />
              </div>
              <div className="col-10">本月精選標題1</div>
            </div>             
            <hr/>
            <div className="row">
              <div className="col-2">
                <img src={author1} />
              </div>
              <div className="col-10">本月精選標題1</div>
            </div>             
            <hr/>
            <div className="row">
              <div className="col-2">
                <img src={author1} />
              </div>
              <div className="col-10">本月精選標題1</div>
            </div>             
          </div>
        </aside>
      </>
    )}
  })

  return (
    <div className="container">
      <MyBreadcrumb />
      <div className="d-flex">
        {showBlogDetail}        
      </div>
    </div>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync
})(BlogDetail))