class User < ApplicationRecord

  validates :username, presence: true
  validates :email, presence: true, uniqueness: true

  validates :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6}, allow_nil: true

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :orders

  # has_many :playlists

  # has_one_attached :picture


  def self.find_by_credentials(username='', password)
    user = User.find_by(username: username) ||  User.find_by(email: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end


end
