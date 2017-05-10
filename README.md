# react-scrollrefresh

React ScrollRefresh is a React component which enables refresh via scoll

## install

```
npm install react-scrollrefresh --save
```


| properties   | type                         | description|
|--------------|------------------------------|------------|
| height       | int/String                   | 容器高度，需要设置合适的高度，复杂无法出现滚动条 |
| width        | int/String                   | 容器宽度 |
|fetchNextData | function(currentPos, pageNo) | 获得下一页数据，currentPos为当前位置，从0开始；pageNo为当前页码，从1开始 |
| synch        | boolean                      | 是否同步执行数据查询，缺省：false|
| nextData     | Array                        | 异步（synch=false）时，通过nextData通知组件数据更新，这个数据只包含当前页的数据。|
| loading      | React Component              | 自定义loading |
| pageLoadFinish| function(pageNo)            | 页数据加载完成回调，可以用于加载后nextData清除 |
| renderItem   | function(item, index)        | 自定义Item   |
| renderNoDate | function                     | 自定义无数据界面  |
| wrapper      | String                       | 包装组件，缺省'div' |
| wrapperClassName| String                    | 包装组件ClassName  |

## example

```
        <ScrollRefresh height={150} width={300}
                       fetchNextData={this.fetchNextData.bind(this)}
                       nextData={this.state.nextData}/>
                       
                       
        <ScrollRefresh height={150} width={300}
                       fetchNextData={this.fetchSynchNextData.bind(this)}
                       synch/>
```


## license

MIT
