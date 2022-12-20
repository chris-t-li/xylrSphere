class PricingsController < ApplicationController
    # POST /pricings/:nft_id
    def create
        nft = Nft.find(params[:nft_id])
        price = nft.pricings.last.price_nft
        new_price = price * Math.exp(rand(-0.005..0.005))
        chain = Coin.find_by(ticker: nft.chain)
        Pricing.create(nft_id: nft.id, coin_id: chain.id, price_nft: new_price)
        render json: nft.pricings.last(50), status: :ok
    end

    # GET /pricings/:nft_id
    def show
        nft = Nft.find(params[:nft_id])
        pricing = nft.pricings.last
        render json: pricing, status: :ok
    end

end
