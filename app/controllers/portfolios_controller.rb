class PortfoliosController < ApplicationController

    # POST /portfolios
    def create
        byebug
        Portfolio.create(user_id: params[:user_id], 
            nft_id: params[:nft_id],
            watchlist: params[:watchlist]
        )
    end
end
