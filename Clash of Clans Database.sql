-- -------------------------------------------------------------
-- TablePlus 5.3.8(500)
--
-- https://tableplus.com/
--
-- Database: kai
-- Generation Time: 2023-07-18 16:56:59.7330
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."player_info";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS player_info_id_seq;

-- Table Definition
CREATE TABLE "public"."player_info" (
    "id" int4 NOT NULL DEFAULT nextval('player_info_id_seq'::regclass),
    "tag" varchar(15) NOT NULL,
    "name" varchar(255),
    "level" int4,
    "trophies" int4,
    "clan_name" varchar(255),
    "clan_level" int4,
    "role" varchar(255),
    "attacks_won" int4,
    "defenses_won" int4,
    "donations" int4,
    "received_donations" int4,
    "war_stars" int4,
    "townhall_level" int4,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."player_tags";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS player_tags_id_seq;

-- Table Definition
CREATE TABLE "public"."player_tags" (
    "id" int4 NOT NULL DEFAULT nextval('player_tags_id_seq'::regclass),
    "tag" varchar(15) NOT NULL,
    "name" varchar(255),
    "explevel" int4,
    "trophies" int4,
    "clanname" varchar(255),
    "clanlevel" int4,
    "role" varchar(255),
    "attackwins" int4,
    "defensewins" int4,
    "donations" int4,
    "donationsreceived" int4,
    "warstars" int4,
    "townhalllevel" int4,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."player_info" ("id", "tag", "name", "level", "trophies", "clan_name", "clan_level", "role", "attacks_won", "defenses_won", "donations", "received_donations", "war_stars", "townhall_level") VALUES
(9, '2O9UU98GP', 'campingman16', 200, 4763, 'Eastside Pirate', 19, 'member', 55, 3, 3858, 3245, 1232, 13),
(11, 'LYQ2OGGG', 'Cosmos Floppy', 139, 2806, 'PlaneClashers', 28, 'member', 0, 0, 47, 0, 340, 12),
(12, 'RYQ8CP20', 'EP', 174, 3549, 'DeadlyWishJr', 16, 'admin', 10, 1, 1322, 846, 1014, 13),
(13, 'R2OPROJJ', 'Lord Farquaad', 117, 1732, NULL, NULL, NULL, 2, 1, 0, 0, 362, 11),
(16, 'J89YQQ9L', 'banana man', 178, 2327, 'The Straw Hats', 4, 'leader', 0, 0, 0, 0, 355, 13),
(22, 'CVGP8LYP', 'Lamo', 133, 2419, 'Kings of Clash', 3, 'member', 0, 0, 0, 0, 149, 12);

INSERT INTO "public"."player_tags" ("id", "tag", "name", "explevel", "trophies", "clanname", "clanlevel", "role", "attackwins", "defensewins", "donations", "donationsreceived", "warstars", "townhalllevel") VALUES
(11, 'LYQ2OGGG', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

