import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import CreatorsComponent from "../components/CreatorsComponent";
import { fetchingCreators, followCreators } from "../../redux/creators/actions";


//Redux

const mapStateToProps = ({ creatorsList }) => {
  return {
    state: creatorsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCreators: () => {
      dispatch(fetchingCreators());
    },
    followCreators: (id) => {
      dispatch(followCreators(id));
    }
  };
};

//React

const CreatorsContainer = (props) => {
  const [follow, setFollow] = useState(false);

  const clickFollow = (id, name) => {
    props.followCreators(id);
  };

  useEffect(() => {
    props.getCreators();
  }, []);

  let creatorsArray = props.state.creators.slice(0, 4).map((creator) => {
    return (
      <CreatorsComponent
        creator={creator}
        key={creator._id}
        followed={creator.followed}
        onClick={() => clickFollow(creator._id, creator.firstName)}
      />
    );
  });

  return (
    <Fragment>
      <div className="recommended-creators">
        <h6>CREATORS</h6>
        <div className="creators-list">{creatorsArray}</div>
      </div>
    </Fragment>
  );
};

const CreatorsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorsContainer);

export default CreatorsConnected;
