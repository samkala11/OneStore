class Add < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :email
    add_column :users, :phone_number, :string
    add_index :users, :phone_number
  end
end
