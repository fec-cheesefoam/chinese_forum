import React from 'react';

class OverviewDescription extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className='Overview-descriptionSlogan'>
          {this.props.slogan}
        </div>
        <p className='Overview-descriptionOverview'>
          {this.props.overview}
        </p>
        <div className='Overview-descriptionFeatures'>
          {this.props.features.feature}: {this.props.features.value}
        </div>
      </div>>
    );
  }
}

export default OverviewDescription;