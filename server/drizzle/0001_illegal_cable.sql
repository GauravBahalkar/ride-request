CREATE TYPE "public"."vehicle_image_type" AS ENUM('front', 'back', 'side', 'interior', 'other');--> statement-breakpoint
CREATE TABLE "vehicle_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"image_public_id" text,
	"image_type" "vehicle_image_type" DEFAULT 'other',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "vehicle_images" ADD CONSTRAINT "vehicle_images_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;