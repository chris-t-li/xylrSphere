class NftsController < ApplicationController
    # GET /nfts
    def index
        render json: Nft.all, status: :ok
    end

    # GET /nfts/:id
    def show
        nft = Nft.find(params[:id])
        render json: nft, status: :ok
    end
end
