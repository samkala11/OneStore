class OrderLine < ApplicationRecord
    validates :order_id, :line_no, :product_id, :quantity, :line_total, :unit, presence: true
  
    # belongs_to :customer
  
  #   has_many :songs
  
  #   has_one_attached :album_image
  end
  