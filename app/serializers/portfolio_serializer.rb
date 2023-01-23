class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :watchlist, :ownership, :purchase_price
  has_one :user
  has_one :nft
end
