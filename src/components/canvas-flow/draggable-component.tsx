// @flow
import * as React from 'react';

type Props = {
    children: React.ReactNode;
    nodeId: string
};
const DraggableComponent = ({children, nodeId}: Props) => {
    const onDragStart = (event: any, nodeId: string) => {
        event.dataTransfer.setData('application/opcua-node', nodeId)
        event.dataTransfer.effectAllowed = 'move';
    }
    return (
        <div className="p-2 m-2 bg-gray-500 cursor-grab" draggable onDragStart={(event) => onDragStart(event, nodeId)}>
            {children}
        </div>
    );
};

export default DraggableComponent;