class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :short_desc, null: false
      t.string :long_desc
      t.integer :department_id
      t.integer :price
      t.integer :discount_price
      t.timestamps
    end
    add_index :products, :name
    add_index :products, :department_id
    add_index :products, :price
  end
end
