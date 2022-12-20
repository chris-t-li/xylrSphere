class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :watchlist, :ownership
  has_one :user
  has_one :nft
end
