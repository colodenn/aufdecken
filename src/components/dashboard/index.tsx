import ContextMenu from "@components/contextMenu";
import { create } from "zustand";

import ReactFlow, { Background, Controls, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges, Position } from 'reactflow';
import type {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,Node} from 'reactflow';


import 'reactflow/dist/style.css';
import { shallow } from 'zustand/shallow';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});


const initialEdges = [{ id: '1-2', source: '1', target: '2', type: 'smoothstep', animated : true, selected: false }];

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    sourcePosition: Position.Right,
    position: { x: 0, y: 0 },
    type: 'input',
    selected: false
  },
  {
    id: '2',
    data: { label: 'World' },
    targetPosition:  Position.Left,
    position: { x: 100, y: 100 },
    selected: false

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
  removeSelectedNodes: () => void;
  removeSelectedEdges: () => void;
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
  removeSelectedNodes: () => {
    set({
      nodes: get().nodes.filter(node => node.selected == false)
    })
  },
  removeSelectedEdges: () => {
    set({
      edges: get().edges.filter(edge => edge.selected == false)
    })
  }
}));


export const useGridStore = create<GridState>()((set) => ({
  gridOn: true,
  toggleGrid: () => set((state) => ({ gridOn: !state.gridOn })),
}))

const Dashboard = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  // const { nodes } = useGraphStore();
  const { gridOn } = useGridStore();
  

  
  const snapGrid: [number, number] = [20, 20];
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
  return (
    <>
      <ContextMenu>
        <div className={"h-full z-0 bg-[#fbfbfb7c]"}>
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


