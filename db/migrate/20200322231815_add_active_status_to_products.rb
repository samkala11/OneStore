class AddActiveStatusToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :active, :integer, default: false
    add_index :products, :active
  end
end
