import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country : "in",
        pageSize : 8,
        category: "science"
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string
    }
    //-------- Lecture #26 --------
   
    constructor() {
        super();
        console.log("Hello");

        this.state = {
            articles : [],
            page: 1,
            pageSize : 6,
            loading : false
        }
    }
    
    async componentDidMount() {

        // This Executes after render()

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c74f9444dc5f4826ac908c7f4f9dc3c6&page=1&pagesize=${this.state.pageSize}`;
        {this.setState({loading:true})}
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
            
    }

    handlePrevClick = async () => {
        console.log("Prev");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c74f9444dc5f4826ac908c7f4f9dc3c6&page=${this.state.page - 1}&pagesize=${this.state.pageSize}`;
        {this.setState({loading: true})}
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading : false
        })
    }

    handleNextClick = async () => {
        console.log("Next");

        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c74f9444dc5f4826ac908c7f4f9dc3c6&page=${this.state.page + 1}&pagesize=${this.state.pageSize}`;
        {this.setState({loading:true})}
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);

        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
        }
    }

    render() {
        return (
            <div className = "container my-3" >
                <h1 className = "text-center" style = {{margin: '40px 0px'}}> NewsBar - Top Headlines </h1>

                {this.state.loading && <Spinner/>}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className = "col-md-4" key = {element.url}>
                            <NewsItem title = {element.title?element.title.slice(0,45):" "} description = {element.description?element.description.slice(0,88):" "} imageUrl = {element.urlToImage} newsUrl = {element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between my-3">
                <button disabled = {this.state.page<=1} type="button" className="btn btn-dark"  onClick = {this.handlePrevClick}>&larr; Previous</button>
                <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.state.pageSize)} type="button" className="btn btn-dark" id="nextButton" onClick = {this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
