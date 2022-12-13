class CoinSerializer < ActiveModel::Serializer
  attributes :id, :name, :ticker, :last_price
end
