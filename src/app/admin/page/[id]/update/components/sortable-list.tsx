import SortableItem from "@/app/admin/page/ekle/components/sortable-item";
import FormInputFactory from "@/components/base-form/form-input-factory";
import { INPUT_TYPE } from "@/config/general";
import { Component, ComponentType } from "@/types/pages";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UseQueryResult } from "@tanstack/react-query";
import React, { memo } from "react";
import { FieldErrors } from "react-hook-form";

function SortableList({
  addedComponents,
  setAddedComponents,
  setValue,
  formType,
  errors,
  register,
  componentTypes,
  control,
}: {
  addedComponents: (Component & { unique_id: string })[];
  setAddedComponents: React.Dispatch<
    React.SetStateAction<(Component & { unique_id: string })[]>
  >;
  control: any;
  setValue: any;
  errors: FieldErrors;
  formType: "create" | "update";
  register: any;
  componentTypes: UseQueryResult<ComponentType[], unknown>;
}) {
  function handleDragEnd({ active, over }: any) {
    if (active.id !== over.id) {
      const overIndex = addedComponents.findIndex(
        (item) => item.unique_id === over.id
      );
      const activeIndex = addedComponents.findIndex(
        (item) => item.unique_id === active.id
      );

      const activeItem = addedComponents[activeIndex];

      const newItems = [...addedComponents];
      newItems.splice(activeIndex, 1);
      newItems.splice(overIndex, 0, activeItem);

      setAddedComponents(newItems);
    } else {
      console.log("girdi");
    }
  }

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleRemove = (id: string) => {
    setAddedComponents((items) =>
      items.filter((item) => item.unique_id !== id)
    );
  };
  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={addedComponents.map((c) => c.unique_id)}
        strategy={verticalListSortingStrategy}
      >
        {addedComponents.map((component, index) => {
          return (
            <SortableItem
              key={component.unique_id}
              id={component.unique_id}
              index={index}
              handleRemove={() => handleRemove(component.unique_id)}
            >
              <div>
                <FormInputFactory
                  control={control}
                  setValue={setValue}
                  formType={formType}
                  errors={errors}
                  field={{
                    name: component.unique_id,
                    type: "string",
                    inputType:
                      (componentTypes.data?.find(
                        (t) => t.id === component.type_id
                      )?.name as INPUT_TYPE) || "text",
                  }}
                  register={register}
                  table={{ name: "page", columns: [] }}
                />
              </div>
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
}

const SortableListMemo = memo(SortableList);
export default SortableListMemo;
