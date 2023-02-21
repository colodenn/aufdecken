import { applyNodeChanges, applyEdgeChanges, addEdge, Position } from "reactflow";
import { create } from "zustand";
import type { Node , NodeChange, EdgeChange, Connection, Edge, OnNodesChange, OnEdgesChange, OnConnect} from "reactflow"

export const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
  });

const initialEdges = [{ id: '1-2', source: '1', target: '2', type: 'smoothstep', animated: true, selected: false }];

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
    targetPosition: Position.Left,
    position: { x: 100, y: 100 },
    selected: false

  },
  {
    id: '3',
    data: { label: 'Hello' },
    sourcePosition: Position.Right,
    position: {
      x: 700, y:
        300
    },
    type: 'input',
    selected: false
  },
];

export const useGraphStore = create<RFState>((set, get) => ({
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
    },
    removeAllNodesEdges: () => {
      set({
        edges: [],
        nodes: []
      })
    }
}));
  
type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    removeSelectedNodes: () => void;
    removeSelectedEdges: () => void;
    removeAllNodesEdges: () => void;
};
  
interface GridState {
    gridOn: boolean,
    toggleGrid: () => void
  }
  
  export const useGridStore = create<GridState>()((set) => ({
    gridOn: true,
    toggleGrid: () => set((state) => ({ gridOn: !state.gridOn })),
  }))