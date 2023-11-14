import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import { translate } from "@/langs";
import React from "react";

export default function Label({
  field,
  table,
}: {
  field: DATABASE_TABLE_COLUMN;
  table: Partial<DATABASE_TABLE>;
}) {
  if (field?.name?.split("/")[0] === "relation") {
    return (
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name.split("/")[3])}
      </label>
    );
  } else if (table?.name === "") {
    return <label htmlFor={field.name}>{translate(field.name)}</label>;
  } else {
    return (
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name)}
      </label>
    );
  }
}
