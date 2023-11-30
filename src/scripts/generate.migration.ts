import { db, sortTables } from "../orm/mysql/connection";
import QuerryBuilder from "../lib/database/mysql/querry.builder";

QuerryBuilder.genMigration(sortTables(db.tables));