import React, { Component } from 'react'
import ExampleComponent from 'rc-horizontal-card-timeline'
import fake from './fake'

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
          cards={[...formatFake, ...formatFake, ...formatFake]}
          autoplay={true}
          scrollLength={1000}
          time={3000} />
      </div>
    )
  }
}
