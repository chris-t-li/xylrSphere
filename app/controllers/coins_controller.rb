class CoinsController < ApplicationController
    
    # GET /coin?ticker=
    def show
        coin = Coin.find_by(ticker: params[:ticker])
        render json: coin, status: :ok
    end
end
