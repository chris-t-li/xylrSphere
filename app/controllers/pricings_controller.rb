class PricingsController < ApplicationController
    # GET /pricings?nft_id&fetch_num
    def get_prices_for_nft_details
        nft = Nft.find(params[:nft_id])
        pricings = nft.pricings.limit(100).offset(3000+100 * params[:fetch_num].to_i)
        render json: pricings, status: :ok
    end

    # GET /pricings/:nft_id
    def show
        nft = Nft.find(params[:nft_id])
        pricing = nft.pricings.last
        render json: pricing, status: :ok
    end

    # GET /portfolio_pricings/:user_id
    def get_prices_for_my_portfolio
        # byebug
        user = User.find(params[:user_id])
        prices_for_my_portfolio = {}
        user.portfolios.map {|p| p.nft}.each do |nft|
            prices_for_my_portfolio[nft.name] = nft.pricings.last(50)
        end

        render json: prices_for_my_portfolio, status: :ok

    end

end
