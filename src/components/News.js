import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    
  static defaultProps={
    country :'in',
    pageSize : 5,
    category :'general'
  }
  static propTypes=
  {
     country:PropTypes.string,
     pageSize:PropTypes.number,
     category:PropTypes.string,
  }
    capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    constructor(props)
    {
    super(props);
    console.log("i am the constructor from news component")
     this.state={
      articles : [],
      loading :true,
      page:1,
      totalResults:0
     }
     document.title=`${this.capitalizeFirstLetter(this.props.category)}- news monkey`;
  }
  async updateNews()
  {this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50dd7bcd889c43e58c4d5fd1f400230f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
     let data=await fetch(url);
     let parsedData=await data.json();
     console.log(parsedData);
     this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,
    loading:false})
    this.props.setProgress(100);  

  }
  async componentDidMount()
  {
    console.log("component")
    //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50dd7bcd889c43e58c4d5fd1f400230f&page=1&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true})
    //  let data=await fetch(url);
    //  let parsedData=await data.json();
    //  console.log(parsedData);
    //  this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,
    // loading:false})
    this.updateNews()
  }
   handleNextClick= async ()=>
  {
  //   console.log("next");
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  // {
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50dd7bcd889c43e58c4d5fd1f400230f&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  //     let data=await fetch(url);
  //     let parsedData=await data.json();
  //     console.log(parsedData);
  //     this.setState({loading :true})
  
  //     this.setState({
  //       page:this.state.page+1,
  //       articles:parsedData.articles,
  //       loading :false
  //     })
  // }
  this.setState({page:this.state.page+1})
  this.updateNews()
  }
  handlePrevClick= async ()=>{
    console.log("previous")

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50dd7bcd889c43e58c4d5fd1f400230f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({loading :true})

    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false
    // })

    this.setState({page:this.state.page-1})
    this.updateNews()
  }
  fetchMoreData = async () => {
     this.setState({page:this.state.page+1})
     const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50dd7bcd889c43e58c4d5fd1f400230f&page=${this.state.page}&pageSize=${this.props.pageSize+1}`;
     this.setState({loading:true})
     let data=await fetch(url);
     let parsedData=await data.json();
     console.log(parsedData);
     this.setState({
                   articles:this.state.articles.concat(parsedData.articles),
                    totalResults:parsedData.totalResults,
                    loading:false,
    })
  };
  render() {
    return (
      
        <>
          <h1 className="text-center">newsmonkey-top headlines  on {this.capitalizeFirstLetter(this.props.category)}</h1>
          {this.state.loading && <Spinner/>} 
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
          >
          <div className="container">

        <div className="row">
        { this.state.articles.map((element,index)=>{
          return <div className="col-md-4" key={index}>
      <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
          })}
          </div>
    </div>
          </InfiniteScroll>
    {/* <div className="container d-flex justify-content-between">
    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; previous</button>
    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark"  onClick={this.handleNextClick}>next &rarr;</button>
    
  </div> */}
  </>
    
    )
  }
}

export default News
