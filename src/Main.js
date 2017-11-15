import React from "react";
import ReactDOM from "react-dom";
import "./Extensions";
import Container from "./Container";

$(document).ready(function(){

    let model = {
        boxes: [
            {id: "b1", name: "Box 1", position:{x: 550, y: 105}, connections: ["b2", "b3"]},
            {id: "b2", name: "Box 2", position:{x: 890, y: 340}, connections: ["b4"]},
            {id: "b3", name: "Box 3", position:{x: 270, y: 340}, connections: ["b5"]},
            {id: "b4", name: "Box 4", position:{x: 890, y: 640}, connections: ["b6"]},
            {id: "b5", name: "Box 5", position:{x: 270, y: 640}, connections: ["b7", "b8"]},
            {id: "b6", name: "Box 6", position:{x: 890, y: 900}, connections: []},
            {id: "b7", name: "Box 7", position:{x: 30, y: 900}, connections: []},
            {id: "b8", name: "Box 8", position:{x: 490, y: 900}, connections: []}
        ]
    }

    ReactDOM.render(<Container model={model} />, document.getElementById("canvas"));
});

