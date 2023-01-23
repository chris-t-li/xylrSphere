class PaymentProcessController < ApplicationController
    
    # GET /secret
    def process_payment

        # byebug
        total_price = (Coin.find_by(ticker: params[:coin]).last_price * params[:qty].to_f).to_i + 5

        Stripe.api_key = Rails.application.credentials.dig(:stripe, :private_key)

        intent = Stripe::PaymentIntent.create(
            {amount: total_price, currency: 'usd', automatic_payment_methods: {enabled: true}})
                    
        render json: {client_secret: intent.client_secret, totalPrice: total_price, qtyBought: params[:qty]}, status: :ok
    end

end