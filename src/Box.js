import React from "react";
import ReactDOM from "react-dom";
import css from "./styles/box.css";

export default class Box extends React.Component {

    componentWillMount() {
        let { radius } = this.props;
        this.setState({ radius });
    }

    componentDidMount() {

        let comp = this;
        let { model } = this.props;
        let node = ReactDOM.findDOMNode(this);
        let { x: left, y: top } = this.props.position;

        $(node).attr("cid", this.props.cid);
        $(node).offset({ top, left });
        $(node).mousedown(function (e) {

            let { pageX: mX, pageY: mY } = e;
            let { left: _x, top: _y } = $(this).offset();
            let _isMouseDown = true;
            let _down_state = { mX, mY, _x, _y };

            $("#canvas").on("mousemove.circle", e => {

                if (_isMouseDown) {

                    if (e.stopPropagation) e.stopPropagation();
                    if (e.preventDefault) e.preventDefault();

                    let { mX, mY, _x, _y } = _down_state;
                    let { pageX, pageY } = e;
                    let _offset = {top: _y + (pageY - mY), left: _x + (pageX - mX)}

                    model.position = {x: _offset.left, y: _offset.top};

                    $(this).offset(_offset);
                    $(this).trigger("drag");
                    if (comp.props.onMove) {
                        comp.props.onMove(this);
                    }
                }

            }).mouseup(e => {
                _isMouseDown = false;
                _down_state = null;
                $("#canvas").off("mousemove.circle");
            });
        });
    }

    render() {

        let { radius } = this.state;
        let _style = {
            borderRadius: radius,
        }

        return (
            <div className={css.box} style={_style} >{this.props.model.name}</div>
        );
    }
}
