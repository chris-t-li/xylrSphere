class PortfoliosController < ApplicationController

    # POST /watchlist
    def add_to_watchlist
        portfolio = Portfolio.find_or_create_by(
            user_id: params[:user_id], 
            nft_id: params[:nft_id])
        portfolio.update(watchlist: params[:watchlist])
        render json: portfolio, status: :accepted
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

    # GET /portfolio/:user_id
    def get_my_portfolio
        user = User.find(params[:user_id])
        portfolio = user.portfolios
        render json: portfolio, status: :ok
    end

    # POST /portfolios/:nft_id
    def purchase_nft
        
        # gets latest price for NFT
        nft = Nft.find(params[:nft_id])
        coin = Coin.find_by(ticker: nft.chain)
        latest_price = nft.pricings.last.price_nft
        user = User.find(session[:user_id])
        user_wallet = Wallet.find_by(user: user, coin: coin)
        # checks if user has enough funds in wallet
        if user_wallet.quantity >= latest_price
            # makes purchase if sufficient: update Portfolio instance to show ownership. Update Wallet to show reduction in balance
            ownership = Portfolio.find_or_create_by(user: user, nft: nft)
            ownership.update(ownership: true, purchase_price: latest_price)
            nft.update(on_market: false)
            user_wallet.update(quantity: user_wallet.quantity-latest_price)

            render json: {
                message: "Purchase Successful!", 
                purchase_price: latest_price,
                remaining_coin_in_wallet: user_wallet.quantity,
                ownership: ownership,
                wallet: user_wallet
                }, 
            status: :accepted
        else
            # error code if insufficient
            render json: {error: "Insufficient Coins. Please top up!"}, status: :unprocessable_entity
        end
    end

    # PATCH /portfolios/:nft_id
    def sell_nft
        user = User.find(session[:user_id])
        nft = Nft.find(params[:nft_id])
        coin = Coin.find_by(ticker: nft.chain)
        latest_price = nft.pricings.last.price_nft
        user_wallet = Wallet.find_by(user: user, coin: coin)
        ownership = Portfolio.find_by(user: user, nft: nft)
        # byebug
        ownership.update(ownership: false)
        nft.update(on_market: true)
        user_wallet.update(quantity: user_wallet.quantity+latest_price)

        render json: {
            message: "NFT Sell Successful",
            sell_price: latest_price,
            remaining_coin_in_wallet: user_wallet.quantity,
            ownership: ownership,
            wallet: user_wallet
        }, status: :accepted
        
    end
end
