import "reflect-metadata";
import { SqlConstants, SqlDataType } from "../../constants/sql";
import { Column, Model, Relation } from "./decorators";
export class PageConfig {

    static TABLE = "page_config";
    static ALIAS = "pc";

    static ID = "id";
    static TITLE = {
        title: "title",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static CSS = {
        title: "css",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }

}

export class Page {

    static TABLE = "page";
    static ALIAS = "p";

    static ID = "id";
    static TITLE = {
        title: "title",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static DESC = {
        title: "desc",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }
    static IMAGE = {
        title: "image",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }
    static SLUG = {
        title: "slug",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }
    static CONFIG_ID = {
        title: "config_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }
    static LANGUAGE_CODE = {
        title: "language_code",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }
    static BACKGROUND_IMG = {
        title: "background_img",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }

    static RELATIONS = [
        {
            table: PageConfig.TABLE,
            column: this.CONFIG_ID.title,
            referenced_column: PageConfig.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.CONFIG_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        }
    ]

}

export class PageComponent {
  static TABLE = "page_component";
  static ALIAS = "pc";

  static ID = "id";
  static PAGE_ID = "page_id";
  static COMPONENT_ID = "component_id";
  static VALUE = "value";
  static INDEX = "index";
  static CSS = "css";
}

export class ComponentType {
  static TABLE = "component_type";
  static ALIAS = "ct";

  //TODO: Doldurulacak
}

