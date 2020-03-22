class CreateOrderLines < ActiveRecord::Migration[6.0]
  def change
    create_table :order_lines do |t|
      t.integer :order_id, null: false
      t.integer :line_no, null: false
      t.integer :sub_line_no
      t.integer :product_id, null: false
      t.integer :quantity, null: false
      t.integer :line_total, null: false
      t.string  :line_note
      t.timestamps
    end
    add_index :order_lines, :order_id
    add_index :order_lines, :product_id
    add_index :order_lines, :line_total
    add_index :order_lines, :line_note
  end
end
