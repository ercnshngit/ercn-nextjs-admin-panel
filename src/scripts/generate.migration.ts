import QuerryBuilder from "../orm/mysql/querry.builder";
import { db, sortTables } from "../orm/mysql/connection";

QuerryBuilder.genMigration(sortTables(db.tables));