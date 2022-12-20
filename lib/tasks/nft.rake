namespace :nft do
  desc "simulates price information for NFTs every hour. Prices are simulated on a per second basis"
  task simulate_prices: :environment do
    Nft.all.each do |n|

      1440.times do |t|
        new_price = n.pricings.last.price_nft * Math.exp(rand(-0.005..0.005))
        last_updated = n.pricings.last.updated_at
        chain = Coin.find_by(ticker: n.chain)
        Pricing.create(nft_id: n.id, coin_id: chain.id, price_nft: new_price, updated_at: last_updated + 1)
      end
      puts "Finished simulating prices for #{n.name}"
    end
  end

end
