import React from "react";

export default class Item extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="item">
        {data.thumbnail !== "self" && <img src={data.thumbnail} alt="" />}
        <h4>{data.title}</h4>
        <p>Number of comments: {data.num_comments}</p>
        <a
          href={`https://reddit.com/${data.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          link
        </a>
      </div>
    );
  }
}
