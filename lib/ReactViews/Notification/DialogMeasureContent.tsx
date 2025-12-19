import React from "react";
import { observer } from "mobx-react";
import MapInteractionMode from "../../Models/MapInteractionMode";
import ViewState from "../../ReactViewModels/ViewState";
import parseCustomHtmlToReact from "../Custom/parseCustomHtmlToReact";

interface DialogMeasureContentProps {
  message: string;
  interactionMode: MapInteractionMode;
  viewState: ViewState;
}

const DialogMeasureContent: React.FC<DialogMeasureContentProps> = observer(
  ({ message, interactionMode, viewState }) => {
    return (
      <div>
        {parseCustomHtmlToReact(message)}
        {interactionMode.isMeasurementMode && (
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={() => viewState.setPrintWindow(window.open())}>
              Print
            </button>
            <button onClick={interactionMode.onCancel}>Done</button>
          </div>
        )}
      </div>
    );
  }
);

export default DialogMeasureContent;
