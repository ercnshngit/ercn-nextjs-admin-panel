import { db, sortTables } from "../lib/database/mysql/connection";
import QuerryBuilder from "../lib/database/mysql/querry.builder";

QuerryBuilder.genMigration(sortTables(db.tables));