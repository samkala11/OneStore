class Product < ApplicationRecord
  validates :name, :short_desc, :price, :department_id, :unit, presence: true

  validates :product_id, presence: true
  validates_uniqueness_of :product_id
  #vegetables: department_id = 10
  #fruits: department_id = 20

#   belongs_to :artist

#   has_many :songs

  has_one_attached :product_image
end
