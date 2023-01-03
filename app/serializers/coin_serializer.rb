class CoinSerializer < ActiveModel::Serializer
  attributes :id, :name, :ticker, :last_price, :updated_at, :icon
end
