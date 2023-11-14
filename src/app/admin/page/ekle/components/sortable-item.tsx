import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Handle, Remove } from "@/components/dndkit-sortable-list/components";

export default function SortableItem({ children, ...props }: any) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-start w-full gap-1 p-2 mb-2 bg-white rounded shadow-md"
    >
      <Handle {...listeners} {...attributes} />
      <div className="flex-1">{children}</div>
      <Remove className="" onClick={props.handleRemove} />
    </div>
  );
}
