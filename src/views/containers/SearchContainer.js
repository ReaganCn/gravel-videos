import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import SearchComponent from "../components/SearchComponent";
import {
  handleChangeAction,
  getSearchPool,
  searchResultsAction,
} from "../../redux/search/actions";
import SearchResultsComponent from "../components/SearchResultsComponent";
import NotificationConnected from "./NotificationContainer";
import { videoClickedAction } from "../../redux/videos/actions";

//Grabbing state and actions from redux

const mapStateToProps = ({ searchHandler, videoList }) => {
  return {
    state: searchHandler,
    videos: videoList.videos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event) => {
      dispatch(handleChangeAction(event));
    },
    fetchVideos: (data) => {
      dispatch(getSearchPool(data));
    },
    getResults: (results) => {
      dispatch(searchResultsAction(results));
    },
    playVideo: (video) => {
      dispatch(videoClickedAction(video))
    }
  };
};

//React
const SearchContainer = (props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    props.fetchVideos(props.videos);
  }, [props.videos, props.state.videos]);

  useEffect(() => {
    if (props.state.searchQuery.length !== 0) {
      findMatchingVideos();
    } else {
      props.getResults([]);
    }
  }, [props.state.searchQuery]);


  function onVideoClick (id)  {
    for (let element of props.state.searchResults) {
      if (element._id === id) {
        props.playVideo(element);
      }
    }
  }

  const findMatchingVideos = () => {
    const { searchQuery } = props.state;
    const SearchRegex = new RegExp(searchQuery, "i");
    const matchingVideos = props.videos.filter((item) => {
      return SearchRegex.test(item.title) || SearchRegex.test(item.text);
    });
    props.getResults(matchingVideos);
    
  };

  const resultsList = props.state.searchResults.map((result) => {
    return <SearchResultsComponent key={result._id} title={result.title} playVideo={()=> onVideoClick(result._id)}/>;
  });

  return (
    <Fragment>
      <SearchComponent
        searchquery={props.state.searchQuery}
        onChange={() => props.handleChange(event)}
      />
      <ul className="list-group results col">{resultsList}</ul>
    </Fragment>
  );
};

//Connecting React-Redux
const SearchConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

export default SearchConnected;
