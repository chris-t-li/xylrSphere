class PaymentProcessController < ApplicationController
    
    # GET /secret
    def process_payment
        Stripe.api_key = Rails.application.credentials.dig(:stripe, :private_key)

        intent = Stripe::PaymentIntent.create(
            {amount: 1025, currency: 'usd', automatic_payment_methods: {enabled: true}})
                    
        render json: {client_secret: intent.client_secret}, status: :ok
    end

end