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
 *      height，int/String， 容器高度，需要设置合适的高度，复杂无法出现滚动条
 *      width， int/String， 容器宽度
 *      fetchNextData， function(currentPos, pageNo), 获得下一页数据，currentPos为当前位置，从0开始；pageNo为当前页码，从1开始
 *      synch，boolean，是否同步执行数据查询，缺省：false
 *      nextData，Array，异步（synch=false）时，通过nextData通知组件数据更新，这个数据只包含当前页的数据。
 *      loading，React Component， 自定义loading
 *      pageLoadFinish, 页数据加载完成回调，可以用于加载后nextData清除，如果清空nextData，需要设置为null
 *      renderItem, function(item, index)，自定义Item
 *      renderNoData, function(), 自定义无数据界面
 *      wrapper, String, 包装组件，缺省'div'
 *      wrapperClassName, String, 包装组件ClassName
 */
import React from 'react';
import isEqual from 'lodash/isequal';
import isEmpty from 'lodash/isempty';
import PropTypes from 'prop-types';

class ScrollRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPos: 0,
      pageNo: 1,
      loading: false,
      finished: false
    };
  }

  render() {
    let loading = null;
    if (this.state.loading) {
      if (this.props.loading) {
        loading = this.props.loading;
      } else {
        loading = <div>loading...</div>;
      }
    }

    if (isEmpty(this.state.data)) {
      return this.props.renderNoData ? this.props.renderNoData() : null;
    } else {
      return React.createElement(
        this.props.wrapper || 'div',
        {
          className: this.props.wrapperClassName,
          style: {height: this.props.height, width: this.props.width, overflow: 'auto'},
          onScroll: this.scrollHandle.bind(this)
        },
        this.state.data.map((item, index) => this.renderItem(item, index)),
        loading
      );
    }
  }

  componentDidMount() {
    setTimeout(this.fetchNextData(), 50);
  }

  scrollHandle(e) {
    if (!this.state.finished && e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      this.fetchNextData();
    }
  }

  renderItem(item, index) {
    return this.props.renderItem ? this.props.renderItem(item, index) : <div key={index}>{item}</div>;
  }

  fetchNextData() {
    if (!this.state.loading) {
      this.setState({loading: true});

      let nextData = this.props.fetchNextData(this.state.currentPos, this.state.pageNo);
      if (this.props.synch) {
        this.setNextData(nextData);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.synch) {
      if (!isEqual(nextProps.nextData, this.props.nextData)) {
        // 这里通过null来清空nextData
        if (nextProps.nextData !== null) {
          this.setNextData(nextProps.nextData);
        }
      } else if (isEmpty(nextProps.nextData) && this.state.loading) {
        this.setState({loading: false});
      }
    }
  }

  setNextData(nextData) {
    if (this.state.finished) {
      this.state.loading && this.setState({loading: false});
      return;
    }

    if (!isEmpty(nextData)) {
      this.state.currentPos += nextData.length;
      this.state.pageNo++;
      this.state.data = this.state.data.concat(nextData);
    } else {
      this.state.finished = true;
    }

    this.state.loading = false;
    this.setState(this.state);


    if ('function' == typeof this.props.pageLoadFinish) {
      this.props.pageLoadFinish(this.state.pageNo);
    }
  }
}

ScrollRefresh.propTypes = {
  fetchNextData: PropTypes.func.isRequired
};

export default ScrollRefresh;
