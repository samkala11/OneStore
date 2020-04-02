class New < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :order_number, :string
    add_index :orders, :order_number
  end
end
