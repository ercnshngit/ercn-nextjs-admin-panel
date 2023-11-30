import { db } from "../../../../../orm/mysql/connection";
import { BlockComponentProp } from "../../../../../orm/models/block_models/block-component-prop.model";
import { BlockComponent } from "../../../../../orm/models/block_models/block-component.model";
import { Component } from "../../../../../orm/models/block_models/component.model";
import { Prop } from "../../../../../orm/models/block_models/prop.model";
import { SqlConstants } from "../../../../../constants/sql";

// TÜm verileri döner
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id; //database'teki BlockComponent modelinin içindeki block_id'ye göre listeleniyor
  try {
    const conn = await db.connection();

    let components: any = []; let props: any = []; let result: any = [];
    const blockComponent = new BlockComponent();
    const block_component_data = await blockComponent.find({ where: BlockComponent.ALIAS + ".block_id = " + id });
    for (let i = 0; i < block_component_data.length; i++) {
      const blockComponentProp = new BlockComponentProp();
      const block_component_prop = await blockComponentProp.find({ select: Prop.ALIAS + ".key, " + BlockComponentProp.ALIAS + ".value", where: BlockComponentProp.ALIAS + ".block_component_id = " + block_component_data[i].id, relation: { detailed_relation: [{ join_table_name: Prop.TABLE, join_table_alias: Prop.ALIAS, join_table_column_name: "id", table_alias: BlockComponentProp.ALIAS, table_column_name: "prop_id", table_name: BlockComponentProp.TABLE, join_type: SqlConstants.LEFT_JOIN }] } });
      await props.push(block_component_prop);

      const component_data = new Component();
      const component = await component_data.find({ where: Component.ALIAS + ".id = " + block_component_data[i].component_id });
      await components.push(component);

      const block_component = await blockComponent.find({ select: BlockComponent.ALIAS + ".depth, " + BlockComponent.ALIAS + ".order, " + BlockComponent.ALIAS + ".belong_component_id, " + BlockComponent.ALIAS + ".block_id", where: BlockComponent.ALIAS + ".id = " + block_component_data[i].id });
      const assign = Object.assign(component[0], block_component[0]);
      console.log('assign: ', assign)
      result.concat(assign);
      assign["props"] = block_component_prop
      await result.push(assign);

    }

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}


/*
const COMPONENTS = [
  {
    id: "1",
    name: "Text",
    block_id:1,
    tag: "Text",
    type: {
      id: "1",
      name: "Page",
    },
    depth: 1,
    order: 1,
    belong_component_id: 2,
    props: [
     {
        prop: {
          key: "className",
        },
        value: "bg-red-500",
      },
      {
        prop: {
          key: "value",
        },
        value: "Hello World",
      },
    ],
  },
  {
    id: "2",
    name: "Vertical Stack",
    tag: "VStack",
    type: {
      id: "1",
      name: "Page",
    },
    depth: 0,
    order: 1,
    belong_component_id: null,
    props: [
      {
        prop: {
          key: "className",
        },
        value: "flex flex-col",
      },
    ],
  }
];
*/
