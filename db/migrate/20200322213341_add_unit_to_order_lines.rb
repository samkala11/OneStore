class AddUnitToOrderLines < ActiveRecord::Migration[6.0]
  def change
    add_column :order_lines, :unit, :string
    add_index :order_lines, :unit
  end
end
