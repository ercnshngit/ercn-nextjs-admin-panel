import { checkError } from "@/utils/error-handling";
import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Handle, Remove } from "@/components/dndkit-sortable-list/components";
import FormInputFactory from "@/components/base-form/form-input-factory";
import { DATABASE_TABLE_COLUMN, INPUT_TYPE } from "@/config/general";
import { Component, ComponentType, PageComponent } from "@/types/pages";
import {
  FieldErrors,
  RegisterOptions,
  SetValueConfig,
  UseFormRegister,
} from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";

export default function DraggableGrid({
  pageCss,
  components,
  setValue,
  errors,
  register,
  formType,
  field,
  componentTypes,
  defaultValue,
  control,
}: {
  pageCss: string;
  components: UseQueryResult<Component[], unknown>;
  setValue: any;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  formType: "create" | "update";
  field: DATABASE_TABLE_COLUMN;
  componentTypes: UseQueryResult<ComponentType[], unknown>;
  defaultValue: any;
  control: any;
}) {
  const parsedCss = useMemo(() => {
    return pageCss !== "" ? checkError(() => JSON.parse(pageCss)) : null;
  }, [pageCss]);

  const gridTemplateAreas = parsedCss?.gridTemplateAreas;

  const templateAreas: string[] = Array.from(
    new Set(
      gridTemplateAreas
        ?.replaceAll('"', " ")
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
    )
  );

  const [items, setItems] = useState<{
    [key: (typeof templateAreas)[number]]: (Component & {
      unique_id: string;
      area: string;
      index: number;
    })[];
  }>({
    ...templateAreas.reduce((acc, area) => {
      return {
        ...acc,
        [area]: [],
      };
    }, {}),
  });

  useEffect(() => {
    if (!defaultValue) return;
    console.log("defaultValue", defaultValue);
    const parsedDefaultValue =
      (checkError(() => JSON.parse(defaultValue)) as {
        component_id: number;
        value: string;
        index: number;
        css: string;
      }[]) || defaultValue;
    if (!parsedDefaultValue) return;
    console.log("defaultValue", parsedDefaultValue);
    setItems({
      ...templateAreas.reduce((acc, area) => {
        return {
          ...acc,
          [area]: parsedDefaultValue
            .filter((item) => JSON.parse(item.css).gridArea === area)
            .map((item) => ({
              unique_id: item.component_id + "/" + item.index,
              area: area,
              index: item.index,
              ...components.data?.find((c) => c.id === item.component_id),
            })),
        };
      }, {}),
    });

    parsedDefaultValue.forEach((item) => {
      setValue(item.component_id + "/" + item.index, item.value);
    });
  }, [pageCss, defaultValue]);

  useEffect(() => {
    setValue("content", [
      ...Object.keys(items)
        .map((key) => {
          return items[key].map((item, index) => {
            return {
              component_id: item.id,
              value: item.unique_id,
              index: Number(item.unique_id.split("/")[1]),
              css: '{"gridArea": "' + key + '"}',
            };
          });
        })
        .flat(),
    ]);
  }, [items]);

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const key = Object.keys(prev).find(
        (key) =>
          prev[key] && prev?.[key]?.find((item) => item.unique_id === id) && key
      ) as (typeof templateAreas)[number];

      return {
        ...prev,
        [key]: prev[key].filter((item) => item.unique_id !== id),
      };
    });
  };

  const [activeId, setActiveId] = useState<string | null>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="relative flex items-start h-full gap-4 ">
        <div className="sticky top-0 flex flex-col h-auto gap-2 p-4 bg-gray-200 rounded-md">
          {components.data &&
            components.data.map((item: any) => (
              <SidebarItem id={item.id} key={item.id}>
                <div
                  className="flex items-center justify-between gap-2 px-2 py-1 bg-white rounded-md select-none"
                  key={item.id}
                >
                  <p>{item[field.relation!.displayColumn!]}</p>
                </div>
              </SidebarItem>
            ))}
        </div>
        <div className="flex-1 p-4 bg-gray-200 rounded-md">
          <div style={parsedCss}>
            {parsedCss &&
              templateAreas.map((area, i) => (
                <Container
                  control={control}
                  handleRemove={handleRemove}
                  errors={errors}
                  register={register}
                  formType={formType}
                  componentTypes={componentTypes}
                  setValue={setValue}
                  defaultValue={defaultValue}
                  id={area}
                  key={i}
                  style={{
                    gridArea: area,
                  }}
                  items={items[area as keyof typeof items]}
                />
              ))}
          </div>

          <input type="hidden" {...register("content", { required: true })} />
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <Item id={activeId} className="items-center">
            {components.data?.find((c) => String(c.id) === activeId)?.title}
            {activeId}
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function findContainer(id: string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].find((item) => item.unique_id === id)
    );
  }

  function handleDragStart(event: any) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragEnd({ active, over, draggingRect }: any) {
    const { id } = active;
    if (!over?.id) return;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (active.data.current.isSidebarItem) {
      const component = components?.data?.find(
        (item: any) => item.id === active.id
      );
      if (!component) return;
      const overIndex = items[overContainer as string]
        .map((e) => e.unique_id)
        .indexOf(overId);

      setItems((items) => {
        const flattenArray = Object.values(items).flat();
        const containerComponents = Math.max(
          ...flattenArray
            .filter((item: any) => item && item.id === active.id)
            .map((o) => o.index),
          0
        );
        return {
          ...items,
          [overContainer as string]: [
            ...items[overContainer as string].slice(0, overIndex),
            {
              ...component,
              unique_id: component.id + "/" + (containerComponents + 1),
              index: containerComponents + 1,
              area: over.id,
            },
            ...items[overContainer as string].slice(
              overIndex,
              items[overContainer as string].length
            ),
          ],
        };
      });
    } else {
      if (!activeContainer || !overContainer) {
        return;
      }

      const activeIndex = items[activeContainer]
        .map((item) => item.unique_id)
        .indexOf(active.id);
      const overIndex = items[overContainer]
        .map((item) => item.unique_id)
        .indexOf(overId);

      if (activeContainer !== overContainer) {
        setItems((items) => {
          return {
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item) => item.unique_id !== active.id
            ),
            [overContainer]: [
              ...items[overContainer].slice(0, overIndex),
              {
                ...items[activeContainer][activeIndex],
                area: overContainer,
                index: overIndex,
              },
              ...items[overContainer].slice(
                overIndex,
                items[overContainer].length
              ),
            ],
          };
        });
      } else {
        if (!items[overContainer]) return;
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }

      setActiveId(null);
    }
  }
}

