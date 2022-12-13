class User < ApplicationRecord
    has_secure_password
    has_many :portfolios
    has_many :nfts, through: :portfolios

    has_many :wallets
    has_many :coins, through: :wallets
end
