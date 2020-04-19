class AddEmailOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :phone_number, :string
    add_index :orders, :phone_number
    add_column :orders, :email, :string
    add_index :orders, :email
  end
end
