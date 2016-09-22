import React from "react";
import {render} from "react-dom";
import ScrollRefresh from "../lib/ScrollRefresh";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nextData: []};
  }

  render() {
    let loading = <div>加载中。。。。。</div>
    let data = [];
    this.state.nextData.map(item => {
      data.push(item);
    });
    return (
      <ScrollRefresh height={150} width={300}
                     fetchNextData={this.fetchNextData.bind(this)}
                     nextData={this.state.nextData}
                     loading={loading}
                     pageLoadFinish={(pageNo) => {
                       console.log(pageNo);
                       console.log(this.state.nextData);
                     }}/>
    );
  }

  fetchNextData(currentPos, pageNo) {
    setTimeout(() => {
      if (pageNo > 4) {
        this.setState({nextData: []});
        return;
      }

      this.state.nextData = [
        `${currentPos}.1`,
        `${currentPos}.2`,
        `${currentPos}.3`,
        `${currentPos}.4`,
        `${currentPos}.5`,
        `${currentPos}.6`,
        `${currentPos}.7`,
        `${currentPos}.8`,
        `${currentPos}.9`,
        `${currentPos}.10`];
      this.setState(this.state);
    }, 2000)

  }
}

render(<App/>, document.getElementById('app'));
