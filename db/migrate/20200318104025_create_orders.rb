class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :order_type, null: false
      t.integer :order_number, null: false
      t.integer :customer_id
      t.string :first_name
      t.string :last_name 
      t.string :customer_address
      t.integer :order_total, null: false
      t.integer :pending_total 
      t.integer :paid_total
      t.integer :status 
      t.timestamps
    end
    add_index :orders, :order_number, unique: true
    add_index :orders, :first_name
    add_index :orders, :last_name
    add_index :orders, :customer_address
  end
      
end
