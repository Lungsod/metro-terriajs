import "!!style-loader!css-loader!./sortable.css";
import { action, makeObservable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";
import Sortable from "react-anything-sortable";
import styled from "styled-components";
import Terria from "../../Models/Terria";
import ViewState from "../../ReactViewModels/ViewState";
import { Ul } from "../../Styled/List";
import WorkbenchItem from "./WorkbenchItem";
import WorkbenchSplitScreen from "./WorkbenchSplitScreen";

const StyledUl = styled(Ul)`
  gap: 5px;
  margin: 15px 0;
  padding: 0 15px;
  li {
    &:first-child {
      margin-top: 0;
    }
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

interface IProps {
  terria: Terria;
  viewState: ViewState;
}

@observer
class WorkbenchList extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    makeObservable(this);
  }

  @action.bound
  onSort(
    _sortedArray: any,
    currentDraggingSortData: any,
    currentDraggingIndex: any
  ) {
    this.props.terria.workbench.moveItemToIndex(
      currentDraggingSortData,
      currentDraggingIndex
    );
  }

  render() {
    return (
      <StyledUl
        overflowY="auto"
        overflowX="hidden"
        scroll
        fullWidth
        column
        flex="1"
      >
        {this.props.terria.showSplitter && (
          <WorkbenchSplitScreen terria={this.props.terria} />
        )}
        <Sortable
          onSort={this.onSort}
          direction="vertical"
          dynamic
          css={`
            width: 100%;
          `}
        >
          {this.props.terria.workbench.items.map((item) => {
            return (
              <WorkbenchItem
                item={item}
                sortData={item}
                key={item.uniqueId}
                viewState={this.props.viewState}
              />
            );
          })}
        </Sortable>
      </StyledUl>
    );
  }
}

export default WorkbenchList;
