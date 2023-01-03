class NftSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :rarity, :supply, :chain, :on_market, :latest_price, :most_recent_pricings, :chain_icon
  # has_one :coin
  # has_many :pricings

  def latest_price
    self.object.pricings.last
  end

  def most_recent_pricings
    self.object.pricings.limit(100).offset(100 * @instance_options[:fetch_num].to_i)
  end

  def chain_icon
    Coin.find_by(ticker: self.object.chain).icon
  end
end
