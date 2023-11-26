import { db } from "../lib/database/connection";
import QuerryBuilder from "../lib/database/mysql/querry.builder";

QuerryBuilder.genMigration(db.tables);