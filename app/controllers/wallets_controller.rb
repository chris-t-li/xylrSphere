class WalletsController < ApplicationController

    # GET /wallets/:user_id
    def show_my_wallet
        wallet = Wallet.where(user_id: params[:user_id])
        render json: wallet, status: :ok
    end
end
