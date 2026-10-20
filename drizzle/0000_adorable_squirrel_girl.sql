CREATE TABLE `library_items` (
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`item_key` text NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `kind`, `item_key`)
);
