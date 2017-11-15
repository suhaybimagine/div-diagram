import dispatcher from "./Dispatcher";

export function modelUpdated() {
    dispatcher.dispatch({
        type: "MODEL_UPDATED"
    });
}
