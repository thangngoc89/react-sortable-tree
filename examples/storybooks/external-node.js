import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  SortableTreeWithoutDndContext as SortableTree,
  insertNode,
  dndWrapExternalSource,
} from '../../src';

const externalNodeType = 'yourNodeType';

// this will wrap your external node component as a valid react-dnd DragSource
const YourExternalNodeComponent = dndWrapExternalSource(
  ({ node }) =>
    <div
      style={{
        border: 'solid black 1px',
        display: 'inline-block',
        padding: '3px 5px',
        background: 'blue',
        color: 'white',
      }}
    >
      {node.title}
    </div>,
  externalNodeType
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'node1' }, { title: 'node2' }],
    };
  }

  render() {
    return (
      <div>
        <div style={{ height: 250 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            dndType={externalNodeType}
          />
        </div>
        <YourExternalNodeComponent
          node={{ title: 'External node' }}
          addNewItem={newItem => {
            const { treeData } = insertNode({
              treeData: this.state.treeData,
              newNode: newItem.node,
              depth: newItem.depth,
              minimumTreeIndex: newItem.minimumTreeIndex,
              expandParent: true,
              getNodeKey: ({ treeIndex }) => treeIndex,
            });
            this.setState({ treeData });
          }}
          // Update the tree appearance post-drag
          dropCancelled={() =>
            this.setState(state => ({
              treeData: state.treeData.concat(),
            }))}
        />
        ↑ drag this
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
