class NftSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :rarity, :supply, :chain, :on_market, :latest_price
  has_many :pricings

  def latest_price
    # byebug
    self.object.pricings.last
  end
end
