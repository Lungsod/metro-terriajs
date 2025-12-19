import React from "react";
import { observer } from "mobx-react";
import MapInteractionMode from "../../Models/MapInteractionMode";
import ViewState from "../../ReactViewModels/ViewState";
import parseCustomHtmlToReact from "../Custom/parseCustomHtmlToReact";
import { RawButton } from "../../Styled/Button";

interface DialogMeasureContentProps {
  message: string;
  interactionMode: MapInteractionMode;
  viewState: ViewState;
}

const DialogMeasureContent: React.FC<DialogMeasureContentProps> = observer(
  ({ message, interactionMode, viewState }) => {
    return (
      <>
        {parseCustomHtmlToReact(message)}

        {interactionMode.isMeasurementMode && (
          <div
            css={`
              display: flex;
              justify-content: center;
              gap: 12px;
              margin-top: 16px;
            `}
          >
            <RawButton
              onClick={() => viewState.setPrintWindow(window.open())}
              css={`
                min-width: 90px;
                height: 38px;
                padding: 0 18px;
                border-radius: 12px;

                border: 2px solid #433977;
                background: white;
                color: #433977;

                font-size: 15px;
                font-weight: 500;
              `}
            >
              Print
            </RawButton>

            <RawButton
              onClick={interactionMode.onCancel}
              css={`
                min-width: 90px;
                height: 38px;
                padding: 0 18px;
                border-radius: 12px;

                background: #433977;
                color: white;
                border: none;

                font-size: 15px;
                font-weight: 500;
              `}
            >
              Done
            </RawButton>
          </div>
        )}
      </>
    );
  }
);

export default DialogMeasureContent;
