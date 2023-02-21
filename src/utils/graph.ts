import ELK from "elkjs";
import type { Edge, Node } from "reactflow";
import type { ElkNode } from "elkjs"

const elk = new ELK();

export const sortLayout = async (nodes: Node[], edges: Edge[]) => {

    const graph = {
        id: "root",
        layoutOptions: { 'elk.algorithm': 'layered'},
        children: nodes,
        edges: edges.map(e => {
            const obj: SortingEdges  = e as SortingEdges
            obj["sources"] = [e["source"]]
            obj["targets"] = [e["target"]]
            return obj
        } )
      }
    return await elk.layout(graph as ElkNode)
          
}

type SortingEdges = Edge & {"sources": string[], "targets": string[]}