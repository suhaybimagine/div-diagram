import React from "react";
import ReactDOM from "react-dom";
import Connection from "./Connection";
import Box from "./Box";
import css from "./styles/container.css";

export default class Container extends React.Component {

    componentDidMount() {
        this.measureContentSize();
        $(window).on("resize", this.measureContentSize);
    }
    
    componentDidUpdate() {
        this.measureContentSize();
    }

    measureContentSize = () => {

        let node = ReactDOM.findDOMNode(this);
        let maxL = parseInt($(node).css("min-width"));
        let maxT = parseInt($(node).css("min-height"));

        let minL = 0, minT = 0;
        $(node).children().each((i, elm) => {
            let w = $(elm).outerWidth();
            let h = $(elm).outerHeight();

            let off = $(elm).location();
            let ml = off.left + w;
            let mt = off.top + h;

            maxL = (ml > maxL) ? ml : maxL;
            maxT = (mt > maxT) ? mt : maxT;

            minL = (off.left < minL) ? off.left : minL;
            minT = (off.top < minT) ? off.top : minT;
        });

        if (minL < 0) {
            $(node).children().each((i, elm) => {
                var pos = $(elm).offset();
                pos.left -= minL - 20;
                $(elm).offset(pos);
            });
            minL = minL * -1;
        } else {
            minL = 0;
        }

        if (minT < 0) {

            $(node).children().each((i, elm) => {
                var pos = $(elm).offset();
                pos.top -= minT - 20;
                $(elm).offset(pos);
            });
            minT = minT * -1;
        } else {
            minT = 0;
        }

        $(node).css("min-width", maxL + minL + 20);
        $(node).css("min-height", maxT + minT + 20);
    }

    render() {

        let { model } = this.props;

        let connections = [];
        let boxes = model.boxes.map((item, i) => {
            item.connections.map(bId => {
                connections.push(<Connection key={connections.length} from={item.id} to={bId} />);
            });

            return <Box key={i} cid={item.id} position={item.position} onMove={this.measureContentSize} model={item} />;
        });

        return (
            <div className={css.container} onMouseUp={this.mouseUp}>
                {boxes}
                {connections}
            </div>
        );
    }
}