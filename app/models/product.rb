class Product < ApplicationRecord
  validates :name, :short_desc, :price, :department_id, presence: true

#   belongs_to :artist

#   has_many :songs

#   has_one_attached :album_image
end
