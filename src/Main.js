import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles/canvas.css";

class Box extends React.Component {

    componentWillMount() {
        let { radius } = this.props;
        this.setState({ radius });
    }

    componentDidMount() {

        let comp = this;
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
                    let { mX, mY, _x, _y } = _down_state;
                    let { pageX, pageY } = e;

                    $(this).offset({
                        top: _y + (pageY - mY),
                        left: _x + (pageX - mX)
                    });
                    $(this).trigger("drag");
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
            <div className={styles.circle} style={_style} >{this.props.children}</div>
        );
    }
}


class Connection extends React.Component {

    componentDidMount() {

        let conn = ReactDOM.findDOMNode(this);
        let parent = $(conn).parent();
        let { from, to } = this.props;
        this.node1 = $(`div[cid=${from}]`, parent);
        this.node2 = $(`div[cid=${to}]`, parent);
        this.updateConnection();

        this.node1.on("drag", this.updateConnection);
        this.node2.on("drag", this.updateConnection);
    }

    updateConnection = () => {

        let conn = ReactDOM.findDOMNode(this);
        let { top: t1, left: l1 } = this.node1.offset();
        let { top: t2, left: l2 } = this.node2.offset();

        let px = l1 + this.node1.width() * 0.5;
        let py = t1 + this.node1.height() * 0.5;

        let dw = l2 - l1;
        let dh = t2 - t1;

        let vline = "left";
        if (dw < 0) {
            px = px + dw;
            vline = "right";
        }

        let hline = "bottom";
        if (dh < 0) {
            py = py + dh;
            hline = "top";
        }

        if (this._style) {
            for (var prop in this._style) {
                $(conn).css(prop, "");
            }
        }

        let style = {
            top: py,
            left: px,
            width: Math.abs(dw),
            height: Math.abs(dh)
        };

        style[`border-${hline}`] = "3.5pt solid green";
        style[`border-${vline}`] = "3.5pt solid green";
        style[`border-${hline}-${vline}-radius`] = "50px";

        $(conn).css(style);
        this._style = style;
    }

    render() {

        return (
            <div className={styles.connection} />
        );
    }
}

class Container extends React.Component {

    componentDidMount() {
        this.measureContentSize();
        $(window).on("resize", this.measureContentSize);
    }
    componentDidUpdate() {
        this.measureContentSize();
    }

    measureContentSize = () => {

        let node = ReactDOM.findDOMNode(this);

        let maxL = 0, maxT = 0;
        $(node).children().each( (i, elm) => {
            let w = $(elm).width();
            let h = $(elm).height();
            let off = $(elm).position();
            let ml = off.left + w;
            let mt = off.top + h;

            maxL = (ml > maxL) ? ml : maxL;
            maxT = (mt > maxT) ? mt : maxT;
        });

        console.log(maxL, maxT);

        $(node).css("min-width", maxL);
        $(node).css("min-height", maxT);
    }

    render() {

        return (
            <div className={styles.container} onMouseUp={this.mouseUp}>
                <Box cid="c1" position={{ x: 400, y: 100 }} >Node 1</Box>
                <Box cid="c2" position={{ x: 100, y: 400 }} >Node 2</Box>
                <Box cid="c3" position={{ x: 700, y: 400 }} >Node 3</Box>
                <Box cid="c4" position={{ x: 500, y: 700 }} >Node 4</Box>
                <Box cid="c5" position={{ x: 900, y: 700 }} >Node 5</Box>
                <Connection from="c1" to="c2" />
                <Connection from="c1" to="c3" />
            </div>
        );
    }
}

ReactDOM.render(<Container />, document.getElementById("canvas"));