class Nft < ApplicationRecord
    has_many :portfolios
    has_many :users, through: :portfolios

    has_many :pricings
end
