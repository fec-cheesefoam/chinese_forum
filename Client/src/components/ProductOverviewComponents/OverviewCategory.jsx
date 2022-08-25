import React from 'react';

class OverviewCategory extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <h1 className="Overview-category">this.props.category</h1>
    );
  }
}

export default OverviewCategory;