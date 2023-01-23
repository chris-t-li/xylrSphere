class NftsController < ApplicationController
    # GET /nfts?fetch_num
    def index
        render json: Nft.all, fetch_num: params[:fetch_num]
    end

    # GET /nfts/:id
    def show
        nft = Nft.find(params[:id])
        render json: nft, status: :ok
    end
end
