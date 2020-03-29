class ProductIdUnique < ActiveRecord::Migration[6.0]
  def change
    change_column :products, :product_id, :integer, unique: true
  end
end
