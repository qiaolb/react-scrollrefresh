/**
 * Created by joe on 16/9/2.
 *
 * 滚动刷新组件
 * 使用方法：
 * <ScrollRefresh height={150} width={300}
 *                fetchNextData={this.fetchNextData.bind(this)}
 *                nextData={this.state.nextData}/>
 * <ScrollRefresh height={150} width={300}
 *                fetchNextData={this.fetchSynchNextData.bind(this)}
 *                synch/>
 * props：
 *      height，int， 容器高度，需要设置合适的高度，复杂无法出现滚动条
 *      width， int， 容器宽度
 *      fetchNextData， function(currentPos, pageNo), 获得下一页数据，currentPos为当前位置，从0开始；pageNo为当前页码，从1开始
 *      synch，boolean，是否同步执行数据查询，缺省：false
 *      nextData，Array，异步（synch=false）时，通过nextData通知组件数据更新，这个数据只包含当前页的数据。
 *      loading，React Component， 自定义loading
 */
import React, {PropTypes} from "react";


class ScrollRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPos: 0,
      pageNo: 1,
      hasMore: false,
      loading: false
    };
  }

  render() {
    let loading = null;
    if (this.state.loading) {
      if (this.props.loading) {
        loading == this.props.loading;
      } else {
        loading = <div>loading...</div>;
      }
    }
    return <div style={{height: this.props.height, width: this.props.width, overflow: 'auto'}}
                onScroll={this.scrollHandle.bind(this)}>
      { this.state.data.map((item, index) => {
        return <div key={index}>{item}</div>
      })}
      {loading}
    </div>;
  }

  componentDidMount() {
    this.fetchNextData();
  }

  scrollHandle(e) {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      this.fetchNextData();
    }
  }

  renderItem(item, index) {
    return <div key={index}>{item.key}</div>;
  }

  fetchNextData() {
    if (!this.state.loading) {
      this.state.loading = true;
      this.setState(this.state);

      let nextData = this.props.fetchNextData(this.state.currentPos, this.state.pageNo);
      if (this.props.synch) {
        this.setNextData(nextData);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.synch) {
      if (null != nextProps.nextData && nextProps.nextData != this.props.nextData) {
        this.setNextData(nextProps.nextData);
      }
    }
  }

  setNextData(nextData) {
    if (nextData && nextData.length > 0) {
      this.state.currentPos += nextData.length;
      this.state.pageNo++;
      this.state.data = this.state.data.concat(nextData);
    }

    this.state.loading = false;
    this.setState(this.state);
  }
}

ScrollRefresh.propTypes = {
  fetchNextData: PropTypes.func.isRequired
};

export default ScrollRefresh;
