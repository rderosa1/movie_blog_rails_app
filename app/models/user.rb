class User < ApplicationRecord
    has_many :posts
    has_many :movies, through: :posts
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    # validates :password, length: { minimum: 6 }

    def frontend_data
        {
            id: id,
            username: username,
            email: email,
            created_at: created_at,
            updated_at: updated_at
        }
    end
end
