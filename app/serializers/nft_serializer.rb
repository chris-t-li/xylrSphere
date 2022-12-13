class NftSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :rarity, :supply, :chain
  has_many :pricings
end
