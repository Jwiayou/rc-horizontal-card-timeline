# rc-horizontal-card-timeline

> 纵向的卡片容器时间轴
![Alt Text](./demo.gif)

[![NPM][image-1]][2] [![JavaScript Style Guide][image-2]][3]

## Install

```bash
npm install --save rc-horizontal-card-timeline
```

## Usage

```tsx
import React, { Component } from 'react'
import ExampleComponent from 'rc-horizontal-card-timeline'

const fake = [
  {
    time: '2018-08-01',
    appName: '百度搜索APP',
    type: 0,
    des: 'ios出现动画卡顿情况，目前只有6s，iphoneX发现这种bug。其他ios机型无问题'
  },
  {
    time: '2019-01-21',
    appName: '知乎网页版',
    type: 2,
    des: '发布了新的版本，更新了一下内容： 1，用户头像优化；2，首页主题色更改；3，杀了一些程序猿祭天，愿世界永无bug'
  },
  {
    time: '2019-03-31',
    appName: 'CDN-FOR-CLIENT—SIDE',
    type: 1,
    des: '并发临近更定最高值，请及时扩展服务器。并发临近更定最高值，请及时扩展服务器。并发临近更定最高值，请及时扩展服务器。'
  },
]

const formatFake = fake.map(item => {
  return {
    time: item.time,
    type: ['error', 'warn', 'success'][item.type],
    el: <Card content={item.des} title={item.appName}/>
  }
});

const Card = Props => <div className="card">
  <h3>{Props.title}</h3>
  <div>{Props.content}</div>
</div>;

const formatFake = fake.map(item => {
  return {
    time: item.time,
    type: ['error', 'warn', 'success'][item.type],
    el: <Card content={item.des} title={item.appName}/>
  }
});

export default class App extends Component {
  render () {
    return (
      <div className="box">
        <ExampleComponent
          cards={formatFake}
          autoplay={true}
          scrollLength={1000}
          time={3000} />
      </div>
    )
  }
}
```

## License

MIT © [Jwiayou][4]

[2]:	https://www.npmjs.com/package/rc-horizontal-card-timeline
[3]:	https://standardjs.com
[4]:	https://github.com/Jwiayou

[image-1]:	https://img.shields.io/npm/v/rc-horizontal-card-timeline.svg
[image-2]:	https://img.shields.io/badge/code_style-standard-brightgreen.svg
