import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

import { snowflake } from '@meta-muse/utils'

export const user = pgTable(
  'users',
  {
    id: text('id')
      .$defaultFn(() => snowflake.nextId())
      .primaryKey()
      .notNull(),
    username: varchar('username', { length: 80 }).notNull(),
    name: varchar('name', { length: 80 }).notNull(),
    introduce: varchar('introduce', { length: 255 }),
    avatar: varchar('avatar', { length: 1024 }),
    password: varchar('password', { length: 80 }).notNull(),
    mail: varchar('mail', { length: 80 }),
    url: varchar('url', { length: 1024 }),
    lastLoginTime: timestamp('last_login_time', {
      precision: 3,
      mode: 'string',
    }),
    lastLoginIp: text('last_login_ip'),
    socialIds: jsonb('social_ids').default({}),
    authCode: text('auth_code').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }),
  },
  (table) => {
    return {
      usernameKey: uniqueIndex('User_username_key').on(table.username),
    }
  },
)

export const userApiToken = relations(user, ({ many }) => ({
  apiToken: many(apiToken),
}))

export const apiToken = pgTable(
  'api_tokens',
  {
    id: text('id')
      .$defaultFn(() => snowflake.nextId())
      .primaryKey()
      .notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    created: timestamp('created', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    token: text('token').notNull(),
    expired: timestamp('expired', { precision: 3, mode: 'string' }),
    name: text('name').notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex('ApiToken_name_key').on(table.name),
    }
  },
)

export const oauth = pgTable('oauth', {
  id: text('id')
    .$defaultFn(() => snowflake.nextId())
    .primaryKey()
    .notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  platform: text('platform').notNull(),
  oauthId: text('oauthId').notNull(),
})

export const post = pgTable(
  'posts',
  {
    id: text('id')
      .$defaultFn(() => snowflake.nextId())
      .primaryKey()
      .notNull(),
    slug: text('slug').notNull().unique(),
    text: text('text').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }),

    copyright: boolean('copyright').default(true).notNull(),
    allowComment: boolean('allow_comment').default(true).notNull(),
    count: jsonb('count').default({ like: 0, read: 0 }).notNull(),
    isPublished: boolean('is_published').default(true).notNull(),
  },
  (table) => {
    return {
      slugIdx: index('Post_slug_idx').on(table.slug),
      createdAtIdx: index('Post_created_at_idx').on(table.createdAt),
    }
  },
)
