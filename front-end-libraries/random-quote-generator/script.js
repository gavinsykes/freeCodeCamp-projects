const quotes = [
  {
    quote : 'Don\'t believe everything you read on the internet.',
    author : 'Abraham Lincoln'
  },
  {
    quote : 'Never back the early kickoff.',
    author : 'Albert Einstein'
  },
  {
    quote: 'Do or do not, there is no try.',
    author: 'Dumbledore'
  },
  {
    quote : 'You shall not pass!',
    author: 'Darth Vader'
  },
  {
    quote : 'Luke, I am your father.',
    author : 'Homer Simpson'
  }
]

const NewQuote = () => <button id="new-quote">New Quote</button>;

const TweetQuote = props => <a className="tweetbutton" id="tweet-quote" target="_blank" href={'https://www.twitter.com/intent/tweet?text=' + encodeURI(props.quote) + "%0A%0A%20-%20" + encodeURI(props.author)}><i class="fab fa-twitter"></i> Tweet Quote</a>

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote  : '',
      author : ''
    }
    this.newQuote = this.newQuote.bind(this);
  }
  newQuote() {
    let qid = Math.floor(Math.random()*quotes.length);
    this.setState({
      quote  : quotes[qid].quote,
      author : quotes[qid].author
    });
  }
  componentDidMount() {
    this.newQuote();
  }
  render() {
    return (
      <div className="quote-wrapper">
        <div className="quote-box" id="quote-box">
          <p className="quote" id="text">"{this.state.quote}"</p>
          <p className="author" id="author"> - {this.state.author}</p>
          <div class="buttons">
            <button id="new-quote" onClick={this.newQuote}>New Quote</button>
            <TweetQuote quote={this.state.quote} author={this.state.author}/>
          </div>
        </div>
      </div>
    )
  }
}

class NightButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <button className="night-button" onClick={this.props.onClick}>{this.props.night ? "Day Mode" : "Night Mode"}</button>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      night : false
    }
    this.toggleNight = this.toggleNight.bind(this);
  }
  componentWillMount() {
    let time = new Date();
    let h = time.getHours();
    if (h < 7 || h > 19) {
      this.setState({night : true})
    } else {
      this.setState({night: false})
    }
  }
  toggleNight() {
    this.setState({night : !this.state.night});
  }
  render() {
    return (
      <main className={this.state.night && 'night'}>
      <QuoteBox />
      <NightButton onClick={this.toggleNight} night={this.state.night}/>
      </main>
    )
  }
}

ReactDOM.render(
  <App />,document.getElementsByTagName('body')[0]
);
