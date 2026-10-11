import {useDroppable} from '@dnd-kit/react';
import {CollisionPriority} from '@dnd-kit/abstract';


export default function Column({children, id, className}){
    const {isDropTarget, ref} = useDroppable({
        id, 
        type: 'column', 
        accept: 'item', 
        collisionPriority: CollisionPriority.Low,
    });
    const style = isDropTarget ? {background: '#00000030'} : undefined;

    return (
        //return the column with items as children
        <div ref={ref} style={style} id={id} className={className}>
            {children}
        </div>
    )
}