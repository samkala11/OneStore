class Order < ApplicationRecord
  validates :order_type, :order_number, :order_total, presence: true
  validates_uniqueness_of :order_number

  # belongs_to :customer
  
  #   has_many :songs
  
  #   has_one_attached :album_image
  end
  