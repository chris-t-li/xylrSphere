class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :watchlist, :ownership, :on_market
  has_one :user
  has_one :nft
end
