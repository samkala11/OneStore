class AddUnitToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :unit, :string
    add_index :products, :unit
  end
end
