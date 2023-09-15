-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"username" varchar(80) NOT NULL,
	"name" varchar(80) NOT NULL,
	"introduce" varchar(255),
	"avatar" varchar(1024),
	"password" varchar(80) NOT NULL,
	"mail" varchar(80),
	"url" varchar(1024),
	"last_login_time" timestamp(3),
	"last_login_ip" text,
	"social_ids" jsonb DEFAULT '{}'::jsonb,
	"auth_code" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ApiToken" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"userId" text NOT NULL,
	"created" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"token" text NOT NULL,
	"expired" timestamp(3),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OAuth" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"userId" text NOT NULL,
	"platform" text NOT NULL,
	"oauthId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"slug" text NOT NULL,
	"text" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3),
	"categoryId" text NOT NULL,
	"copyright" boolean DEFAULT true NOT NULL,
	"allow_comment" boolean DEFAULT true NOT NULL,
	"count" jsonb DEFAULT '{"like":0,"read":0}'::jsonb NOT NULL,
	"pin" boolean DEFAULT false NOT NULL,
	"pin_order" integer DEFAULT 0 NOT NULL,
	"related_by_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostImage" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"src" text NOT NULL,
	"width" double precision NOT NULL,
	"height" double precision NOT NULL,
	"accent" text NOT NULL,
	"mine_type" text NOT NULL,
	"postId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostTag" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"name" text NOT NULL,
	"postId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"id" text PRIMARY KEY DEFAULT '' NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ApiToken_name_key" ON "ApiToken" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Post_slug_idx" ON "Post" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Post_created_at_idx" ON "Post" ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_categoryId_key" ON "Post" ("slug","categoryId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "PostTag_name_key" ON "PostTag" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slugIndex" ON "Category" ("slug");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ApiToken" ADD CONSTRAINT "ApiToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_related_by_id_fkey" FOREIGN KEY ("related_by_id") REFERENCES "Post"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/