class Order < ApplicationRecord
  validates :order_number, :order_type, :order_total, :status, presence: true
  validates_uniqueness_of :order_number

  # belongs_to :customer
  # has_many :songs
  # has_one_attached :album_image
  
  end
  