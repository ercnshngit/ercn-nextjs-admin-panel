import { db, sortTables } from "../lib/database/connection";
import QuerryBuilder from "../lib/database/mysql/querry.builder";

QuerryBuilder.genMigration(sortTables(db.tables));