import React, { Component, PropTypes } from 'react';
import cnames from 'classnames';

class EditModeControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      showed: false
    }

    this.animationDuration = props.animationDuration || 300;
  }

  componentWillReceiveProps(nextProps) {
    // We need to check what user want to do.
    // If he want to exit from edit mode, we need to hide edit mode controls
    // and unmount them
    let nextView = nextProps.view;
    let currView = this.props.view;

    if (!nextView.editMode && currView.editMode) { // If will turn off

      this.setState({ showed: false });

      setTimeout(() => {
        // We need to unmount controls after short timeout for play the animation
        this.setState({
          mounted: false
        });
      }, this.animationDuration);
    } else if (nextView.editMode && !currView.editMode) { // If will turn on

      this.setState({ mounted: nextProps.view.editMode });

      setTimeout(() => {
        this.setState({
          showed: true
        })
      }, 50);
    }
  }

  render() {
    let { view, actions } = this.props;

    let editControlsCName = cnames({
      "edit-mode-controls": true,
      "showed": this.state.showed
    });

    let cancelButtonCName = cnames({
      "button": true,
      "is-disabled": this.props.view.updatingLoading
    });

    let saveButtonCName = cnames({
      "button is-success on-save": true,
      "is-loading": this.props.view.updatingLoading
    });

    if (this.state.mounted) {
      return (
        <div>
          <div className={editControlsCName}>
            <div className="button-group">
              <button
                className={cancelButtonCName}
                onClick={() => {
                  actions.editModeOff();
                  actions.removeInput();
                }}
              >Скасувати</button>
              {" "}
              <button
                className={saveButtonCName}
                onClick={() => actions.updatePrice()}
              >
                <span className="icon"><i className="fa fa-save"></i></span>
                Зберегти
              </button>
            </div>
          </div>
          <div
            className="clickableOverlay"
            onClick={() => actions.removeInput()}
          ></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

EditModeControls.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  animationDuration: PropTypes.number,
  data: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired
}

export default EditModeControls;