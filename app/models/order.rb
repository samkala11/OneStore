class Order < ApplicationRecord
    validates :order_type, :order_number, :order_total, presence: true
  
    # belongs_to :customer
  
  #   has_many :songs
  
  #   has_one_attached :album_image
  end
  