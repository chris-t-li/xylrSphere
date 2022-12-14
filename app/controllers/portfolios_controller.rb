class PortfoliosController < ApplicationController

    # POST /watchlist
    def add_to_watchlist
        portfolio = Portfolio.create(user_id: params[:user_id], 
            nft_id: params[:nft_id],
            watchlist: params[:watchlist]
        )
        render json: portfolio, status: :created
    end

    # GET /watchlist/:user_id
    def show_my_watchlist
        portfolio = Portfolio.where(user_id: params[:user_id])
        render json: portfolio, status: :ok
    end

    # PATCH /watchlist/:id
    def remove_from_watchlist
        # byebug
        portfolio = Portfolio.find(params[:id])
        portfolio.update!(watchlist: params[:watchlist])
        render json: portfolio, status: :accepted
    end
end
