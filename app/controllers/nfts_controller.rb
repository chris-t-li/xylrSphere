class NftsController < ApplicationController

    def index
        render json: Nft.all, status: :ok
    end
end
