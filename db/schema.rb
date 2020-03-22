# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_22_231815) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "order_lines", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "line_no", null: false
    t.integer "sub_line_no"
    t.integer "product_id", null: false
    t.integer "quantity", null: false
    t.integer "line_total", null: false
    t.string "line_note"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "unit"
    t.index ["line_note"], name: "index_order_lines_on_line_note"
    t.index ["line_total"], name: "index_order_lines_on_line_total"
    t.index ["order_id"], name: "index_order_lines_on_order_id"
    t.index ["product_id"], name: "index_order_lines_on_product_id"
    t.index ["unit"], name: "index_order_lines_on_unit"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "order_type", null: false
    t.integer "order_number", null: false
    t.integer "customer_id"
    t.string "first_name"
    t.string "last_name"
    t.string "customer_address"
    t.integer "order_total", null: false
    t.integer "pending_total"
    t.integer "paid_total"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customer_address"], name: "index_orders_on_customer_address"
    t.index ["first_name"], name: "index_orders_on_first_name"
    t.index ["last_name"], name: "index_orders_on_last_name"
    t.index ["order_number"], name: "index_orders_on_order_number", unique: true
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.string "short_desc", null: false
    t.string "long_desc"
    t.integer "department_id"
    t.integer "price"
    t.integer "discount_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "unit"
    t.integer "product_id"
    t.integer "active", default: 0
    t.index ["active"], name: "index_products_on_active"
    t.index ["department_id"], name: "index_products_on_department_id"
    t.index ["name"], name: "index_products_on_name"
    t.index ["price"], name: "index_products_on_price"
    t.index ["product_id"], name: "index_products_on_product_id"
    t.index ["unit"], name: "index_products_on_unit"
  end

end
