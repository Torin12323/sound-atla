CREATE TABLE `daily_opens` (
	`day` text NOT NULL,
	`user_id` text NOT NULL,
	`track_id` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`day`, `user_id`, `track_id`)
);
