class WalletsController < ApplicationController

    # GET /wallets/:user_id
    def show_my_wallet
        wallet = Wallet.where(user_id: params[:user_id])
        render json: wallet, status: :ok
    end

    # PATCH /wallets
    def add_to_wallet
        coin = Coin.find_by(ticker: params[:coin])
        wallet = Wallet.find_or_create_by(user_id: params[:user_id], coin_id: coin.id)
        # byebug
        wallet.update!(quantity: wallet.quantity.to_f + params[:qty].to_f)
        # wallet = Wallet.create!(user_id: params[:user_id], coin_id: coin.id, quantity: params[:qty])
        render json: wallet, status: :accepted
    end
end
