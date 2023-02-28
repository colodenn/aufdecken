import { applyNodeChanges, applyEdgeChanges, addEdge, Position, MarkerType } from "reactflow";
import { create } from "zustand";
import type { Node , NodeChange, EdgeChange, Connection, Edge, OnNodesChange, OnEdgesChange, OnConnect} from "reactflow"

export const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
  });

const initialEdges = [{ id: '1-2', source: '1', target: '2', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '2-3', source: '2', target: '3', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '2-4', source: '2', target: '4', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },

  { id: '3-4', source: '3', target: '4', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '4-5', source: '4', target: '5', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '5-6', source: '5', target: '6', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '6-7', source: '6', target: '7', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '7-8', source: '7', target: '8', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '8-6', source: '8', target: '6', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '6-9', source: '6', target: '9', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '9-10', source: '9', target: '10', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '10-11', source: '10', target: '11', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  
  { id: '1-11', source: '1', target: '11', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },
  { id: '11-12', source: '11', target: '12', type: 'smoothstep', animated: true, selected: false, markerEnd: {
      type: MarkerType.Arrow,
    } },



];

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Entry' },
    sourcePosition: Position.Right,
    position: { x: 0, y: 0 },
    type: 'input',
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '2',
    data: { label: 'check if expense documents exist' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 100, y: 100 },
    selected: false,
    width: 200,
    height: 100
    
  },
  {
    id: '3',
    data: { label: 'upload travel expense documents' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 200, y: 100 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '4',
    data: { label: 'file travel expnse report' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 300, y: 100 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '5',
    data: { label: 'confirm travel expense report' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 500, y: 200 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '6',
    data: { label: 'decide on travel expense approval' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 500, y:300 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '7',
    data: { label: 'send request for travel expesne correction' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 600, y:300 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '8',
    data: { label: 'correct ravel expense report' },
    targetPosition: Position.Left,
    sourcePosition: Position.Top,
    position: { x: 600, y:400 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '9',
    data: { label: 'send original documents to archive' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 600, y:500 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '10',
    data: { label: 'calculate payments' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 600, y:600 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '11',
    data: { label: 'pay expenses' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 600, y:700 },
    selected: false,
    width: 200,
    height: 100
  },
  {
    id: '12',
    data: { label: 'exit' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 800, y:700 },
    selected: false,
      width: 200,
    height: 100
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