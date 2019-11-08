import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0],
      query: ''
    };
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSearchChange(e) {
    this.setState({
      query: e
    });

  }

  handleSubmit () {
    console.log(this.props.searchYouTube);
    var options = {
      key: YOUTUBE_API_KEY,
      query: this.state.query
    };


    this.props.searchYouTube(options, (videos)=> {
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      });
    });

  }

  handleVideoChange(e) {
    this.setState(
      {currentVideo: e}
    );
  }



  render (props) {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleSearchChange={this.handleSearchChange} handleSubmit={this.handleSubmit}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} handleVideoChange={this.handleVideoChange}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
