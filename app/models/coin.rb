class Coin < ApplicationRecord
    has_many :pricing
    has_many :nfts, through: :pricing

end
