"use client"
import React, {useCallback, useState} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, Edge, Node
} from '@xyflow/react';
import {Pump} from "@/components/canvas-flow/equipments/pump";

import '@xyflow/react/dist/style.css';
import {SensorData} from "@/components/canvas-flow/equipments/any-equipment";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
    pump: Pump
}

export default function CanvasFlow() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    const onDrop = useCallback((event: any) => {
        event.preventDefault();
        const reactFlowBounds = event.target.getBoundingClientRect();
        const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        console.log(`${nodeData}`)
        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top
        }
        const newNode = {
            id: `${nodeData.nodeId}-${+new Date()}`,
            type: 'default',
            position,
            data: { label: nodeData.map((d: SensorData) => `${d.label}: ${d.value}`).join(', '), sensors: nodeData },
        };
        console.log(`label: ${nodeData.map((d: SensorData) => `${d.label}: ${d.value}`).join(', ')}`)
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes])

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}