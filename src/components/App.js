import React from "react";
import Item from "./Item";
import "../stylesheets/index.css";

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false,
      minComments: 0
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.setState({
      isLoading: true
    });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          items: data.children,
          isLoading: false
        });
      });
  };

  autoRefresh = () => {
    this.setState(
      state => ({
        enableAutoRefresh: !state.enableAutoRefresh
      }),
      () => {
        this.state.enableAutoRefresh
          ? (this.refresh = setInterval(this.getItems, 3000))
          : clearInterval(this.refresh);
      }
    );
  };

  updateMinComments = e => {
    this.setState({
      minComments: +e.target.value
    });
  };

  getItemsByComments = (items, minComments) =>
    items
      .filter(item => item.data.num_comments >= minComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments);

  render() {
    const { items, isLoading, enableAutoRefresh, minComments } = this.state;
    const itemsSortByComments = this.getItemsByComments(items, minComments);

    return (
      <div>
        <h1>Top Commented</h1>
        
          <p>Current filter: {minComments} </p>
          
        <input
          className="inputRange"
          type="range"
          value={minComments}
          onChange={this.updateMinComments}
          min={0}
          max={500}
        />
        <div>
        <button
            className={enableAutoRefresh? "button_active button_refresh" : "button_refresh"}
            type="button"
            onClick={this.autoRefresh}
          >
            {enableAutoRefresh ? "Stop" : "Start"} auto-refresh
          </button>
          </div>

        <div className="content">
          {isLoading ? (
            <p>...Loading</p>
          ) : itemsSortByComments.length > 0 ? (
            itemsSortByComments.map(item => (
              <Item key={item.data.id} data={item.data} />
            ))
          ) : (
            <p>No results found matching your criteria</p>
          )}
        </div>
      </div>
    );
  }
}
