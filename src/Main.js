import React from "react";
import ReactDOM from "react-dom";
import "./Extensions";
import Container from "./Container";
import * as Actions from "./Actions";
import css from "./styles/toolbar.css";

class Toolbar extends React.Component {

    buttonClicked = (e) => {

        let { model } = this.props;

        let id = "b" + model.boxes.length + 1;
        let name = "Box " + (model.boxes.length + 1);
        let x = 300 + Math.random() * 100;
        let y = 300 + Math.random() * 100;

        model.boxes.push({ id, name, position: {x, y}, connections: [] });
        Actions.modelUpdated();
    }

    render() {
        return (
            <div className={css.toolbar}>
                <button className={css.button} onClick={this.buttonClicked}>Create Box</button>
            </div>
        );
    }
}

$(document).ready(function () {

    let model = {
        boxes: [
            { id: "b1", name: "Box 1", position: { x: 550, y: 105 }, connections: ["b2", "b3"] },
            { id: "b2", name: "Box 2", position: { x: 890, y: 340 }, connections: ["b4"] },
            { id: "b3", name: "Box 3", position: { x: 270, y: 340 }, connections: ["b5"] },
            { id: "b4", name: "Box 4", position: { x: 890, y: 640 }, connections: ["b6"] },
            { id: "b5", name: "Box 5", position: { x: 270, y: 640 }, connections: ["b7", "b8"] },
            { id: "b6", name: "Box 6", position: { x: 890, y: 900 }, connections: [] },
            { id: "b7", name: "Box 7", position: { x: 30, y: 900 }, connections: [] },
            { id: "b8", name: "Box 8", position: { x: 490, y: 900 }, connections: [] }
        ]
    }

    ReactDOM.render(<Container model={model} />, document.getElementById("canvas"));
    ReactDOM.render(<Toolbar model={model} />, document.getElementById("toolbar"));
});



