import { applyNodeChanges, applyEdgeChanges, addEdge, Position } from "reactflow";
import { create } from "zustand";
import type { Node, NodeChange, EdgeChange, Connection, Edge, OnNodesChange, OnEdgesChange, OnConnect , NodeAddChange } from "reactflow"
import { v4 } from "uuid";

export const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  removeSuggestionNodesExceptClicked: state.removeSuggestionNodesExceptClicked,
  changeNodeType: state.changeNodeType,
  calculateSuggestionNodes: state.calculateSuggestionNodes,
  turnOffAnimationForEdgesConnectedToNode: state.turnOffAnimationForEdgesConnectedToNode
});

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

const activityNames = [
  "Record Goods Receipt",
  "Record Invoice Receipt",
  "Vencor creates invoice",
  "Clear Invoice",
  "Create Purchase Order Item",
  "Remove Payment Block",
  "Record Service Entry Sheet",
  "Create Purchasse Requisition",
  "Change Quanittiy",
  "Cancel Invoice Receipt",
  "Vendor creates debit memo",
  "Change price",
  "Receive Order Confirmation"
]

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
  },
  turnOffAnimationForEdgesConnectedToNode: (nodeId: string) => {
    set({
      edges: get().edges.map(edge => {
        if (edge.target == nodeId) {
          edge.animated = false
          edge.label = ""
        }
        return edge

      })
    })
  },

  calculateSuggestionNodes: (id: string) => {
    const clickedNode = get().nodes.find(node => node.id == id)
    if (typeof clickedNode == "undefined" || typeof clickedNode == null || typeof clickedNode.width == "undefined" || typeof clickedNode.width == null) return;

    const change = [{
      item: {
        id: v4(),
        data: { label: activityNames[Math.floor(Math.random() * activityNames.length)] },
        position: { x: clickedNode.position.x + 40 + (clickedNode.width ? clickedNode.width : 150), y: clickedNode.position.y - 100 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        type: "suggestionNode"
      },
      type: "add"
    },
    {
      item: {
        id: v4(),
        data: { label: activityNames[Math.floor(Math.random() * activityNames.length)] },
        position: { x: clickedNode.position.x + 40 + (clickedNode.width ? clickedNode.width : 150), y: clickedNode.position.y },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        type: "suggestionNode"
      },
      type: "add"
    },
    {
      item: {
        id: v4(),
        data: { label: activityNames[Math.floor(Math.random() * activityNames.length)] },
        position: { x: clickedNode.position.x + 40 + (clickedNode.width ? clickedNode.width : 150), y: clickedNode.position.y + 100 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        type: "suggestionNode"
      },
      type: "add"
    }
    ] as NodeAddChange[]

    const edgeChange = change.map((node) => {
      if(typeof get().nodes == "undefined" || get().nodes.length == 0) return;
      const id = get().nodes[Math.floor(Math.random() * get().nodes.length)]?.id
      return {
        item: {
          id: v4(),
          source: id,
          target: node.item.id,
          label: '0.33',
          className: 'normal-edge',
          type: "smoothstep",
          animated: true
        },
        type: "add"
      }
    }) as EdgeChange[]

    console.log(edgeChange);


    set({
      nodes: applyNodeChanges(change, get().nodes),
      edges: applyEdgeChanges(edgeChange, get().edges)
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
  calculateSuggestionNodes: (id: string) => void;
  turnOffAnimationForEdgesConnectedToNode: (id: string) => void;
};



interface GridState {
  gridOn: boolean,
  toggleGrid: () => void
}

export const useGridStore = create<GridState>()((set) => ({
  gridOn: true,
  toggleGrid: () => set((state) => ({ gridOn: !state.gridOn })),
}))