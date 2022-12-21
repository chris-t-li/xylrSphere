# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_20_204834) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coins", force: :cascade do |t|
    t.string "name"
    t.string "ticker"
    t.float "last_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nfts", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.integer "rarity"
    t.integer "supply"
    t.string "chain"
    t.boolean "on_market"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "portfolios", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "nft_id", null: false
    t.boolean "watchlist"
    t.boolean "ownership"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "purchase_price"
    t.index ["nft_id"], name: "index_portfolios_on_nft_id"
    t.index ["user_id"], name: "index_portfolios_on_user_id"
  end

  create_table "pricings", force: :cascade do |t|
    t.bigint "nft_id", null: false
    t.bigint "coin_id", null: false
    t.float "price_nft"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coin_id"], name: "index_pricings_on_coin_id"
    t.index ["nft_id"], name: "index_pricings_on_nft_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "wallets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "coin_id", null: false
    t.float "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coin_id"], name: "index_wallets_on_coin_id"
    t.index ["user_id"], name: "index_wallets_on_user_id"
  end

  add_foreign_key "portfolios", "nfts"
  add_foreign_key "portfolios", "users"
  add_foreign_key "pricings", "coins"
  add_foreign_key "pricings", "nfts"
  add_foreign_key "wallets", "coins"
  add_foreign_key "wallets", "users"
end
