import { MigrationInterface, QueryRunner } from "typeorm";
export declare class removeStateAndCity1646216909509 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
