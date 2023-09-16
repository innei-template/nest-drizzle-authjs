CREATE TABLE IF NOT EXISTS "api_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"created" timestamp(3) DEFAULT now() NOT NULL,
	"token" text NOT NULL,
	"expired" timestamp(3),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"platform" text NOT NULL,
	"oauthId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"text" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3),
	"copyright" boolean DEFAULT true NOT NULL,
	"allow_comment" boolean DEFAULT true NOT NULL,
	"count" jsonb DEFAULT '{"like":0,"read":0}'::jsonb NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
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
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ApiToken_name_key" ON "api_tokens" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Post_slug_idx" ON "posts" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Post_created_at_idx" ON "posts" ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api_tokens" ADD CONSTRAINT "api_tokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth" ADD CONSTRAINT "oauth_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
