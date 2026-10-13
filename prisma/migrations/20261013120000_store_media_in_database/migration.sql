-- Keep uploaded media durable across application container deployments.
ALTER TABLE "Media" ADD COLUMN "data" BYTEA;
