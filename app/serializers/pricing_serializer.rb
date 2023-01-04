class PricingSerializer < ActiveModel::Serializer
  attributes :id, :price_nft, :created_at, :updated_at, :price_time
  has_one :nft
  has_one :coin

  def price_time
    self.object.created_at.strftime("%I:%M%p")
  end
end
