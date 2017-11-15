import React from "react";
import ReactDOM from "react-dom";
import css from "./styles/connection.css";

export default class Connection extends React.Component {

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
        let { top: t1, left: l1 } = this.node1.location();
        let { top: t2, left: l2 } = this.node2.location();

        let px = l1 + this.node1.outerWidth() * 0.5;
        let py = t1 + this.node1.outerWidth() * 0.5 - 3;

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

        style[`border-${hline}`] = "3pt solid green";
        style[`border-${vline}`] = "3pt solid green";
        style[`border-${hline}-${vline}-radius`] = "50px";

        $(conn).css(style);
        this._style = style;
    }

    render() {

        return (
            <div className={css.connection} />
        );
    }
}