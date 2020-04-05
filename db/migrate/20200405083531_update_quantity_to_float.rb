class UpdateQuantityToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :order_lines, :quantity, :float, null: false
  end
end
