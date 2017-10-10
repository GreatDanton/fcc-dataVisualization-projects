import React from 'react';

class CloseModal extends React.Component {
    render() {

        return (
            <div onClick={this.props.onClick} className="modal-close">
                <svg viewBox="0 0 47.324812 47.322568" height="15px" width="15px">
                    <g transform="translate(-160 -281)">
                        <path d="m203 285-39 39" />
                        <path d="m164 285 39.2 39.2" />
                    </g>
                </svg>
            </div>
        )
    }
}

export { CloseModal }
