import React from 'react';
import {useSortable} from '@dnd-kit/react/sortable';

export default function Item({id, index, column, content}){
    const {ref, isDragging} = useSortable({
        id, 
        index, 
        type:'item', 
        accept:'item', 
        group: column
    })

    return (
        <button className="Item" ref={ref} data-dragging={isDragging}>
            {content}
        </button>
    )
}