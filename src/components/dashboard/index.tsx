import ContextMenu from "@components/contextMenu";
import ReactFlow, { Background, Controls, MiniMap, useReactFlow, ReactFlowProvider, SmoothStepEdge, StraightEdge, StepEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { shallow } from 'zustand/shallow';
import { useRef } from "react";
import { selector, useGraphStore, useGridStore } from "../../stores/store";
import { useMousePositionStore } from "../../stores/mousePos";
import SmartBezierEdge, { SmartStepEdge } from "@tisoap/react-flow-smart-edge";
import CustomEdge from "@utils/weightedEdge";
import suggestionNode from "@utils/suggestionNode";


const nodeTypes = {
  suggestionNode: suggestionNode,
};

const edgeTypes = {
  custom: CustomEdge,
};
const Dashboard = () => {

  return (
    <>
      <ContextMenu>
        <div className={"h-full z-0 bg-[#fbfbfb7c]"}>
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </div>
      </ContextMenu>
    </>
  );

};





const Flow = () => {

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, removeSuggestionNodesExceptClicked, changeNodeType } = useGraphStore(selector, shallow);
  const { gridOn } = useGridStore();
  const reactFlowRef = useRef<HTMLDivElement | null>(null);
  const reactFlowInstance = useReactFlow();
  const { updateMousePosition } = useMousePositionStore();
  const snapGrid: [number, number] = [20, 20];
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
  
  const onNodeClick = (event:any, node:any) => {
    if(node.type == "suggestionNode") {
      removeSuggestionNodesExceptClicked(node.id);

      changeNodeType(node.id, "")
    }
  }
  return (
    <ReactFlow nodes={nodes} ref={reactFlowRef}
    edges={edges}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // edgeTypes={smart}
      deleteKeyCode="Delete"
      fitView
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      onNodeClick={onNodeClick}
      attributionPosition="top-right"
      onPaneContextMenu={(e: React.MouseEvent) => {
        const bounds = reactFlowRef?.current?.getBoundingClientRect();
        if (typeof bounds !== "undefined") {
          const coords = reactFlowInstance.project({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })

          updateMousePosition(coords)
        }
      }
      }

    >

      {gridOn && (
        <Background />
      )}
      <Controls />
      <MiniMap zoomable pannable />

    </ReactFlow>
  )
}


export default Dashboard;


