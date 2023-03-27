import { applyNodeChanges, applyEdgeChanges, addEdge, Position, MarkerType } from "reactflow";
import { create } from "zustand";
import type { Node , NodeChange, EdgeChange, Connection, Edge, OnNodesChange, OnEdgesChange, OnConnect} from "reactflow"

export const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    removeSuggestionNodesExceptClicked: state.removeSuggestionNodesExceptClicked,
    changeNodeType: state.changeNodeType
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


const Edges = [{
  id: 'edge-1-2',
  source: '1',
  target: '2',
  label: '0.60',
  className: 'normal-edge',
  type: "smoothstep",
  animated: true
},
{
  id: 'edge-1-3',
  source: '1',
  target: '3',
  label: '0.20',
  className: 'normal-edge',
  type: "smoothstep",
  animated: true
},
{
  id: 'edge-1-4',
  source: '1',
  target: '4',
  label: '0.20',
  className: 'normal-edge',
  type: "smoothstep",
  animated: true
}]

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Entry' },
    sourcePosition: Position.Right,
    position: { x: 0, y: 0 },
  
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
    type: 'suggestionNode',
    height: 100
    
  },
  {
    id: '3',
    data: { label: 'upload travel expense documents' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 200, y: 100 },
    selected: false,
    type: 'suggestionNode',
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
    type: 'suggestionNode',
    height: 100
  }

];

export const useGraphStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
  edges: Edges,
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
    },
    removeSuggestionNodesExceptClicked: (id: string) => {
      const nodesToRemove = get().nodes.filter(node => node.type == "suggestionNode" && node.id != id)
      const edgesToRemove = get().edges.filter(edge => nodesToRemove.some(node => node.id == edge.source || node.id == edge.target))
      
      set({

        nodes: get().nodes.filter(node => node.type != "suggestionNode" || node.id == id),
        edges: get().edges.filter(edge => !edgesToRemove.some(edgeToRemove => edgeToRemove.id == edge.id)) 
      })
    },
    changeNodeType: (id: string, type: string) => {
      const index = get().nodes.findIndex(node => node.id == id)
      get().nodes[index]!.type = type
      set({
        nodes: get().nodes
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
  removeSuggestionNodesExceptClicked: (id: string) => void;
  changeNodeType: (id: string, type: string) => void;
};
  
interface GridState {
    gridOn: boolean,
    toggleGrid: () => void
  }
  
  export const useGridStore = create<GridState>()((set) => ({
    gridOn: true,
    toggleGrid: () => set((state) => ({ gridOn: !state.gridOn })),
  }))