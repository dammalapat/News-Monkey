import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
       <div className="card" style={{width: "18rem"}} >
        <div style={{position: 'absolute',
                     justifyContent: 'flex-end',
                     display: 'flex',
                    right: '0'}}>

        <span className=" badge rounded-pill bg-danger">{source}</span>
        </div>
        <img src={imageUrl?imageUrl:"https://opb-opb-prod.cdn.arcpublishing.com/resizer/cElWTedYruk_DLzrmr8N4ykQUqk=/1200x675/smart/cloudfront-us-east-1.images.arcpublishing.com/opb/AQHBPHGJYBDW3AIV2OU47SPI2Y.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
