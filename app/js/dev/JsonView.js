import React, { Component } from 'react';
import './json-view.scss';

class JsonView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: this.props.isCollapsed
    }
  }

  handleCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  render() {
    const { data, label = 'JSON view' } = this.props;
    const { isCollapsed } = this.state;

    return (
      <div className={ isCollapsed ? 'json-view collapsed' : 'json-view' } onClick={ () => this.handleCollapse() }>
        <div className="btn close">{ isCollapsed ? 'open' : 'close' }</div>
        <h3>{ label }</h3>
        <pre>{ JSON.stringify(data, null, 2) }</pre>
      </div>
    );
  }
}

export default JsonView;