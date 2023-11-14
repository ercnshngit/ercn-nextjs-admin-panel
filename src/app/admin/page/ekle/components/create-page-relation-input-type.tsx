import {
  DATABASE_TABLE,
  DATABASE_TABLE_COLUMN,
  getDatabaseTable,
} from "@/config/general";
import { translate } from "@/langs";
import { getComponentTypes, getPageConfigs } from "@/services/pages";
import { getTable } from "@/services/panel";
import { Component } from "@/types/pages";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import SortableList from "./sortable-list";
import DraggableGrid, { Item } from "./draggable-grid";

export default function CreatePageRelationInputType({
  field,
  table,
  register,
  errors,
  formType,
  id,
  setValue,
  watch,
  control,
  ...props
}: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  id?: number;
  setValue: any;
  control: any;
  watch: any;
}) {
  const [addedComponents, setAddedComponents] = useState<
    (Component & { unique_id: string; area: string; index: number })[]
  >([]);

  const componentTable = getDatabaseTable(
    field.relation!.table!
  ) as DATABASE_TABLE;

  const components = useQuery<Component[]>([componentTable.name], () =>
    getTable({ tableName: componentTable.name })
  );

  const componentTypes = useQuery(["ComponentTypes"], () =>
    getComponentTypes()
  );
  const pageConfigs = useQuery(["PageConfigs"], () => getPageConfigs());

  const config_id = watch("config_id");

  const [componentType, setComponentType] = useState<any>(null);
  useEffect(() => {
    if (!pageConfigs.data) return;
    setComponentType(
      pageConfigs.data.find((config) => {
        return Number(config.id) === Number(config_id);
      })
    );
  }, [config_id, pageConfigs.data]);

  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name)}
      </label>
      {componentType && componentTypes ? (
        <DraggableGrid
          components={components}
          setAddedComponents={setAddedComponents}
          setValue={setValue}
          errors={errors}
          register={register}
          formType={formType}
          field={field}
          control={control}
          componentTypes={componentTypes}
          pageCss={componentType.css}
        />
      ) : (
        "yükleniyor"
      )}
    </div>
  );
}
