class PricingsController < ApplicationController
    # POST /pricings
    def create
        price = Pricing.last.price_nft + rand(-0.05..0.05)
        Pricing.create(nft_id: 1, coin_id: 1, price_nft:price)
        render json: Nft.first.pricings.last(50), status: :ok
    end
end
