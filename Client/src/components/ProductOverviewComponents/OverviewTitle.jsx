import React from 'react';

class OverviewTitle extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <title className="Overview-title">this.props.title</title>
    );
  }
}

export default OverviewTitle;