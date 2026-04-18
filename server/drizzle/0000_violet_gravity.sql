CREATE TYPE "public"."role" AS ENUM('customer', 'vendor');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('aadhar', 'license');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'accepted', 'rejected', 'expired');--> statement-breakpoint
CREATE TYPE "public"."vehicle_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."vehicle_type" AS ENUM('car', 'bike', 'van', 'bus');--> statement-breakpoint
CREATE TYPE "public"."vehicle_document_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."vehicle_document_type" AS ENUM('rc', 'puc', 'insurance');--> statement-breakpoint
CREATE TYPE "public"."booking_request" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"profile_photo" text,
	"mobile_no" varchar(20),
	"role" "role" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"document_type" "document_type" NOT NULL,
	"document_url" text NOT NULL,
	"status" "status" NOT NULL,
	"rejection_reason" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_name" varchar(100) NOT NULL,
	"vehicle_type" "vehicle_type" NOT NULL,
	"vehicle_capacity" integer NOT NULL,
	"price_per_day" integer NOT NULL,
	"location" varchar(100) NOT NULL,
	"is_available" boolean DEFAULT true,
	"status" "vehicle_status" DEFAULT 'active',
	"features" text,
	"vendor_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vehicle_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer NOT NULL,
	"vehicle_document_type" "vehicle_document_type" NOT NULL,
	"document_url" text NOT NULL,
	"document_public_id" text,
	"vehicle_document_status" "vehicle_document_status" DEFAULT 'pending' NOT NULL,
	"rejection_reason" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"vehicle_id" integer,
	"vendor_id" integer,
	"vehicle_request_id" integer,
	"booking_status" "booking_request" NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"date_from" timestamp NOT NULL,
	"date_to" timestamp NOT NULL,
	"destination" varchar(255) NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "booking_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"vehicle_id" integer,
	"vendor_id" integer,
	"date_from" timestamp NOT NULL,
	"date_to" timestamp NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"expires_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_documents" ADD CONSTRAINT "vehicle_documents_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vendor_id_users_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_request_id_booking_requests_id_fk" FOREIGN KEY ("vehicle_request_id") REFERENCES "public"."booking_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_vendor_id_users_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_document" ON "user_documents" USING btree ("user_id","document_type");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_vehicle_document" ON "vehicle_documents" USING btree ("vehicle_id","vehicle_document_type");