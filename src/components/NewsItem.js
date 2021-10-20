import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div className="my-3">
                <div className="card">

                    <div style={{display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0px',}}>
                        
                        <span className="badge rounded-pill bg-danger" style={{padding:'3px 15px'}}>
                            {source}
                        </span>
                    </div>
                    <img
                        src={!imageUrl? "https://cache.careers360.mobi/media/article_images/2021/10/15/du-featured-image.jpg": imageUrl}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}... </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text">
                            <small className="text-muted">
                                By {!author ? "Unknown Author" : author} on{" "}
                                {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a
                            href={newsUrl}
                            rel="noreferrer"
                            target="_blank"
                            className="btn btn-sm btn-dark"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
