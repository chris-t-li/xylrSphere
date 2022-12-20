class WalletSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  # has_one :user
  has_one :coin

end
