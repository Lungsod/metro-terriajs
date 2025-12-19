import React from "react";
import { observer } from "mobx-react";
import MapInteractionMode from "../../Models/MapInteractionMode";
import ViewState from "../../ReactViewModels/ViewState";
import { RawButton } from "../../Styled/Button";

interface DialogMeasureContentProps {
  message: string;
  interactionMode: MapInteractionMode;
  viewState: ViewState;
}

type MeasureType = "line" | "area" | "unknown";

interface MeasureMetric {
  label: string;
  value: string;
}

interface MeasureContent {
  title: string;
  instructions: string[];
  metrics: MeasureMetric[];
  errors: string[];
  measureType: MeasureType;
}

/**
 * Extract semantic content from legacy measurement HTML messages.
 * Layout, inline styles, and <br> tags are intentionally ignored.
 */
function extractMeasureContent(message: string): MeasureContent {
  const text = message.replace(/<[^>]+>/g, "\n");

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const title = lines[0] ?? "";

  const instructions: string[] = [];
  const metrics: MeasureMetric[] = [];
  const errors: string[] = [];

  let measureType: MeasureType = "unknown";

  for (const line of lines.slice(1)) {
    if (/click/i.test(line)) {
      instructions.push(line);
      continue;
    }

    if (/error/i.test(line)) {
      errors.push(line);
      continue;
    }

    if (/\d/.test(line)) {
      const match = line.match(/^(.*?)(\d.*)$/);
      if (!match) continue;

      const label = match[1].trim();
      const value = match[2].trim();

      metrics.push({ label, value });

      if (/distance/i.test(label)) {
        measureType = "line";
      } else if (/area|perimeter/i.test(label)) {
        measureType = "area";
      }
    }
  }

  return { title, instructions, metrics, errors, measureType };
}

const DialogMeasureContent: React.FC<DialogMeasureContentProps> = observer(
  ({ message, interactionMode, viewState }) => {
    const { title, instructions, metrics, errors, measureType } =
      extractMeasureContent(message);

    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
        `}
      >
        {/* Title */}
        <div
          css={`
            font-size: 18px;
            font-weight: 700;
          `}
        >
          {title}
        </div>

        {/* Instructions */}
        {instructions.map((text, i) => (
          <div
            key={`instruction-${i}`}
            css={`
              font-size: 14px;
              color: #434343;
            `}
          >
            {text}
          </div>
        ))}

        {/* Errors */}
        {errors.map((err, i) => (
          <div
            key={`error-${i}`}
            css={`
              font-size: 14px;
              color: #c62828;
              font-weight: 500;
            `}
          >
            {err}
          </div>
        ))}

        {/* Metrics */}
        {metrics.map((metric, i) => (
          <div
            key={`metric-${i}`}
            css={`
              font-size: 15px;
              font-weight: 500;
            `}
          >
            {metric.label} <strong>{metric.value}</strong>
          </div>
        ))}

        {/* Actions */}
        {measureType !== "unknown" && (
          <div
            css={`
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 6px;
              margin-top: 6px;
            `}
          >
            <RawButton
              onClick={() => viewState.setPrintWindow(window.open())}
              css={`
                min-width: 84px;
                height: 34px;
                padding: 0 14px;
                border-radius: 10px;

                border: 2px solid #433977;
                background: white;
                color: #433977;

                font-size: 14px;
              `}
            >
              Print
            </RawButton>

            <RawButton
              onClick={interactionMode.onCancel}
              css={`
                min-width: 84px;
                height: 34px;
                padding: 0 14px;
                border-radius: 10px;

                background: #433977;
                color: white;
                border: none;

                font-size: 14px;
              `}
            >
              Done
            </RawButton>
          </div>
        )}
      </div>
    );
  }
);

export default DialogMeasureContent;
