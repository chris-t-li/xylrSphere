class UsersController < ApplicationController

    def create 
        user = User.create!(user_params)
        # byebug
        render json: user, status: :created
    end

    private 

    def user_params
        params.permit(:username, :email, :password, :avatar_url)
    end
end
