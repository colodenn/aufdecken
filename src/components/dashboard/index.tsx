import ContextMenu from "@components/contextMenu";
import { create } from "zustand";

import ReactFlow, { Background, Controls, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges,Node } from 'reactflow';
import type {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect} from 'reactflow';


import 'reactflow/dist/style.css';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});


const initialEdges = [{ id: '1-2', source: '1', target: '2',    type: 'smoothstep', animated : true }];

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    sourcePosition: 'right',
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    targetPosition: 'left',
    position: { x: 100, y: 100 },
  },
];
interface GridState {
  gridOn: boolean,
  toggleGrid: () => void
}


type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));


export const useGridStore = create<GridState>()((set) => ({
  gridOn: true,
  toggleGrid: () => set((state) => ({ gridOn: !state.gridOn })),
}))

const Dashboard = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  // const { nodes } = useGraphStore();
  const { gridOn } = useGridStore();
  

  
  const snapGrid = [20, 20];
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
  return (
    <>
      <ContextMenu>
        <div className={"h-full z-0"}>
          <ReactFlow          nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            deleteKeyCode="Delete"
        fitView
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultViewport={defaultViewport}
            attributionPosition="top-right"
          >
            {gridOn && (
            <Background />
            )}
            <Controls />
            <MiniMap zoomable pannable />

      </ReactFlow>
      </div>
      </ContextMenu>
    </>
  );

};

export default Dashboard;


export type Node = {
  id: number,
  successors?: number[],
  pos: {x: number, y: number}
}

const Node = (props: Node) => {
  return (
    
      <div className="bg-white w-48 rounded cursor-pointer shadow-sm p-6 absolute" style={{left: props.pos.x, top: props.pos.y}}>
        <p>Start</p>

        <p>{props.id}</p>
    </div>
  
  )
}