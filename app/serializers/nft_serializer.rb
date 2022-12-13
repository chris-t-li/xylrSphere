class NftSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :rarity, :supply
end