export function Container(props: {
  id: string;
  items: (Component & {
    unique_id: string;
    area: string;
    index: number;
  })[];
  className?: string;
  style?: any;
  control: any;
  handleRemove: (id: string) => void;
  setValue: SetValueConfig;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  formType: "create" | "update";
  defaultValue: PageComponent[];
  componentTypes: UseQueryResult<ComponentType[], unknown>;
}) {
  const {
    id,
    items,
    className,
    defaultValue,
    style,
    errors,
    register,
    formType,
    setValue,
    componentTypes,
    handleRemove,
    control,
  } = props;

  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  console.log("isOver", isOver);
  if (items) {
    return (
      <SortableContext id={id} items={items.map((item) => item.unique_id)}>
        <div
          ref={setNodeRef}
          style={style}
          className={clsx(
            className,
            " rounded-md p-2 m-1 min-h-24",
            isOver ? "bg-blue-100" : "bg-white"
          )}
        >
          {items.length === 0 && (
            <div className="font-medium text-gray-300">{id}</div>
          )}

          {items.length > 0 &&
            items.map((item) => (
              <Item
                key={item.unique_id}
                id={item.unique_id}
                component_id={item.id}
                handleRemove={handleRemove}
              >
                <div>
                  <FormInputFactory
                    control={control}
                    setValue={setValue}
                    formType={formType}
                    errors={errors}
                    defaultValue={
                      defaultValue.find(
                        (value) =>
                          value.component_id === item.id &&
                          value.index === item.index
                      )?.value
                    }
                    field={{
                      name: item.unique_id,
                      type: "string",
                      inputType:
                        (componentTypes.data?.find((t) => t.id === item.type_id)
                          ?.name as INPUT_TYPE) || "text",
                    }}
                    register={register}
                    table={{ name: "page", columns: [] }}
                  />
                </div>
              </Item>
            ))}
        </div>
      </SortableContext>
    );
  }
}

export function Item(props: {
  id: string;
  children: React.ReactNode;
  handleRemove?: (id: string) => void;
  component_id?: number;
  className?: string;
}) {
  const { id, children, handleRemove, component_id, className } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: id,
      data: { isLayoutItem: true, component_id: component_id },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <>
      <div
        className={clsx(
          "h-1 bg-blue-500 rounded-full animate-pulse ",
          isOver ? "block" : "hidden"
        )}
      />
      <div
        style={style}
        ref={setNodeRef}
        className={clsx(
          "flex flex-row items-start w-full gap-1 p-2 mb-2 bg-white rounded shadow-md",

          className
        )}
      >
        <Handle {...listeners} {...attributes} />
        <div className="flex-1">{children}</div>
        {handleRemove && (
          <Remove className="" onClick={() => handleRemove(id)} />
        )}
      </div>
    </>
  );
}

export function SidebarItem(props: { id: number; children: any }) {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { isSidebarItem: true },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="flex flex-row items-center w-full gap-1 p-1 mb-1 bg-white rounded shadow-md"
    >
      <Handle {...listeners} {...attributes} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
