import * as React from 'react'
import {Motion, spring} from 'react-motion';
import styles from './styles.css'

interface ICardItem {
  time: string,
  el: React.ReactElement
  type: 'success' | 'error' | 'warn',
}

export type Props = {
  cards: ICardItem[],
  autoplay?: boolean,
  time?: number,
  scrollLength?: number

}

export type State = {
  lf: number
}

export default class ExampleComponent extends React.Component<Props> {
  timer: number;
  clearMotion: boolean = false;
  onceMotionLength: number;
  totalMotionLength: number;
  contentRef: React.RefObject<HTMLDivElement> = React.createRef();
  middleRef: React.RefObject<HTMLDivElement> = React.createRef();

  static defaultProps: Props = {
    cards: [],
    autoplay: true,
    time: 3000
  };

  state: State = {
    lf: 0,
  };

  get rightEnd(): boolean {
    return Math.abs(this.state.lf) >= this.totalMotionLength
  }

  iniTime() {
    this.timer = setInterval(() => {
      const {rightEnd, onceMotionLength} = this;
      this.clearMotion = rightEnd;
      this.setState({
        lf: rightEnd
          ? 0
          : this.state.lf - onceMotionLength
      })
    }, this.props.time)
  }

  componentDidMount(): void {
    const {autoplay, scrollLength} = this.props;
    const middleRefWidth = (this.middleRef.current as HTMLDivElement).offsetWidth

    this.onceMotionLength = scrollLength || middleRefWidth / 2;
    this.totalMotionLength = (this.contentRef.current as HTMLDivElement).offsetWidth - middleRefWidth;

    if (autoplay) {
      this.iniTime()
    }
  }

  componentWillMount(): void {
    clearInterval(this.timer)
  }

  handleMouseOver() {
    this.timer && clearInterval(this.timer)
  }

  handleMouseOut() {
    this.props.autoplay && this.iniTime()
  }

  handleArrowClick(leftRight: 'left' | 'right'): void {
    const {lf} = this.state;
    const {onceMotionLength, totalMotionLength} = this;
    if ((leftRight === 'left' && lf >= 0) || (leftRight === 'right' && this.rightEnd))
      return void 0;

    const getNewLf = (): number => {
      const absLf = Math.abs(lf);
      if (leftRight === 'right') {
        const hasLength = totalMotionLength - absLf;
        return  hasLength < onceMotionLength
          ? lf - hasLength
          : lf - onceMotionLength
      } else {
        return absLf < onceMotionLength
          ? lf + absLf
          : lf + onceMotionLength
      }
    };

    this.clearMotion = false;
    this.setState({
      lf: getNewLf()
    });
  }


  renderCards(props: { cards: ICardItem[], left: number }): React.ReactElement {
    const {cards, left} = props;
    const position = (i: number) => styles[i % 2 ? 'bottom' : 'top'];

    return (
      <div className={styles.content} style={{left: `${left}px`}} ref={this.contentRef}>
        {
          cards.map((item, index) => (
            <div className={`${styles.item} ${styles[item.type]}`} key={index}>
              <div className={`${position(index)} ${styles.card}`}>
                <div className={styles.time}>{item.time}</div>
                <div className={styles.el}>
                  {item.el}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    const {lf} = this.state;
    const {cards} = this.props;
    const Cards = this.renderCards.bind(this);

    return (
      <div className={styles.crust} onMouseOver={this.handleMouseOver.bind(this)}
           onMouseOut={this.handleMouseOut.bind(this)}>
        <div className={styles.iconLeft} onClick={this.handleArrowClick.bind(this, 'left')}></div>
        <div className={styles.middle} ref={this.middleRef}>
          <Motion style={{left: spring(lf, {stiffness: 150, damping: 70})}}>
            {
              ({left}) => <Cards left={this.clearMotion ? lf : left} cards={cards}/>
            }
          </Motion>
        </div>
        <div className={styles.iconRight} onClick={this.handleArrowClick.bind(this, 'right')}></div>
      </div>
    )
  }
}
