ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_documents" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_documents" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_documents" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "vendor_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "vendor_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vehicle_documetns" ALTER COLUMN "vehicle_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vehicle_documetns" ALTER COLUMN "vehicle_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle_documetns" ALTER COLUMN "vendor_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vehicle_documetns" ALTER COLUMN "vendor_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle_documetns" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "vehicle_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "vehicle_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "vendor_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "vendor_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "vehicle_request_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "vehicle_request_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "total_price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "destination" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "vehicle_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "vehicle_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "vendor_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "vendor_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_requests" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "booking_status" "booking_request" NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "booking_request";