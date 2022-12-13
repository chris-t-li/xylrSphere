class PricingSerializer < ActiveModel::Serializer
  attributes :id, :price_nft
  has_one :nft
  has_one :coin
end
